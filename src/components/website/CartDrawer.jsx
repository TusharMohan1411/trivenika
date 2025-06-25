'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { ShoppingBag, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

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
            <SheetContent className="w-full sm:w-[400px] p-6 flex flex-col">
                <SheetHeader className={' pb-0 pl-0'}>
                    <SheetTitle className={'text-primary text-xl font-bold'}>Your Cart</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
                        {/* Empty cart illustration */}
                        <div className="relative w-48 h-48 mb-6">
                            <div className="absolute inset-0 bg-green-50 rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-24 h-24 text-green-200" strokeWidth={1} />
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="bg-white rounded-full p-4 shadow-md">
                                    <ShoppingBag className="w-12 h-12 text-green-600" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your cart feels light</h3>
                        <p className="text-gray-500 max-w-xs mb-6">
                            No natural goodies in your cart yet. Start adding wellness to your life!
                        </p>

                        <SheetTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base">
                                Browse Products
                            </Button>
                        </SheetTrigger>

                        <p className="text-gray-400 text-sm mt-6 flex items-center">
                            <span className="inline-block w-4 h-0.5 bg-gray-300 mr-2"></span>
                            Nature's goodness awaits you
                            <span className="inline-block w-4 h-0.5 bg-gray-300 ml-2"></span>
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
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

                        {/* Checkout Section */}
                        <div className="pt-4 border-t">
                            <div className="flex justify-between mb-4">
                                <span className="text-lg font-medium">Subtotal:</span>
                                <span className="text-lg font-bold">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <Link href={'/checkout'}>
                                <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}