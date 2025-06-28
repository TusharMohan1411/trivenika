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
import { Home, Mail, MapPin, Minus, Phone, Plus, User } from 'lucide-react';
import Image from 'next/image';
import AuthDialog from '@/components/auth/LoginDialog';
import LoaderButton from '@/components/custom/LoaderButton';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';

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
    state: z.string().min(1, 'Select your state'),
    pin: z.string().min(6, 'Enter valid PIN'),
    paymentMethod: z.enum(['cod', 'online']),
});

export default function CheckoutPage() {
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const { data: session } = useSession();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [ordering, setOrdering] = useState(false)

    useEffect(() => {
        if (session) {
            setUserId(session.user.id)
        }
    }, [session])
    // console.log(session)

    const cart = useCartStore((state) => state.cart);
    const { updateQuantity } = useCartStore();
    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // console.log(cart)

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
        if (!session.user.id) return setIsLoginDialogOpen(true)
        if (session.user.role !== 'user') return alert("Admins cannot do orders.")

        const toastId = toast.loading('Processing Order... please wait')
        setOrdering(true)

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
            if (!confirmOrder) return

            const res = await fetch('/api/order/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...orderPayload, paymentStatus: 'pending' })
            });

            const result = await res.json();
            if (res.ok) {
                toast.success("Order Placed Sucessfully", { id: toastId })
                setOrdering(false)
                router.push('/user')
            } else {
                toast.error("Failed to place order", { id: toastId })
                console.log('Failed to place order: ' + result?.error || 'Server error');
                setOrdering(false)
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
                                paymentStatus: 'paid',
                                paymentDate: new Date().toISOString()
                            })
                        });

                        if (saveRes.ok) {
                            toast.success("Order Placed Sucessfully", { id: toastId })
                            setOrdering(false)
                            router.push('/user')
                        } else {
                            toast.error("Failed to place order", { id: toastId })
                            setOrdering(false)
                        }
                    } else {
                        // alert('Payment verification failed');
                        toast.error("Payment verification failed", { id: toastId })
                        setOrdering(false)
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
                        // console.log("Payment popup closed.");
                        toast.error("Payment cancelled by user!", { id: toastId })
                        setOrdering(false)
                        // setLoading(false)
                    },
                },
            };

            new window.Razorpay(options).open()
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:col-span-2 border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-primary ">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
                    {cart.map((item) => (
                        <div
                            key={`${item.productId}-${item.variantId}`}
                            className="flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0"
                        >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="font-semibold text-gray-900">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500 mb-2">{item.variantName}</p>

                                <div className="flex items-center gap-3">
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                        onClick={() => updateQuantity(
                                            item.productId,
                                            item.variantId,
                                            item.quantity - 1
                                        )}
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span className="font-medium text-gray-900 w-6 text-center">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                        onClick={() => updateQuantity(
                                            item.productId,
                                            item.variantId,
                                            item.quantity + 1
                                        )}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                        <span>Shipping Charges</span>
                        <span>Free</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-primary">Shipping Details</h2>
                    <p className="text-gray-500 mt-1 text-sm">Enter your information to complete your order</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-gray-700">Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="Ram Singh"
                                                    {...field}
                                                    className="pl-10 py-5 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

                            {/* Contact */}
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-gray-700">Contact</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="XXX-XXX-XXXX"
                                                    {...field}
                                                    className="pl-10 py-5 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="font-medium text-gray-700">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="yourmail@gmail.com"
                                                    {...field}
                                                    className="pl-10 py-5 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="font-medium text-gray-700">Full Address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Textarea
                                                    placeholder="Street address, apartment, floor, etc."
                                                    {...field}
                                                    className="pl-10 py-5 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 min-h-[100px]"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

                            {/* State */}
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-gray-700">State</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full py-5 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500">
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                                                {indianStates.map((s) => (
                                                    <SelectItem
                                                        key={s}
                                                        value={s}
                                                        className="py-3 hover:bg-green-50 focus:bg-green-50"
                                                    >
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />

                            {/* PIN Code */}
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-gray-700">PIN Code</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="Enter PIN code"
                                                    {...field}
                                                    className="pl-10 py-5 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm mt-1" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Payment Method */}
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem className="border-t border-gray-200 pt-6">
                                    <FormLabel className="font-medium text-gray-700 text-lg">
                                        Payment Method
                                    </FormLabel>

                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                            {/* Cash on Delivery */}
                                            <div
                                                className={`flex flex-col border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${field.value === "cod"
                                                    ? "border-green-500 bg-green-50 shadow-sm"
                                                    : "border-gray-200 hover:border-green-300"
                                                    }`}
                                                onClick={() => field.onChange("cod")}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-gray-100 p-3 rounded-full">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 text-green-600"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="flex-1">
                                                        <Label
                                                            htmlFor="cod"
                                                            className="text-lg font-medium text-gray-800 cursor-pointer"
                                                        >
                                                            Cash on Delivery
                                                        </Label>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            Pay when you receive your order
                                                        </p>
                                                    </div>

                                                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${field.value === "cod"
                                                        ? "border-green-500 bg-green-500"
                                                        : "border-gray-300"
                                                        }`}>
                                                        {field.value === "cod" && (
                                                            <div className="h-2 w-2 rounded-full bg-white"></div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-green-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    <span>No extra fees</span>
                                                </div>
                                            </div>

                                            {/* Online Payment */}
                                            <div
                                                className={`flex flex-col border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 ${field.value === "online"
                                                    ? "border-green-500 bg-green-50 shadow-sm"
                                                    : "border-gray-200 hover:border-green-300"
                                                    }`}
                                                onClick={() => field.onChange("online")}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-gray-100 p-3 rounded-full">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 text-blue-500"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="flex-1">
                                                        <Label
                                                            htmlFor="online"
                                                            className="text-lg font-medium text-gray-800 cursor-pointer"
                                                        >
                                                            Online Payment
                                                        </Label>
                                                        <p className="text-gray-500 text-sm mt-1">
                                                            Pay securely with credit/debit card or UPI
                                                        </p>
                                                    </div>

                                                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${field.value === "online"
                                                        ? "border-green-500 bg-green-500"
                                                        : "border-gray-300"
                                                        }`}>
                                                        {field.value === "online" && (
                                                            <div className="h-2 w-2 rounded-full bg-white"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </RadioGroup>

                                    <FormMessage className="text-red-500 text-sm mt-2" />
                                </FormItem>
                            )}
                        />

                        <LoaderButton
                            type="submit"
                            loading={ordering}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold shadow-md transition-all transform hover:scale-[1.02]"
                        >
                            Place Order
                        </LoaderButton>
                    </form>
                </Form>
            </div>
            <AuthDialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
            />
            <Toaster position='top-right' richColors />
        </div>
    );
}
