import { getTestimonialsData } from '@/lib/main/getStaticData';
import Image from 'next/image';

export default async function Testimonials() {
    const data = await getTestimonialsData({
        isVisible: true,
        limit: 3,
        page: 1
    });

    const testimonials = data?.testimonials?.length > 0 ? data.testimonials : [
        {
            userName: 'Sneha Kapoor',
            designation: 'Boutique Owner',
            company: 'Fashion Forward',
            imageURL: '/avatars/sneha.png',
            message: 'Starting my company felt overwhelming, but their legal team made it smooth and stress-free. Everything was done on time with full clarity.'
        },
        {
            userName: 'Priya Mehta',
            designation: 'Startup Founder',
            company: 'InnovateX',
            imageURL: '/avatars/priya.png',
            message: 'Their GST and PF registration service was quick, transparent, and affordable. Highly recommend for any small business owner.'
        },
        {
            userName: 'Yogesh Arora',
            designation: 'Tech Entrepreneur',
            company: 'CodeVerse',
            imageURL: '/avatars/yogesh.png',
            message: 'We had no idea how to protect our brand, but their trademark experts guided us through every step. Professional and reliable.'
        }
    ];

    return (
        <section className="bg-secondary w-full" id='testimonials'>
            <div className='w-11/12 md:max-w-7xl py-16 lg:px-16 mx-auto flex flex-col gap-12'>
                {/* Heading */}
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-white text-2xl md:text-3xl">Trusted by</h2>
                    <h3 className="text-white text-3xl md:text-5xl font-bold">
                        Professionals Across India
                    </h3>
                </div>

                {/* Cards */}
                <div className="w-full mx-auto py-10 flex flex-col md:flex-row gap-y-16 sm:gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="relative bg-white rounded-2xl p-4 pt-16 flex-1 shadow-lg">
                            {/* Avatar */}
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm shadow-black/50">
                                    <Image
                                        src={t.imageURL}
                                        alt={t.userName}
                                        width={200}
                                        height={200}
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                            </div>

                            {/* Name & Role */}
                            <h4 className="text-center text-xl font-semibold text-gray-800">
                                {t.userName}
                            </h4>
                            <p className="text-sm text-gray-500 text-center">{t?.designation && t?.designation + ','} {t.company}</p>


                            {/* Stars */}
                            <div className="flex justify-center mt-2">
                                <span className="text-yellow-400 text-lg">★★★★★</span>
                            </div>

                            {/* Divider */}
                            <hr className="my-4 border-t border-dashed border-gray-200" />

                            {/* Quote */}
                            <blockquote className="text-gray-700 text-sm leading-relaxed relative pl-4">
                                <span className="absolute top-0 left-0 text-4xl text-gray-200">“</span>
                                <span className="ml-2">{t.message}</span>
                            </blockquote>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
