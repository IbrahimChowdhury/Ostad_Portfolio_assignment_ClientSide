"use client"
import { useState, useEffect } from 'react';
import { fetchWithAuth, uploadToCloudinary } from '@/utility/api';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;
            if (selectedFile) {
                imageUrl = await uploadToCloudinary(selectedFile);
            }

            const endpoint = editingService 
                ? `/update-service/${editingService._id}`
                : '/create-service';

            const response = await fetchWithAuth(endpoint, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl
                })
            });

            if (response.ok) {
                setFormData({ name: '', description: '', image: '' });
                setSelectedFile(null);
                setEditingService(null);
                fetchServices();
            }
        } catch (error) {
            console.error('Error saving service:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetchWithAuth(`/delete-service/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchServices();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            image: service.image
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Services</h1>

            {/* Service Form */}
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
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        rows="4"
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
                    {loading ? 'Saving...' : (editingService ? 'Update Service' : 'Create Service')}
                </button>
            </form>

            {/* Services List */}
            <div className="bg-white shadow rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {services.map((service) => (
                        <li key={service._id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {service.image && (
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg font-medium">{service.name}</h3>
                                    <p className="text-gray-500 truncate max-w-md">{service.description}</p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 