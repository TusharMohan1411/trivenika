import React from 'react'

function TTLHeader() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003366] to-[#004080] opacity-95 z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                <span className="block">Pick the slot to get</span>
                                <span className="text-[#FFD700] block mt-2">Expert Solution</span>
                            </h1>
                            <p className="text-xl mb-8 max-w-2xl text-blue-100">
                                Let's talk about your legal needs — whether it's launching your startup,
                                registering your business, or handling compliance. Our experts are just
                                a call away to guide you in the right direction.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-[#FFD700] hover:bg-[#FFC000] text-[#003366] font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl">
                                    Book Consultation
                                </button>
                                <button className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-bold py-3 px-8 rounded-lg transition-all">
                                    View Plans
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-[#003366] text-white p-3 rounded-lg mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#003366]">Secure & Confidential</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">100% secure payment processing</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">Attorney-client privilege maintained</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-6 w-6 text-[#00C853] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">GDPR compliant data handling</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TTLHeader