"use client"
import React, { useState } from 'react';
import TTLForm from './TTLForm';

function TTLPlans({ plans }) {

    console.log(plans)
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <div>
            <div className="bg-[#003366] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Consultation Plan</h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Flexible options tailored to meet your specific legal and financial needs
                        </p>
                    </div>

                    {!selectedPlan &&
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {plans.map(plan => (
                                <div
                                    key={plan._id}
                                    className={`rounded-xl border-2 p-6 cursor-pointer transition-all time-300 ${selectedPlan === plan._id ? 'border-[#FFD700] bg-white shadow-2xl' : 'border-white/30 bg-white/10 hover:border-white/60'}`}
                                >
                                    <h3 className={`text-xl font-bold mb-2 ${selectedPlan === plan._id ? 'text-[#003366]' : 'text-white'}`}>{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className={`text-3xl font-bold ${selectedPlan === plan._id ? 'text-[#003366]' : 'text-[#FFD700]'}`}>₹{plan.price}</span>
                                        <span className={`${selectedPlan === plan._id ? 'text-gray-600' : 'text-blue-100'}`}> / {plan.time}</span>
                                    </div>
                                    <ul className="space-y-2 mb-6">
                                        {plan?.instructions?.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke={selectedPlan === plan._id ? "#003366" : "#FFD700"}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className={`${selectedPlan === plan._id ? 'text-gray-700' : 'text-blue-100'}`}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`w-full py-2 px-4 rounded-lg font-medium ${selectedPlan === plan._id ? 'bg-[#003366] text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                                    >
                                        {selectedPlan === plan._id ? 'Selected' : 'Select Plan'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                </div>

                {/* Booking Form */}
                {selectedPlan &&
                    <TTLForm selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
                }
            </div>
        </div>
    )
}

export default TTLPlans