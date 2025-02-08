"use client"
import { useState, useEffect } from 'react';
import { fetchWithAuth, uploadToCloudinary } from '@/utility/api';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetchWithAuth('/get-all-blogs');
            const data = await response.json();
            setBlogs(data.data || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
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

            const endpoint = editingBlog 
                ? `/update-blog/${editingBlog._id}`
                : '/create-blog';

            const response = await fetchWithAuth(endpoint, {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl
                })
            });

            if (response.ok) {
                setFormData({ title: '', content: '', image: '' });
                setSelectedFile(null);
                setEditingBlog(null);
                fetchBlogs();
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            const response = await fetchWithAuth(`/delete-blog/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchBlogs();
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            image: blog.image
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Manage Blogs</h1>

            {/* Blog Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                    {loading ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
                </button>
            </form>

            {/* Blogs List */}
            <div className="bg-white shadow rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg font-medium">{blog.title}</h3>
                                    <p className="text-gray-500 truncate max-w-md">{blog.content}</p>
                                </div>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
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