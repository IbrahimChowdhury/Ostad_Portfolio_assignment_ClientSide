import Link from 'next/link';

const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
];

const Navbar = () => {
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
                                className="text-gray-600 hover:text-purple-900 hover:border-b-2 hover:border-purple-900 
                                         px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button and Menu - Using CSS only for toggle */}
                    <div className="md:hidden flex items-center">
                        <label htmlFor="mobile-menu" className="p-2 rounded-md text-gray-400 hover:text-purple-900 hover:bg-gray-100 cursor-pointer">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>

            {/* Mobile Menu using CSS-only toggle */}
            <input type="checkbox" id="mobile-menu" className="hidden peer" />
            <div className="hidden peer-checked:block md:hidden bg-white border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 
                                     hover:bg-purple-100 hover:text-purple-900 transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 