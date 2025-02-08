"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative container mx-auto px-6 pt-32 pb-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <motion.div 
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Welcome to My
                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                {" "}Portfolio
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8">
                            I am a professional web developer using modern technologies to build
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
                                           rounded-lg text-white font-semibold transform transition 
                                           hover:scale-105 hover:shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                                Get Started
                            </button>
                            <button className="px-8 py-3 border border-pink-500 rounded-lg text-white 
                                           font-semibold transform transition hover:bg-pink-500/10 
                                           hover:scale-105">
                                Learn More
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div 
                        className="flex-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="relative w-full max-w-lg mx-auto">
                            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full 
                                          mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-300 rounded-full 
                                          mix-blend-multiply filter blur-xl opacity-70 animate-blob 
                                          animation-delay-2000"></div>
                            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full 
                                          mix-blend-multiply filter blur-xl opacity-70 animate-blob 
                                          animation-delay-4000"></div>
                            <Image
                                src="/ibrahim.jpg"
                                alt="Hero Image"
                                width={600}
                                height={600}
                                className="relative rounded-lg transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div 
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {[
                        { number: "5+", text: "Years Experience" },
                        { number: "100+", text: "Projects Completed" },
                        { number: "50+", text: "Happy Clients" },
                        { number: "3", text: "Award Winning" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h2>
                            <p className="text-gray-400">{stat.text}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;