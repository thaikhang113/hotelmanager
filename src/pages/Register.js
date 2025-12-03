import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', password: '', email: '', first_name: '', last_name: '', phone_number: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/customers', formData);
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2>Register Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2"><input className="form-control" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} required /></div>
                <div className="mb-2"><input className="form-control" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required /></div>
                <div className="mb-2"><input className="form-control" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required /></div>
                <div className="mb-2"><input className="form-control" placeholder="First Name" onChange={e => setFormData({...formData, first_name: e.target.value})} /></div>
                <div className="mb-2"><input className="form-control" placeholder="Last Name" onChange={e => setFormData({...formData, last_name: e.target.value})} /></div>
                <div className="mb-2"><input className="form-control" placeholder="Phone" onChange={e => setFormData({...formData, phone_number: e.target.value})} /></div>
                <button className="btn btn-success w-100">Register</button>
            </form>
        </div>
    );
};

export default Register;