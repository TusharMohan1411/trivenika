"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, CheckCircle2, XCircle, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ServiceDetailsDialog({ service }) {
    const [activeTab, setActiveTab] = useState(0);
    // console.log(service)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="hover:bg-gray-100">
                    <Eye size={18} className="text-gray-600" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:min-w-[70vw] sm:max-w-[800px] p-8 bg-white rounded-xl ">
                <DialogHeader className="border-b pb-4 mb-4">
                    <DialogTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <ListChecks size={22} className="text-primary" />
                        {service?.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[70vh] overflow-y-auto pr-2">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6 h-full ">
                        <div className=" border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm flex items-center w-full justify-center">
                            <Image
                                src={service.imageURL}
                                alt={service.name}
                                width={300}
                                height={300}
                                quality={100}
                                className=""
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-lg text-center">
                                <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
                                {service.status ? (
                                    <CheckCircle2 size={18} className="text-green-600 mx-auto" />
                                ) : (
                                    <XCircle size={18} className="text-red-600 mx-auto" />
                                )}
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg text-center">
                                <p className="text-xs font-medium text-gray-500 mb-1">Featured</p>
                                {service.featured ? (
                                    <CheckCircle2 size={18} className="text-green-600 mx-auto" />
                                ) : (
                                    <XCircle size={18} className="text-red-600 mx-auto" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <DetailItem label="Slug" value={service.slug} />
                            <DetailItem label="Short Description" value={service.shortDescription} />
                            <DetailItem label="Page Heading" value={service.pageHeading} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col h-full overflow-hidden">



                        {/* Service Type Details */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <ListChecks size={16} className="text-primary" />
                                Service Type Details
                            </h3>
                            <ul className="grid grid-cols-1 gap-2">
                                {service.serviceTypeDetails?.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-2 bg-gray-50 px-3 py-2 rounded-md">
                                        <CheckCircle2 size={14} className="text-green-600 mt-1 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Big Descriptions Tabs */}
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <h3 className="font-semibold text-gray-800 mb-3">Page Sections</h3>

                            <div className="flex gap-2 mb-4 border-b border-gray-200">
                                {service.serviceBigDescription?.map((desc, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveTab(i)}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === i
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {desc.name || `Section ${i + 1}`}
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2">
                                {service.serviceBigDescription?.map((desc, i) => (
                                    <div
                                        key={i}
                                        className={`space-y-4 p-4 rounded-lg ${activeTab === i ? "block" : "hidden"
                                            }`}
                                    >
                                        <div className="mb-4">
                                            <p className="text-lg font-semibold text-gray-800">{desc.title}</p>
                                        </div>
                                        <div className="prose max-w-none text-gray-700">
                                            {desc.content.split('\n').map((paragraph, pIndex) => (
                                                <p key={pIndex} className="mb-3">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500">{label}</span>
            <p className="text-sm text-gray-800 bg-gray-50 px-3 py-2 rounded-md break-words">
                {value || <span className="text-gray-400">Not specified</span>}
            </p>
        </div>
    );
}