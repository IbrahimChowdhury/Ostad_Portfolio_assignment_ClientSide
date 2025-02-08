"use client"
import { useState, useEffect } from 'react';
import { fetchWithAuth, uploadToCloudinary } from '@/utility/api';

export default function TeamPage() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        image: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;
            if (selectedFile) {
                imageUrl = await uploadToCloudinary(selectedFile);
            }

            const endpoint = editingMember 
                ? `/update-team/${editingMember._id}`
                : '/create-team';

            const response = await fetchWithAuth(endpoint, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl
                })
            });

            if (response.ok) {
                setFormData({ name: '', position: '', image: '' });
                setSelectedFile(null);
                setEditingMember(null);
                fetchTeam();
            }
        } catch (error) {
            console.error('Error saving team member:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this team member?')) return;

        try {
            const response = await fetchWithAuth(`/delete-team/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchTeam();
            }
        } catch (error) {
            console.error('Error deleting team member:', error);
        }
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            position: member.position,
            image: member.image
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Team</h1>

            {/* Team Member Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="mt-1 block w-full"
                        accept="image/*"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    {loading ? 'Saving...' : (editingMember ? 'Update Member' : 'Add Member')}
                </button>
            </form>

            {/* Team List */}
            <div className="bg-white shadow rounded-lg">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {team.map((member) => (
                        <li key={member._id} className="bg-white rounded-lg shadow p-4">
                            <div className="space-y-4">
                                {member.image && (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg font-medium">{member.name}</h3>
                                    <p className="text-gray-500">{member.position}</p>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 