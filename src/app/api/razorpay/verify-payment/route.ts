import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'RaaGCvtqYEqEsXONgO8tdxuE';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing Razorpay signature verification parameters' },
        { status: 400 }
      );
    }

    // Verify HMAC SHA256 Signature
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update Drizzle DB if bookingId provided and DATABASE_URL set
      if (bookingId && process.env.DATABASE_URL) {
        try {
          await db
            .update(bookings)
            .set({
              status: 'booked',
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
              updatedAt: new Date(),
            })
            .where(eq(bookings.id, bookingId));
        } catch (dbErr) {
          console.error('Error updating booking in DB after Razorpay verification:', dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        bookingId: bookingId || '',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay payment signature' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Razorpay Signature Verification Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to verify payment signature' },
      { status: 500 }
    );
  }
}
