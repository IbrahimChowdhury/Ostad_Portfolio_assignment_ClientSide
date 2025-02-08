"use client"
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchWithAuth } from '@/utility/api';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetchWithAuth('/get-all-services');
            const data = await response.json();
            setServices(data.data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Services Hero Section */}
            <section className="pt-20 bg-purple-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                        <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                            Comprehensive solutions tailored to meet your business needs and drive growth
                        </p>
                    </div>
                </div>
                <div className="h-32 bg-white" style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 30%)'
                }}></div>
            </section>

            {/* Services Grid Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin h-8 w-8 mx-auto border-4 border-purple-500 rounded-full border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div 
                                    key={service._id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden transform 
                                             transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
                                             border border-gray-100"
                                >
                                    {/* Service Image */}
                                    <div className="relative h-48">
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                                                <span className="text-purple-400 text-4xl">🛠️</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Service Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {service.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {service.description}
                                        </p>
                                        <button className="text-purple-600 font-medium hover:text-purple-700 
                                                       transition-colors inline-flex items-center">
                                            Learn More
                                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Our Services
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We deliver excellence through innovation, expertise, and dedication
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
                            <p className="text-gray-600">
                                Our team of professionals brings years of experience and expertise
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
                            <p className="text-gray-600">
                                We ensure the highest quality standards in all our services
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Timely Delivery</h3>
                            <p className="text-gray-600">
                                We value your time and always deliver projects on schedule
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-purple-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss how we can help your business grow
                    </p>
                    <button className="bg-white text-purple-900 px-8 py-3 rounded-full text-lg font-semibold 
                                   hover:bg-purple-100 transition-colors duration-300">
                        Contact Us Now
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
} 