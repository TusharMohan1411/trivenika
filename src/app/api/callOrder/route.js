// app/api/order/route.js
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/orderModel'
import User from '@/models/userModel'

export const runtime = 'nodejs'

export async function POST(request) {
    await connectDB()

    const formData = await request.formData()
    const allFields = {}

    for (const [key, value] of formData.entries()) {
        allFields[key] = value
    }

    // destructure out your routing/payment fields
    let {
        userId,
        callPlan,
        amount,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        ...detailFields
    } = allFields

    const order = await Order.create({
        user: userId,
        callPlan,
        details: detailFields,
        amount: Number(amount),
        paymentStatus: 'paid',
        type: 'call',
        transactionId: razorpay_payment_id,
        razorpayOrder: razorpay_order_id,
        signature: razorpay_signature,
    })

    const updatedUserData = await User.findByIdAndUpdate(
        userId,
        { $push: { orders: order._id } },
        { new: true, runValidators: true }
    )


    return NextResponse.json({ success: true, order, updatedUserData })
}
