import React from 'react'

function ServiceHeader({ service }) {
    return (
        <div className='mb-4'>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {service.pageHeading}
            </h1>

            <ul className="space-y-3 mt-4">
                {service?.serviceTypeDetails?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </span>
                        <span className="text-sm sm:text-base">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServiceHeader