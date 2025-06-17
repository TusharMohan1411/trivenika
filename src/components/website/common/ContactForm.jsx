"use client"
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsSubmitted(true)
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', description: '' });
                }, 3000);
                toast.success('Message sent successfully!')
            } else {
                toast.error('Failed to send message. Please try again.')
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }

    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003366] to-indigo-700 p-4 sm:p-8 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/20"></div>
                <div className="absolute bottom-20 -left-10 w-60 h-60 rounded-full bg-indigo-500/20"></div>
                <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-white/10"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Contact Us
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-blue-100 max-w-md mx-auto">
                        Have questions? We're here to help. Get in touch with our team today.
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                        <p className="text-blue-100">
                            We've received your message and will contact you shortly.
                        </p>
                    </div>
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute top-3 left-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="How can we help you?"
                                className="w-full py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-2 w-full py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${isSubmitting
                                ? 'bg-indigo-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600'
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Send Message
                                </div>
                            )}
                        </button>
                    </form>
                )}
            </div>
            <Toaster position="top-right" />
        </div>
    );
};

// Add these to your global CSS
const styles = `
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Add the styles to the head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
}