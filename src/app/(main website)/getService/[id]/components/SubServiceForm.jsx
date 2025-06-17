'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import AuthDialog from '@/components/auth/LoginDialog'
import { Loader2 } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SubServiceForm({
    requiredDetails,
    requiredDocuments,
    actualPrice,
    discountedPrice,
    subService,
}) {
    const router = useRouter()
    // turn on real-time validation
    const form = useForm({ mode: 'onChange' })
    const { control, handleSubmit, formState } = form
    const { isValid } = formState

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [userId, setUserId] = useState('')
    const { data: session } = useSession()

    const [service, setService] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (subService) {
            setService(subService.serviceId._id)
        }
    }, [subService])

    const subServiceId = subService._id

    useEffect(() => {
        if (session) {
            setUserId(session.user.id)
        }
    }, [session])

    // load Razorpay script
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        return () => document.body.removeChild(script)
    }, [])

    const onSubmit = async (data) => {
        const toastId = toast.loading('Processing Order... Please wait')
        setLoading(true)
        if (!session) {
            setLoading(false)
            setIsLoginDialogOpen(true);
            return
        };
        if (session && session.user.role !== 'user') {
            setLoading(false)
            alert("Admins and Sub Admins cannot create order!");
            return
        };
        // build FormData
        const formData = new FormData()
        requiredDetails.forEach((d) => formData.append(d.name, data[d.name]))
        requiredDocuments.forEach((doc) => {
            if (data[doc.name]?.[0]) formData.append(doc.name, data[doc.name][0])
        })
        formData.append('service', service)
        formData.append('subServiceId', subServiceId)
        formData.append('userId', userId)

        const price =
            discountedPrice && discountedPrice < actualPrice
                ? discountedPrice
                : actualPrice

        if (price === 0) {
            try {
                formData.append('amount', 0)
                const res = await fetch('/api/order', {
                    method: 'POST',
                    body: formData
                })
                const result = await res.json()
                console.log(result)
                toast.success("Order Created Successfully")
                router.push('/user')

            } catch (err) {
                console.error("Free order failed:", err)
                toast.error("Error creating order")
            } finally {
                setLoading(false)
            }
            return
        }

        // 1. create Razorpay order
        const { data: orderData } = await axios.post(
            '/api/order/razorpay',
            { amount: price },
            { headers: { 'Content-Type': 'application/json' } }
        )

        if (!orderData.id || !orderData.amount) {
            console.error('Bad order response:', orderData)
            return
        }

        // 2. open checkout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: price,
            currency: 'INR',
            name: 'CA Vakeel',
            description: subService.name,
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    const verifyRes = await fetch('/api/order/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response),
                    })
                    const { valid } = await verifyRes.json()
                    if (!valid) throw new Error('Payment verification failed')

                    // rebuild FormData here
                    const finalData = new FormData()
                    requiredDetails.forEach((d) => finalData.append(d.name, data[d.name]))
                    requiredDocuments.forEach((doc) => {
                        if (data[doc.name]?.[0]) finalData.append(doc.name, data[doc.name][0])
                    })
                    finalData.append('service', service)
                    finalData.append('subServiceId', subServiceId)
                    finalData.append('userId', userId)

                    // now append payment info
                    finalData.append('razorpay_payment_id', response.razorpay_payment_id)
                    finalData.append('razorpay_order_id', response.razorpay_order_id)
                    finalData.append('razorpay_signature', response.razorpay_signature)
                    finalData.append('amount', price)

                    const finalRes = await fetch('/api/order', {
                        method: 'POST',
                        body: finalData,
                    })
                    const result = await finalRes.json()
                    console.log('Order Created:', result)
                    setLoading(false)
                    toast.success('Order Created Successfully', { id: toastId })
                    router.push('/user')
                } catch (err) {
                    console.error('Order creation error:', err)
                    toast.error('Error: ' + err, { id: toastId })
                    setLoading(false)
                }
            },
            prefill: { name: '', email: '' },
            theme: { color: '#184674' },
            modal: {
                ondismiss: () => {
                    console.log("Payment popup closed.");
                    toast.error("Payment cancelled by user!", { id: toastId })
                    setLoading(false)
                },
            },
        }

        new window.Razorpay(options).open()
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                    noValidate
                >
                    {/* Required Information */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Required Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {requiredDetails.map((detail) => (
                                <FormField
                                    key={detail._id}
                                    control={control}
                                    name={detail.name}
                                    rules={{ required: `${detail.label} is required` }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{detail.label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={detail.label}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Required Documents */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Required Documents
                        </h2>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2 border-b">Document</th>
                                    <th className="p-2 border-b">Upload</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requiredDocuments.map((doc) => (
                                    <tr key={doc._id}>
                                        <td className="p-2 border-b font-medium">
                                            {doc.label}
                                        </td>
                                        <td className="p-2 border-b">
                                            <FormField
                                                control={control}
                                                name={doc.name}
                                                rules={{
                                                    required: `${doc.label} is required`,
                                                }}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type="file"
                                                                onChange={(e) =>
                                                                    field.onChange(e.target.files)
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Price & Submit */}
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">
                            Price:{' '}
                            {discountedPrice && discountedPrice < actualPrice ? (
                                <>
                                    <span className="text-primary font-bold">
                                        ₹{discountedPrice}
                                    </span>
                                    <span className="ml-2 line-through text-gray-500">
                                        ₹{actualPrice}
                                    </span>
                                </>
                            ) : (
                                <span className="text-primary font-bold">
                                    ₹{actualPrice}
                                </span>
                            )}
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="px-8 py-4"
                            disabled={!isValid || loading}
                        >
                            {loading && <Loader2 className='animate-spin' />} Pay Now
                        </Button>
                    </div>
                </form>
            </Form>

            <AuthDialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
            />
            <Toaster position="top-right" richColors />
        </div>
    )
}
