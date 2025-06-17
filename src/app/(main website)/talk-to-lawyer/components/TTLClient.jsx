import WebsiteLayout from '@/components/website/WebsiteLayout';
import React from 'react';
import TTLHeader from './TTLHeader';
import TTLExpertise from './TTLExpertise';
import TTLPlansMain from './TTLPlansMain';

export default function TTLClient({ services, categories, callPlans }) {
    // console.log(callPlans)

    const plans = callPlans ? callPlans : []

    return (
        <WebsiteLayout services={services} categories={categories}>
            <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-[#e6f2ff]">
                <TTLHeader />
                <TTLExpertise />
                {/* Consultation Plans */}
                <TTLPlansMain plans={plans} />
            </div>
        </WebsiteLayout>
    );
}

// [
//         {
//             id: 1,
//             name: 'Basic Consultation',
//             price: 499,
//             time: '60 minutes',
//             instructions: ['General legal advice', 'Phone consultation', 'Basic document review']
//         },
//         {
//             id: 2,
//             name: 'Tax Guidance',
//             price: 999,
//             time: '2 hours',
//             instructions: ['Tax filing assistance', 'Deduction optimization', 'Compliance review']
//         },
//         {
//             id: 3,
//             name: 'Business Advisory',
//             price: 2499,
//             time: '4 hours',
//             instructions: ['Business registration', 'Contract review', 'Compliance strategy']
//         },
//         {
//             id: 4,
//             name: 'Comprehensive Support',
//             price: 4999,
//             time: '8 hours',
//             instructions: ['Priority access', 'Document drafting', 'Week-long support']
//         },
//         {
//             id: 5,
//             name: 'Enterprise Solution',
//             price: 9999,
//             time: '16 hours',
//             instructions: ['Dedicated expert', '24/7 availability', 'Full legal support']
//         }
//     ];