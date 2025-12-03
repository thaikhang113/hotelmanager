import { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem('accessToken');
    const user = token ? jwtDecode(token).user || jwtDecode(token) : {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming backend has a rooms or stats endpoint open to authenticated users
                // If not, this is a placeholder for checking API connectivity
                const response = await axiosPrivate.get('/rooms');
                setStats(response.data);
            } catch (err) {
                console.log('No stats available or unauthorized');
            }
        };
        fetchData();
    }, []);

    const cardStyle = { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' };

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Welcome, {user.username}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={cardStyle}>
                    <h3>Your Role</h3>
                    <p style={{ fontSize: '1.5rem', color: '#007bff', textTransform: 'capitalize' }}>{user.role}</p>
                </div>
                <div style={cardStyle}>
                    <h3>System Status</h3>
                    <p style={{ fontSize: '1.5rem', color: '#28a745' }}>Online</p>
                </div>
                {stats && Array.isArray(stats) && (
                    <div style={cardStyle}>
                        <h3>Total Rooms</h3>
                        <p style={{ fontSize: '1.5rem', color: '#6c757d' }}>{stats.length}</p>
                    </div>
                )}
            </div>
            
            <div style={{ marginTop: '2rem', ...cardStyle }}>
                <h3>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }} disabled>View Bookings</button>
                    <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }} disabled>My Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;