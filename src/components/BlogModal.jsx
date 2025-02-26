"use client"
import { useEffect } from 'react';

const BlogModal = ({ blog, isOpen, onClose }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with visible pulse animation */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity 
                         animate-pulse-subtle cursor-pointer flex items-center justify-center"
                onClick={onClose}
            >
                <p className="text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
                    Click anywhere to close
                </p>
            </div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto 
                            transform transition-all duration-300 scale-100">
                    {/* Enhanced Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-4 -right-4 bg-white text-gray-500 hover:text-red-600 
                                 w-10 h-10 rounded-full shadow-lg flex items-center justify-center 
                                 transition-all duration-300 hover:scale-110 z-50 group"
                        title="Close (Esc)"
                    >
                        <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-90" 
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="p-6">
                        {/* Image */}
                        {blog.image && (
                            <div className="relative h-72 -mx-6 -mt-6 mb-6">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-contain rounded-t-xl"
                                />
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {blog.title}
                        </h2>

                        {/* Metadata */}
                        <div className="flex items-center text-gray-500 text-sm mb-6">
                            <span className="mr-4">
                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="prose max-w-none">
                            <p className="text-gray-600 whitespace-pre-wrap">
                                {blog.content}
                            </p>
                        </div>

                        {/* Share Buttons */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
                            <div className="flex space-x-4">
                                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </button>
                                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </button>
                                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Close button at bottom */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                            >
                                Press ESC or click outside to close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModal; 