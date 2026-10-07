import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings as bookingsTable } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { INITIAL_BOOKINGS } from '@/data/initialBookings';

// In-memory fallback cache initialized with sample bookings
let inMemoryBookings = [...INITIAL_BOOKINGS];

function isRealDbConfigured() {
  const url = process.env.DATABASE_URL || '';
  return url.length > 0 && !url.includes('your-aws-rds-endpoint') && !url.includes('password@');
}

export async function GET() {
  try {
    if (isRealDbConfigured()) {
      try {
        const data = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
        const formatted = data.map((b) => ({
          ...b,
          createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: b.updatedAt ? new Date(b.updatedAt).toISOString() : new Date().toISOString(),
        }));
        return NextResponse.json({ success: true, bookings: formatted, source: 'postgres' });
      } catch (dbErr) {
        console.warn('Postgres connection failed, serving in-memory fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, bookings: inMemoryBookings, source: 'memory_fallback' });
  } catch (error: any) {
    console.error('API /api/bookings GET error:', error);
    return NextResponse.json(
      { success: true, bookings: inMemoryBookings, source: 'error_fallback' }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.tourTitle || !body.date) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking parameters' },
        { status: 400 }
      );
    }

    const bookingId = body.id || `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalAmount = Number(body.amount) || 0;
    const is30Adv = body.paymentMode === 'advance_30';
    const isPrepaid = body.paymentMode === 'prepaid';
    
    const advancePaid = body.advancePaid ?? (is30Adv ? Math.round(totalAmount * 0.3) : isPrepaid ? totalAmount : 0);
    const balanceDue = body.balanceDue ?? (totalAmount - advancePaid);
    const pStatus = body.paymentStatus || (isPrepaid ? 'collected' : is30Adv ? 'partial_paid' : 'pending');

    const newBookingData = {
      id: bookingId,
      userId: body.userId || null,
      tourId: body.tourId || 'general',
      tourTitle: body.tourTitle,
      date: body.date,
      guestCount: Number(body.guestCount) || 1,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      pickupLocation: body.pickupLocation || '',
      specialRequirements: body.specialRequirements || '',
      status: body.status || 'pending',
      paymentMode: body.paymentMode || 'cod',
      paymentStatus: pStatus,
      amount: totalAmount,
      advancePaid: advancePaid,
      balanceDue: balanceDue,
      razorpayOrderId: body.razorpayOrderId || null,
      razorpayPaymentId: body.razorpayPaymentId || null,
      razorpaySignature: body.razorpaySignature || null,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    // Update in-memory cache first
    const existingIdx = inMemoryBookings.findIndex((b) => b.id === bookingId);
    if (existingIdx >= 0) {
      inMemoryBookings[existingIdx] = { ...inMemoryBookings[existingIdx], ...newBookingData };
    } else {
      inMemoryBookings = [newBookingData as any, ...inMemoryBookings];
    }

    // Update real Postgres DB if configured
    if (isRealDbConfigured()) {
      try {
        await db.insert(bookingsTable).values(newBookingData).onConflictDoUpdate({
          target: bookingsTable.id,
          set: {
            status: newBookingData.status,
            paymentMode: newBookingData.paymentMode,
            paymentStatus: newBookingData.paymentStatus,
            amount: newBookingData.amount,
            advancePaid: newBookingData.advancePaid,
            balanceDue: newBookingData.balanceDue,
            razorpayOrderId: newBookingData.razorpayOrderId,
            razorpayPaymentId: newBookingData.razorpayPaymentId,
            razorpaySignature: newBookingData.razorpaySignature,
            updatedAt: new Date(),
          }
        });
      } catch (dbErr) {
        console.warn('Postgres insert/update failed, cached in-memory:', dbErr);
      }
    }

    return NextResponse.json({ success: true, booking: newBookingData });
  } catch (error: any) {
    console.error('API /api/bookings POST error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, paymentMode, paymentStatus, amount, advancePaid, balanceDue, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing booking ID' }, { status: 400 });
    }

    const updateFields: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) updateFields.status = status;
    if (paymentMode !== undefined) updateFields.paymentMode = paymentMode;
    if (paymentStatus !== undefined) updateFields.paymentStatus = paymentStatus;
    if (amount !== undefined) updateFields.amount = Number(amount);
    if (advancePaid !== undefined) updateFields.advancePaid = Number(advancePaid);
    if (balanceDue !== undefined) updateFields.balanceDue = Number(balanceDue);
    if (razorpayPaymentId !== undefined) updateFields.razorpayPaymentId = razorpayPaymentId;
    if (razorpayOrderId !== undefined) updateFields.razorpayOrderId = razorpayOrderId;
    if (razorpaySignature !== undefined) updateFields.razorpaySignature = razorpaySignature;

    // Update in-memory cache
    inMemoryBookings = inMemoryBookings.map((b) => (b.id === id ? { ...b, ...updateFields } : b));

    // Update Postgres DB if configured
    if (isRealDbConfigured()) {
      try {
        await db.update(bookingsTable).set(updateFields).where(eq(bookingsTable.id, id));
      } catch (dbErr) {
        console.warn('Postgres patch failed:', dbErr);
      }
    }

    return NextResponse.json({ success: true, id, updateFields });
  } catch (error: any) {
    console.error('API /api/bookings PATCH error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing booking ID' }, { status: 400 });
    }

    // Delete from in-memory cache
    inMemoryBookings = inMemoryBookings.filter((b) => b.id !== id);

    // Delete from Postgres DB if configured
    if (isRealDbConfigured()) {
      try {
        await db.delete(bookingsTable).where(eq(bookingsTable.id, id));
      } catch (dbErr) {
        console.warn('Postgres delete failed:', dbErr);
      }
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error('API /api/bookings DELETE error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
