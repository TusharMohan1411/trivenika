// components/CartIcon.jsx
'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartIcon() {
    const cart = useCartStore((state) => state.cart);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <Link href="/cart" className="flex items-center gap-2 relative">
            <div className="relative">
                <ShoppingBag className="w-6 h-6 text-black" />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                        {totalItems}
                    </span>
                )}
            </div>
            <div className="text-sm text-gray-800">
                <p className="text-xs">Shopping cart:</p>
                <p className="font-semibold text-base">₹{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
        </Link>
    );
}
