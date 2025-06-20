'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
    const cart = useCartStore((state) => state.cart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    return (
        <Sheet>
            {/* 🛒 Icon trigger */}
            <SheetTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6 text-black" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                                {cart.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        )}
                    </div>
                    <div className="text-sm text-gray-800">
                        <p className="text-xs">Shopping cart:</p>
                        <p className="font-semibold text-base">₹{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                </div>
            </SheetTrigger>

            {/* Drawer content */}
            <SheetContent className="w-full sm:w-[400px] p-6 space-y-4">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 pt-10">Your cart is empty</p>
                ) : (
                    <div className="flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
                        {cart.map((item) => (
                            <div
                                key={`${item.productId}-${item.variantId}`}
                                className="flex gap-3 border rounded-lg p-3 items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-600">{item.variantName}</p>
                                    <p className="text-sm font-medium mt-1">₹{item.price}</p>
                                </div>
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-1 border rounded px-1">
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.variantId,
                                                item.quantity - 1
                                            )
                                        }
                                        className="p-1 text-gray-700 hover:text-black"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="px-2 text-sm font-medium">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.variantId,
                                                item.quantity + 1
                                            )
                                        }
                                        className="p-1 text-gray-700 hover:text-black"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Checkout Section */}
                {cart.length > 0 && (
                    <div className="pt-4 border-t">
                        <div className="flex justify-between mb-4">
                            <span className="text-lg font-medium">Subtotal:</span>
                            <span className="text-lg font-bold">₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Checkout
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
