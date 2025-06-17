// app/blogs/components/BlogCard.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ blog }) {
    return (
        <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
            <Link href={`/blogs/${blog.slug}`} className="group">
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={blog.imageURL}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                            {blog.category?.name || 'Legal Insight'}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-center mb-3">
                            <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                </svg>
                                <span>
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.shortDescription}
                        </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-end">
                            {/* <div className="flex items-center">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {blog.author?.name || 'Legal Expert'}
                                    </p>
                                </div>
                            </div> */}

                            <span className="inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                                Read more
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}