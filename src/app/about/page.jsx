"use client"
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '@/utility/api';

export default function AboutPage() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const response = await fetchWithAuth('/get-all-teams');
            const data = await response.json();
            setTeam(data.data || []);
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen">

            {/* About Hero Section */}
            <section className="pt-20 bg-purple-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
                        <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                            We are a team of passionate individuals dedicated to creating innovative solutions
                            that help businesses thrive in the digital age.
                        </p>
                    </div>
                </div>
                <div className="h-32 bg-white" style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 30%)'
                }}></div>
            </section>

            {/* About Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Founded in 2020, we've been at the forefront of digital innovation,
                                helping businesses transform their ideas into reality. Our journey
                                began with a simple mission: to make technology accessible and
                                effective for businesses of all sizes.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Today, we're proud to have served hundreds of clients worldwide,
                                delivering solutions that drive growth and success. Our team of
                                experts brings together years of experience across various industries,
                                ensuring that we can tackle any challenge that comes our way.
                            </p>
                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <h3 className="text-4xl font-bold text-purple-600 mb-2">500+</h3>
                                    <p className="text-gray-600">Projects Completed</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-purple-600 mb-2">300+</h3>
                                    <p className="text-gray-600">Happy Clients</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-purple-600 mb-2">50+</h3>
                                    <p className="text-gray-600">Team Members</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-200 rounded-lg transform rotate-6"></div>
                            <img
                                src="/images/about-image.jpg"
                                alt="About Us"
                                className="relative rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The talented people behind our success
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <div className="animate-spin h-8 w-8 mx-auto border-4 border-purple-500 rounded-full border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((member) => (
                                <div key={member._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
                                    <div className="relative h-64">
                                        {member.image ? (
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                                                <span className="text-purple-400 text-4xl">👤</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-purple-600 mb-4">{member.position}</p>
                                        <div className="flex justify-center space-x-4">
                                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </main>
    );
} 