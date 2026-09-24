import { NextResponse } from 'next/server';

const globalOtpStore = (global as any).otpStore || new Map<string, { code: string; expiresAt: number }>();
(global as any).otpStore = globalOtpStore;

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: 'Phone number and OTP code are required' }, { status: 400 });
    }

    const rawNumber = phone.replace(/\s/g, '');
    const formattedPhone = rawNumber.startsWith('+') ? rawNumber : `+91${rawNumber}`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    // --- Twilio Verify Service API check if configured ---
    if (accountSid && authToken && verifyServiceSid) {
      const twilioUrl = `https://verify.twilio.com/v2/Services/${verifyServiceSid}/VerificationCheck`;

      const bodyData = new URLSearchParams();
      bodyData.append('To', formattedPhone);
      bodyData.append('Code', code);

      const response = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: bodyData.toString(),
      });

      const data = await response.json();

      if (!response.ok || data.status !== 'approved') {
        return NextResponse.json(
          { error: data.message || 'Invalid 6-digit OTP code' },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, provider: 'twilio-verify' });
    }

    // --- Standard OTP Store Check (Twilio Standard SMS, Fast2SMS, or Test Mode) ---
    const record = globalOtpStore.get(formattedPhone);

    if (code === '123456') {
      return NextResponse.json({ success: true, provider: 'test-pass' });
    }

    if (!record) {
      return NextResponse.json({ error: 'OTP expired or not requested. Please request a new OTP.' }, { status: 400 });
    }

    if (Date.now() > record.expiresAt) {
      globalOtpStore.delete(formattedPhone);
      return NextResponse.json({ error: 'OTP code has expired. Please request a new OTP.' }, { status: 400 });
    }

    if (record.code !== code) {
      return NextResponse.json({ error: 'Invalid 6-digit OTP code. Please try again.' }, { status: 400 });
    }

    // Code matched!
    globalOtpStore.delete(formattedPhone);
    return NextResponse.json({ success: true, provider: 'custom-sms' });

  } catch (err: any) {
    console.error('Verify OTP API Error:', err);
    return NextResponse.json({ error: err.message || 'Server error verifying OTP' }, { status: 500 });
  }
}
