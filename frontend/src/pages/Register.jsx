import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' };
    const formStyle = { background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '350px' };
    const inputStyle = { width: '100%', padding: '0.8rem', margin: '0.5rem 0', border: '1px solid #ddd', borderRadius: '4px' };
    const btnStyle = { width: '100%', padding: '0.8rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    style={inputStyle}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    style={inputStyle}
                    required
                />
                <button type="submit" style={btnStyle}>Sign Up</button>
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Have account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;