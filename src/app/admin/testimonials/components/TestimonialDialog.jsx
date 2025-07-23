import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Loader2 } from 'lucide-react';
import ImageSelector from "@/components/ImageSelector";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function TestimonialDialog({ open, onOpenChange, selectedTestimonial, onCreate, onUpdate, isSubmitting, error, image, setImage, canEdit, canDelete }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            if (selectedTestimonial) {
                reset({
                    userName: selectedTestimonial.userName,
                    designation: selectedTestimonial.designation,
                    company: selectedTestimonial.company,
                    message: selectedTestimonial.message,
                    isVisible: selectedTestimonial.isVisible,
                });
            } else {
                reset({});
            }
        }
    }, [open, selectedTestimonial, reset]);

    const onSubmit = async (data) => {
        try {
            if (selectedTestimonial?._id) {
                await onUpdate({
                    id: selectedTestimonial._id,
                    data: {
                        ...data,
                        imageURL: image
                    }
                });
                onOpenChange(false);
                setImage(null)
            } else {
                await onCreate({
                    data: {
                        ...data,
                        imageURL: image
                    }
                });
                onOpenChange(false);
                setImage(null)
            }
        } catch (error) {
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[485px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                    </DialogTitle>
                    <DialogDescription>
                        Add review to your website.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-xs bg-gray-100 rounded-full px-2 border py-1 -mb-2 w-fit">Image aspect ratio: 16/13</p>
                    <div className="grid gap-4 py-4">
                        {/* Image URL */}
                        {!image
                            && <div
                                className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer h-48 mb-4 sm:mb-0 aspect-[16/13] w-full"
                                onClick={() => { setIsDialogOpen(true) }}
                            >
                                <span className="text-gray-500">Click to select product image</span>
                            </div>
                        }
                        {image
                            && <div className="h-full w-full border rounded-xl">
                                <Image
                                    height={1000}
                                    width={1000}
                                    quality={100}
                                    src={image}
                                    alt={image}
                                    className="w-full h-72 object-cover rounded-xl"
                                />
                            </div>
                        }
                        {image &&
                            <Button
                                type='button'
                                onClick={() => { setIsDialogOpen(true) }}
                            >
                                Change Image
                            </Button>
                        }

                        {/* userName */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="name" className="text-right mt-2">
                                UserName<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="userName"
                                    {...register("userName", {
                                        required: "User Name is required",
                                    })}
                                    className={clsx("w-full", {
                                        "border-red-500": errors.userName,
                                    })}
                                    placeholder="Rajat Patidar"
                                />
                                {errors.userName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.userName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* designation */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="designation" className="text-right mt-2">
                                Place
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="designation"
                                    {...register("designation", {
                                        required: "Place is required."
                                    })}
                                    className={clsx("w-full", {
                                        "border-red-500": errors.name,
                                    })}
                                    placeholder="Rohtak, Haryana"
                                />
                                {errors.designation && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.designation.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Company */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="company" className="text-right mt-2">
                                Heading
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="company"
                                    {...register("company", {
                                        required: "Heading is required."
                                    })}
                                    className={clsx("w-full", {
                                        "border-red-500": errors.name,
                                    })}
                                    placeholder="Excellent Quality"
                                />
                                {errors.company && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.company.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="message" className="text-right mt-2">
                                Message<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Textarea
                                    id="message"
                                    {...register("message", {
                                        required: "Message is required",
                                    })}
                                    className={clsx("w-full", {
                                        "border-red-500": errors.message,
                                    })}
                                    placeholder="Write the review message here."
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Is Visible */}
                        <div className="flex items-center gap-2">
                            <Label>Visible</Label>
                            <Switch
                                checked={watch('isVisible')}
                                onCheckedChange={(val) => setValue('isVisible', val)}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-600 mb-5 text-sm">Error: {error}</p>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                            {selectedTestimonial ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

            <ImageSelector
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                setImage={setImage}
            />
        </Dialog>
    )
}
