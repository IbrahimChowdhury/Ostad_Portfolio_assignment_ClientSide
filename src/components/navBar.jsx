"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/blog', label: 'Blog' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <nav className="bg-white shadow-lg fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-purple-900">YourBrand</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${
                                    isActive(item.path)
                                        ? 'text-purple-900 border-b-2 border-purple-900'
                                        : 'text-gray-600 hover:text-purple-900 hover:border-b-2 hover:border-purple-900'
                                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-purple-900 hover:bg-gray-100 focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                } md:hidden fixed inset-0 z-50 bg-white transform transition-all duration-300 ease-in-out`}
                style={{ top: '64px' }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${
                                isActive(item.path)
                                    ? 'bg-purple-900 text-white'
                                    : 'text-gray-600 hover:bg-purple-100 hover:text-purple-900'
                            } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    style={{ top: '64px' }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar; 