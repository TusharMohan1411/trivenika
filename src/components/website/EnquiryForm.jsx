'use client';

import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function EnquiryForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const onSubmit = async (data) => {
        setError(null);
        setSuccessMsg(null);
        try {
            await axios.post('/api/enquiry', data);
            reset();
            setSuccessMsg('Enquiry Created Successfully. We will get back to you soon.');
            toast.success('Enquiry Created Successfully.');
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'Something went wrong';
            setError(message);
            toast.error(message);
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl w-full shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-primary mb-3">
                Need help?
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.name
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.email
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Contact Number */}
                <div>
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.contact
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('contact', {
                            required: 'Contact number is required',
                            minLength: { value: 10, message: 'Minimum 10 digits required' },
                            maxLength: { value: 15, message: 'Maximum 15 digits allowed' },
                        })}
                    />
                    {errors.contact && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.contact.message}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div className="mb-2">
                    <textarea
                        rows={4}
                        placeholder="Write your message"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.message
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Inline Error */}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* Inline Success */}
                {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-primary text-white font-semibold py-2 rounded-md hover:bg-[#231d35] transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
            <Toaster position="top-right" />

        </div>
    );
}
