'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '@/store/cartStore';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
    'Lakshadweep', 'Puducherry'
];

const checkoutSchema = z.object({
    fullName: z.string().min(3, 'Enter full name'),
    contact: z.string().min(10, 'Enter valid contact'),
    email: z.string().email(),
    address: z.string().min(10, 'Enter full address'),
    state: z.string(),
    pin: z.string().min(6, 'Enter valid PIN'),
    paymentMethod: z.enum(['cod', 'online']),
});

export default function CheckoutPage() {
    const [userId, setUserId] = useState('')
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            setUserId(session.user.id)
        }
    }, [session])

    const cart = useCartStore((state) => state.cart);
    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const form = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: '',
            contact: '',
            email: '',
            address: '',
            state: '',
            pin: '',
            paymentMethod: 'cod',
        },
    });

    // load Razorpay script
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        return () => document.body.removeChild(script)
    }, [])

    const onSubmit = async (data) => {
        if (!cart.length) return alert('Cart is empty');

        const orderPayload = {
            type: 'website',
            user: userId,
            shippingDetails: {
                fullName: data.fullName,
                contact: data.contact,
                email: data.email,
                address: data.address,
                state: data.state,
                pin: data.pin,
            },
            cart: cart.map((item) => ({
                serviceId: item.productId,
                variantId: item.variantId,
                serviceName: item.name,
                variantName: item.variantName,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount: total,
            paymentMethod: data.paymentMethod,
        };

        if (data.paymentMethod === 'cod') {
            const confirmOrder = confirm('Are you sure you want to place a COD order?');
            if (!confirmOrder) return;

            const res = await fetch('/api/order/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...orderPayload, paymentStatus: 'pending' })
            });

            const result = await res.json();
            if (res.ok) {
                alert('COD Order placed successfully ✅');
            } else {
                alert('Failed to place order: ' + result?.error || 'Server error');
            }
        } else {
            // Create Razorpay order first
            const razorRes = await fetch('/api/order/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total })
            });
            const razorData = await razorRes.json();
            if (!razorData?.id) return alert('Failed to create Razorpay order');

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: razorData.amount,
                currency: 'INR',
                name: 'Trivemika',
                description: 'Order Payment',
                order_id: razorData.id,
                handler: async function (response) {
                    // Verify signature
                    const verifyRes = await fetch('/api/order/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response),
                    });
                    const isValid = await verifyRes.json();

                    if (isValid.valid) {
                        const saveRes = await fetch('/api/order/create', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ...orderPayload,
                                razorpayOrder: razorData.id,
                                transactionId: response.razorpay_payment_id,
                                paymentStatus: 'paid'
                            })
                        });

                        if (saveRes.ok) {
                            alert('Online order placed successfully ✅');
                        } else {
                            alert('Failed to save order');
                        }
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: data.fullName,
                    email: data.email,
                    contact: data.contact
                },
                theme: { color: '#10b981' },
                modal: {
                    ondismiss: () => {
                        console.log("Payment popup closed.");
                        // toast.error("Payment cancelled by user!", { id: toastId })
                        // setLoading(false)
                    },
                },
            };

            new window.Razorpay(options).open()

        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 shadow rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* All Fields */}
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl><Textarea {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                                        <SelectContent>
                                            {indianStates.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PIN Code</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="cod" id="cod" />
                                            <Label htmlFor="cod">Cash on Delivery</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="online" id="online" />
                                            <Label htmlFor="online">Online Payment</Label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Place Order
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                        <div key={`${item.productId}-${item.variantId}`} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.variantName}</p>
                            </div>
                            <p className="font-semibold">
                                ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-4">
                    <span>Total:</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
