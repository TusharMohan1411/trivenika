// app/api/order/fallback/route.js
import { NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connectDB } from '@/lib/mongodb';

export async function POST(req) {
    await connectDB();
    const form = formidable({ multiples: false });
    const [fields, files] = await new Promise((res, rej) => form.parse(req, (err, f, fi) => err ? rej(err) : res([f, fi])));

    const { userId, serviceId, subServiceId, amount, paymentId } = await req.json();
    const order = await Order.create({
        user: userId,
        service: serviceId,
        subService: subServiceId,
        details: fields,
        documents: [],
        amount,
        paymentStatus: 'paid',
        transactionId: paymentId,
    });
    return NextResponse.json({ success: true, order });
}
