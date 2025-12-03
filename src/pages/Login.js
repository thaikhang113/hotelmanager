import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('staff'); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Do backend chưa có API login chuẩn, ta dùng cách fetch list để verify (Demo Only)
            const endpoint = role === 'staff' ? '/staff' : '/customers';
            const res = await axiosClient.get(endpoint);
            const user = res.data.find(u => u.username === username);

            if (user && (user.password_hash === password || user.password === password)) {
                localStorage.setItem('token', 'fake-jwt-token-for-demo');
                localStorage.setItem('user', JSON.stringify({ ...user, is_staff: role === 'staff' }));
                navigate('/');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="staff">Staff / Admin</option>
                        <option value="user">Customer</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <div className="mt-3 text-center">
                    <Link to="/register">Register (Customer)</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;