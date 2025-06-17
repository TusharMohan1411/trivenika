// app/blogs/components/BlogCard.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ blog }) {
    return (
        <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Link href={`/blogs/${blog.slug}`}>
                <div className="relative h-48">
                    <Image
                        src={blog.imageURL}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.shortDescription}</p>

                    <div className="flex items-center">

                    </div>
                    <div>
                        <p className="text-sm font-medium">{ }</p>
                        <p className="text-xs text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    );
}