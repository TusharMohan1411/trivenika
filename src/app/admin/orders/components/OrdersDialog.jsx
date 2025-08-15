"use client";

import {
    FileText,
    CalendarCheck,
    CalendarClock,
    User,
    Star,
    ListChecks
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function OrderDetailsDialog({ open, onOpenChange, order }) {
    if (!order) return null;

    const formatDate = (date) => format(new Date(date), "dd MMM yyyy, hh:mm a");

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="lg:min-w-4xl w-full md:w-3xl p-0 bg-white rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#00441b] to-[#008827] text-white p-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl font-bold flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <ListChecks size={20} />
                                    Order Details
                                </div>
                                <p className="text-xs font-normal mt-1 text-blue-200">
                                    {order?.orderId}
                                </p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                </div>

                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-5">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <Star className="text-[#002244]" size={18} />
                                Items
                            </h3>

                            <ul className="list-disc list-inside text-sm space-y-1">
                                {order.cart?.map((item, idx) => (
                                    <li key={idx}>
                                        {item.serviceName} ({item.variantName}) × {item.quantity} — ₹{item.price}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-3 font-semibold text-right text-[#002244]">
                                Total: ₹{order.totalAmount?.toLocaleString()}
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <CalendarClock className="text-[#002244]" size={18} />
                                Timeline
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <CalendarCheck className="text-blue-700" size={14} />
                                    <div className="text-sm">
                                        <p className="font-medium">Created</p>
                                        <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CalendarClock className="text-blue-700" size={14} />
                                    <div className="text-sm">
                                        <p className="font-medium">Last Updated</p>
                                        <p className="text-gray-600">{formatDate(order.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <User className="text-[#002244]" size={18} />
                                Shipping Details
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Full Name:</span><span className="font-medium">{order.shippingDetails?.fullName}</span></div>
                                <div className="flex justify-between"><span>Contact:</span><span className="font-medium">{order.shippingDetails?.contact}</span></div>
                                <div className="flex justify-between"><span>Email:</span><span className="font-medium">{order.shippingDetails?.email}</span></div>
                                <div className="flex justify-between"><span>Address:</span><span className="font-medium">{order.shippingDetails?.address}</span></div>
                                <div className="flex justify-between"><span>State:</span><span className="font-medium">{order.shippingDetails?.state}</span></div>
                                <div className="flex justify-between"><span>Pin Code:</span><span className="font-medium">{order.shippingDetails?.pin}</span></div>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <FileText className="text-[#002244]" size={18} />
                                Payment & Status
                            </h3>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <Badge variant="outline">Method: {order.paymentMethod}</Badge>
                                <Badge variant="outline" className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                                    Payment: {order.paymentStatus}
                                </Badge>
                                <Badge variant="outline">Type: {order.type}</Badge>
                                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                    Status: {order.status?.[order.status.length - 1]?.currentStatus}
                                </Badge>
                            </div>

                            {order.transactionId && (
                                <p className="mt-3 text-sm text-gray-700">Txn ID: {order.transactionId}</p>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
