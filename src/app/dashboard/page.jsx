"use client"
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '@/utility/api';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        blogs: 0,
        services: 0,
        team: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [blogsRes, servicesRes, teamRes] = await Promise.all([
                fetchWithAuth('/get-all-blogs'),
                fetchWithAuth('/get-all-services'),
                fetchWithAuth('/get-all-teams')
            ]);

            const [blogsData, servicesData, teamData] = await Promise.all([
                blogsRes.json(),
                servicesRes.json(),
                teamRes.json()
            ]);

            setStats({
                blogs: blogsData.data?.length || 0,
                services: servicesData.data?.length || 0,
                team: teamData.data?.length || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const stats_cards = [
        {
            title: 'Total Blogs',
            count: stats.blogs,
            link: '/dashboard/blogs',
            color: 'from-purple-600 to-purple-400'
        },
        {
            title: 'Total Services',
            count: stats.services,
            link: '/dashboard/services',
            color: 'from-blue-600 to-blue-400'
        },
        {
            title: 'Team Members',
            count: stats.team,
            link: '/dashboard/team',
            color: 'from-green-600 to-green-400'
        }
    ];

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats_cards.map((card, index) => (
                    <Link 
                        key={index}
                        href={card.link}
                        className={`block p-6 bg-gradient-to-r ${card.color} rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105`}
                    >
                        <div className="text-white">
                            <h2 className="text-xl font-semibold">{card.title}</h2>
                            <p className="text-4xl font-bold mt-2">{card.count}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link 
                        href="/dashboard/blogs"
                        className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                        <h3 className="font-medium text-purple-700">Manage Blogs</h3>
                        <p className="text-sm text-purple-600 mt-1">Create, edit, or delete blog posts</p>
                    </Link>
                    <Link 
                        href="/dashboard/services"
                        className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <h3 className="font-medium text-blue-700">Manage Services</h3>
                        <p className="text-sm text-blue-600 mt-1">Update your service offerings</p>
                    </Link>
                    <Link 
                        href="/dashboard/team"
                        className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        <h3 className="font-medium text-green-700">Manage Team</h3>
                        <p className="text-sm text-green-600 mt-1">Update team member information</p>
                    </Link>
                </div>
            </div>
        </div>
    );
} 