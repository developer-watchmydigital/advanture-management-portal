import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TkKOz1sxpHIH97';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'RaaGCvtqYEqEsXONgO8tdxuE';

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, bookingId, tourTitle } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid payment amount is required' }, { status: 400 });
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: bookingId || `receipt_${Date.now()}`,
      notes: {
        tourTitle: tourTitle || 'Goa Adventure Booking',
        bookingId: bookingId || '',
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      keyId: razorpayKeyId,
    });
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay Order' },
      { status: 500 }
    );
  }
}
