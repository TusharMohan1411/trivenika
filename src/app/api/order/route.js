// app/api/order/route.js
import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/upload'
import { connectDB } from '@/lib/mongodb'
import Order from '@/models/orderModel'
import SubService from '@/models/subServiceModel'    // <–– make sure this path is correct
import User from '@/models/userModel'

export const runtime = 'nodejs'

export async function POST(request) {
    await connectDB()

    const formData = await request.formData()
    const allFields = {}
    const documents = []

    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            const arrayBuffer = await value.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const dataUri = `data:${value.type};base64,${buffer.toString('base64')}`

            try {
                const upload = await uploadToCloudinary(dataUri)
                documents.push({ fieldName: key, url: upload.secure_url })
            } catch (err) {
                console.error('Cloudinary upload failed for', key, err)
            }
        } else {
            allFields[key] = value
        }
    }

    // destructure out your routing/payment fields
    let {
        userId,
        service,
        subServiceId,
        amount,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        ...detailFields
    } = allFields

    // fallback: if service wasn’t sent, look it up from SubService
    if (!service) {
        throw new Error('service not found')
    }

    // (optional) log to debug
    console.log({ service, subServiceId, userId })

    const order = await Order.create({
        user: userId,
        service,
        subService: subServiceId,
        details: detailFields,
        documents,
        amount: Number(amount),
        type: 'service',
        paymentStatus: 'paid',
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
