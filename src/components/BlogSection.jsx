"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchWithAuth } from '@/utility/api';

const BlogSection = ({ limit = 6 }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetchWithAuth('/get-all-blogs');
            const data = await response.json();
            setBlogs(data.data?.slice(0, limit) || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <div className="animate-spin h-8 w-8 mx-auto border-4 border-purple-500 rounded-full border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Latest Blog Posts
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with our latest insights, news, and expert knowledge
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link 
                            key={blog._id} 
                            href={`/blog`}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Blog Image */}
                            <div className="relative h-48">
                                {blog.image ? (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                                        <span className="text-purple-400 text-4xl">📝</span>
                                    </div>
                                )}
                            </div>

                            {/* Blog Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {blog.content}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-600 font-medium">Read More →</span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent 
                                 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 
                                 transition-colors duration-300"
                    >
                        View All Posts
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection; 