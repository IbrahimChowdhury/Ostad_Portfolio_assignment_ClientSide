"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/s1.jpg',
            title: 'Welcome to YourBrand',
            description: 'Creating innovative solutions for tomorrow\'s challenges',
            buttonText: 'Get Started'
        },
        {
            image: '/s2.jpg',
            title: 'Expert Solutions',
            description: 'Delivering excellence in every project we undertake',
            buttonText: 'Our Services'
        },
        {
            image: '/s3.jpg',
            title: 'Creative Design',
            description: 'Bringing your vision to life with stunning designs',
            buttonText: 'Learn More'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Background Image */}
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
                    
                    {/* Content */}
                    <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 animate-fadeIn delay-200">
                                {slide.description}
                            </p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full 
                                           text-lg font-semibold transition-all duration-300 
                                           hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-fadeIn delay-400">
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-purple-600 w-8' : 'bg-white/50 hover:bg-white'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection; 