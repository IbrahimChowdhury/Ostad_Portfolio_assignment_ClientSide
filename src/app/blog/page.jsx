"use client"
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogModal from '@/components/BlogModal';
import { fetchWithAuth } from '@/utility/api';

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetchWithAuth('/get-all-blogs');
            const data = await response.json();
            setBlogs(data.data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Blog Hero Section */}
            <section className="pt-20 bg-purple-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
                        <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                            Discover insights, tips, and the latest updates from our expert team
                        </p>
                    </div>
                </div>
                <div className="h-32 bg-gray-50" style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 30%)'
                }}></div>
            </section>

            {/* Blog Grid Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin h-8 w-8 mx-auto border-4 border-purple-500 rounded-full border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <article 
                                    key={blog._id}
                                    onClick={() => handleBlogClick(blog)}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 
                                             hover:-translate-y-2 hover:shadow-xl cursor-pointer"
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
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {blog.title}
                                        </h2>
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
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination or Load More (Optional) */}
                    {blogs.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
                                           hover:bg-purple-700 transition-colors duration-300">
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Blog Modal */}
            {selectedBlog && (
                <BlogModal
                    blog={selectedBlog}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedBlog(null);
                    }}
                />
            )}

            <Footer />
        </main>
    );
} 