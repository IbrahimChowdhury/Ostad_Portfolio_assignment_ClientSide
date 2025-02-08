import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HeroSection from '@/components/HeroSection';
import BlogSection from '@/components/BlogSection';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We deliver exceptional results through innovation, expertise, and dedication
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Fast Performance</h3>
                            <p className="text-gray-600">
                                Lightning-fast solutions that keep your business running at peak efficiency
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
                            <p className="text-gray-600">
                                Top-notch security measures to protect your valuable data
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                            <p className="text-gray-600">
                                Round-the-clock support to assist you whenever you need help
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <BlogSection />

            {/* CTA Section */}
            <section className="bg-purple-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust us with their business needs
                    </p>
                    <button className="bg-white text-purple-900 px-8 py-3 rounded-full text-lg font-semibold 
                                   hover:bg-purple-100 transition-colors duration-300">
                        Contact Us Today
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
} 