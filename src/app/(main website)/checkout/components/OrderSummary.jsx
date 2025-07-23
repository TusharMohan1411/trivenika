'use client';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function OrderSummary() {
    const cart = useCartStore((s) => s.cart);
    const updateQuantity = useCartStore((s) => s.updateQuantity);

    const orderValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = orderValue > 999 ? 0 : 100;
    const total = orderValue + shipping;

    return (
        <div className="p-6 border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-primary">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[800px] overflow-y-auto pr-2">
                {cart.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 items-start border-b pb-4">
                        <div className="relative w-16 h-16 overflow-hidden rounded-lg border">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{item.variantName}</p>
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}>
                                    <Minus />
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}>
                                    <Plus />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4 grid grid-cols-2">
                <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹{orderValue.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
                </div>
                <div className="font-bold text-lg text-gray-900 pt-2">
                    <div className="flex justify-between"><span>Total Amount</span><span>₹{total.toLocaleString()}</span></div>
                </div>
            </div>
        </div>
    );
}
