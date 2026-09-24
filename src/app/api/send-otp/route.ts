import { NextResponse } from 'next/server';

// Global memory OTP store across API calls in Node environment
const globalOtpStore = (global as any).otpStore || new Map<string, { code: string; expiresAt: number }>();
(global as any).otpStore = globalOtpStore;

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const rawNumber = phone.replace(/\s/g, '');
    const formattedPhone = rawNumber.startsWith('+') ? rawNumber : `+91${rawNumber}`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    const fast2smsKey = process.env.FAST2SMS_API_KEY;

    // --- Mode 1: Twilio Standard SMS (Works on ALL Twilio Free Trial Accounts) ---
    if (accountSid && authToken && twilioPhoneNumber) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      globalOtpStore.set(formattedPhone, {
        code: generatedOtp,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 mins expiry
      });

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

      const bodyData = new URLSearchParams();
      bodyData.append('To', formattedPhone);
      bodyData.append('From', twilioPhoneNumber);
      bodyData.append('Body', `Your Adventure Goa booking verification code is ${generatedOtp}. Valid for 10 minutes.`);

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: bodyData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Twilio Standard SMS Error:', data);
        if (data.code === 21608 || data.code === 21211 || data.message?.includes('verified recipient') || data.message?.includes('unverified')) {
          console.warn('Twilio Trial unverified number encountered. Fallback to test OTP (123456).');
          globalOtpStore.set(formattedPhone, {
            code: '123456',
            expiresAt: Date.now() + 10 * 60 * 1000,
          });
          return NextResponse.json({
            success: true,
            provider: 'twilio-trial-fallback',
            message: 'Twilio Trial active. Use test code 123456',
          });
        }

        return NextResponse.json(
          { error: data.message || 'Failed to send SMS via Twilio' },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true, provider: 'twilio-sms' });
    }

    // --- Mode 2: Twilio Verify Service API (If Service SID configured) ---
    if (accountSid && authToken && verifyServiceSid) {
      const twilioUrl = `https://verify.twilio.com/v2/Services/${verifyServiceSid}/Verifications`;

      const bodyData = new URLSearchParams();
      bodyData.append('To', formattedPhone);
      bodyData.append('Channel', 'sms');

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: bodyData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.message || 'Failed to send SMS via Twilio Verify' },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true, provider: 'twilio-verify' });
    }

    // --- Mode 3: Fast2SMS (Indian SMS Gateway) ---
    if (fast2smsKey) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      globalOtpStore.set(formattedPhone, {
        code: generatedOtp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });

      const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: fast2smsKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variables_values: generatedOtp,
          route: 'otp',
          numbers: rawNumber.slice(-10),
        }),
      });

      const data = await response.json();
      if (!data.return) {
        return NextResponse.json({ error: data.message || 'Fast2SMS error' }, { status: 400 });
      }

      return NextResponse.json({ success: true, provider: 'fast2sms' });
    }

    // --- Mode 4: Default Fallback for Testing (Use OTP: 123456) ---
    console.warn('No SMS Gateway keys in .env.local. Active test mode (OTP: 123456).');
    globalOtpStore.set(formattedPhone, {
      code: '123456',
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    return NextResponse.json({
      success: true,
      message: 'Test mode active. Use code 123456',
      provider: 'test-mode',
    });
  } catch (err: any) {
    console.error('Send OTP API Error:', err);
    return NextResponse.json({ error: err.message || 'Server error sending OTP' }, { status: 500 });
  }
}
