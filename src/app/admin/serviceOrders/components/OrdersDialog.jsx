"use client";
import {
    FileText,
    CalendarCheck,
    CalendarClock,
    IndianRupee,
    Hash,
    File,
    User,
    Phone,
    CheckCircle2,
    XCircle,
    Star,
    Download,
    ArrowLeft,
    Info,
    Eye,
    ListChecks
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrderDetailsDialog({ order }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const downloadFile = async (ab, filename) => {
        const response = await fetch(ab);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'document';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Function to format detail keys
    const formatKey = (key) => {
        return key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="hover:bg-gray-100">
                    <Eye size={18} className="text-gray-600" />
                </Button>
            </DialogTrigger>

            <DialogContent className="lg:min-w-4xl w-full md:w-3xl p-0 bg-white rounded-xl overflow-hidden">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-[#002244] to-[#004488] text-white p-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl font-bold flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <ListChecks size={20} />
                                    Order Details
                                </div>
                                <p className="text-xs font-normal mt-1 text-blue-200">
                                    #{order._id.slice(-8)}
                                </p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                </div>

                {/* Main Content */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Left Column */}
                    <div className="space-y-5">
                        {/* Service Information */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <Star className="text-[#002244]" size={18} />
                                Service Information
                            </h3>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 flex items-center gap-1">
                                        <Star size={14} className="text-gray-500" />
                                        Service:
                                    </span>
                                    <span className="font-medium">{order.service?.name}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 flex items-center gap-1">
                                        <FileText size={14} className="text-gray-500" />
                                        Sub-service:
                                    </span>
                                    <span className="font-medium">{order.subService?.name}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 flex items-center gap-1">
                                        <IndianRupee size={14} className="text-gray-500" />
                                        Amount:
                                    </span>
                                    <span className="font-medium">₹{order.amount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <CalendarClock className="text-[#002244]" size={18} />
                                Timeline
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                                        <CalendarCheck className="text-blue-700" size={14} />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">Created</p>
                                        <p className="text-gray-600">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                                        <CalendarClock className="text-blue-700" size={14} />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">Last Updated</p>
                                        <p className="text-gray-600">
                                            {formatDate(order.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* User Information */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <User className="text-[#002244]" size={18} />
                                User Information
                            </h3>

                            <div className="space-y-2">


                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 flex items-center gap-1">
                                        <Phone size={14} className="text-gray-500" />
                                        Phone:
                                    </span>
                                    <span className="font-medium">{order.user?.phone}</span>
                                </div>

                                {/* Dynamic Details */}
                                {Object.entries(order.details || {})
                                    .map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 flex items-center gap-1">
                                                <Info size={14} className="text-gray-500" />
                                                {formatKey(key)}:
                                            </span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Status & Documents */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-md font-bold text-[#002244] flex items-center gap-2 mb-3">
                                <FileText className="text-[#002244]" size={18} />
                                Status & Documents
                            </h3>

                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        className={`flex items-center text-xs ${order.status === 'active'
                                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                                            }`}
                                    >
                                        {order.status === 'active' ? (
                                            <CheckCircle2 size={14} className="mr-1" />
                                        ) : (
                                            <XCircle size={14} className="mr-1" />
                                        )}
                                        Status: {order.status}
                                    </Badge>

                                    <Badge
                                        className={`flex items-center text-xs ${order.paymentStatus === 'paid'
                                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                            : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                                            }`}
                                    >
                                        {order.paymentStatus === 'paid' ? (
                                            <CheckCircle2 size={14} className="mr-1" />
                                        ) : (
                                            <XCircle size={14} className="mr-1" />
                                        )}
                                        Payment: {order.paymentStatus}
                                    </Badge>
                                </div>

                                <div className="mt-3">
                                    <h4 className="text-xs font-medium text-gray-900 mb-2 flex items-center">
                                        <FileText size={14} className="mr-2 text-gray-500" />
                                        Uploaded Documents:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {order.documents?.map(doc => (
                                            <div
                                                key={doc._id}
                                                className="flex items-center bg-gray-50 rounded-md px-2 py-1.5 hover:bg-blue-50 cursor-pointer transition-colors text-xs"
                                                onClick={() => downloadFile(doc.url, doc.fieldName)}
                                            >
                                                <File size={14} className="text-gray-500 mr-1.5" />
                                                <span className="text-gray-700 truncate max-w-[100px]">
                                                    {doc.fieldName}
                                                </span>
                                                <Download size={12} className="ml-1.5 text-blue-600" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}