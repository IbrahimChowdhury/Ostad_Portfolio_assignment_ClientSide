"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
              });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.data);
                router.push('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="mt-2 text-gray-300">Please sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-gray-300/10 
                                         rounded-lg text-white placeholder-gray-400 focus:outline-none 
                                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                         transition duration-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-gray-300/10 
                                         rounded-lg text-white placeholder-gray-400 focus:outline-none 
                                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                         transition duration-200"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent 
                                 rounded-lg shadow-sm text-sm font-medium text-white
                                 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 
                                 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition duration-200 transform hover:scale-[1.02]"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    {/* Register Link */}
                    <div className="text-center text-sm">
                        <span className="text-gray-300">Don't have an account? </span>
                        <Link 
                            href="/register" 
                            className="font-medium text-purple-300 hover:text-purple-200 transition duration-200"
                        >
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;