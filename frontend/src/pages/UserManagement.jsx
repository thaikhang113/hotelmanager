import { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const [isEditing, setIsEditing] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users');
            setUsers(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axiosPrivate.delete(`/users/${id}`);
            fetchUsers();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axiosPrivate.put(`/users/${isEditing}`, formData);
            } else {
                await axiosPrivate.post('/users', formData);
            }
            setFormData({ username: '', email: '', password: '', role: 'user' });
            setIsEditing(null);
            fetchUsers();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleEdit = (user) => {
        setFormData({ 
            username: user.username, 
            email: user.email, 
            password: '', 
            role: user.role 
        });
        setIsEditing(user.id || user._id);
    };

    const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: 'white' };
    const thStyle = { textAlign: 'left', padding: '1rem', borderBottom: '2px solid #ddd' };
    const tdStyle = { padding: '1rem', borderBottom: '1px solid #ddd' };
    const inputStyle = { padding: '0.5rem', marginRight: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' };

    return (
        <div>
            <h2>User Management</h2>
            
            <div style={{ background: 'white', padding: '1.5rem', marginTop: '1rem', borderRadius: '8px' }}>
                <h3>{isEditing ? 'Edit User' : 'Create New User'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input style={inputStyle} value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="Username" required />
                    <input style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" type="email" required />
                    <input style={inputStyle} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={isEditing ? "New Password (Optional)" : "Password"} type="password" required={!isEditing} />
                    <select style={inputStyle} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {isEditing ? 'Update' : 'Create'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(null); setFormData({ username: '', email: '', password: '', role: 'user' }); }} style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {loading ? <p>Loading...</p> : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Username</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Role</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id || user._id}>
                                <td style={tdStyle}>{user.username}</td>
                                <td style={tdStyle}>{user.email}</td>
                                <td style={tdStyle}>
                                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: user.role === 'admin' ? '#cce5ff' : '#e2e3e5', color: user.role === 'admin' ? '#004085' : '#383d41', fontSize: '0.85rem' }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleEdit(user)} style={{ marginRight: '0.5rem', padding: '0.3rem 0.6rem', border: '1px solid #007bff', background: 'white', color: '#007bff', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDelete(user.id || user._id)} style={{ padding: '0.3rem 0.6rem', border: '1px solid #dc3545', background: 'white', color: '#dc3545', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManagement;