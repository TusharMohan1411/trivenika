'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import EmptyCart from './components/EmptyCart';
import AuthDialog from '@/components/auth/LoginDialog';
import { Toaster, toast } from 'sonner';
import LoaderButton from '@/components/custom/LoaderButton';
import OrderSummary from './OrderSummary';
import ShippingForm from './ShippingForm';
import PaymentMethod from './PaymentMethod';

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loginOpen, setLoginOpen] = useState(false);
    const [ordering, setOrdering] = useState(false);

    useEffect(() => {
        // load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const cart = useCartStore((s) => s.cart);
    const clearCart = useCartStore((s) => s.clearCart);

    if (!cart.length) {
        return <EmptyCart />;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
                <OrderSummary />
            </div>

            <div className="bg-white rounded-md border p-4 sm:p-6">
                {!session ? (
                    <div className="text-center p-6 border rounded-lg">
                        <p className="mb-4 text-gray-700">Please login to complete your order.</p>
                        <Button onClick={() => setLoginOpen(true)}>Login</Button>
                    </div>
                ) : (
                    <ShippingForm ordering={ordering} setOrdering={setOrdering} />
                )}
            </div>

            <AuthDialog open={loginOpen} onOpenChange={setLoginOpen} />
            <Toaster position="top-right" richColors />
        </div>
    );
}
