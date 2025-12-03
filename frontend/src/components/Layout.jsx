import { Outlet, useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    let user = {};
    
    if (token) {
        try {
            const decoded = jwtDecode(token);
            user = decoded.user || decoded;
        } catch (e) {}
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const navStyle = { padding: '1rem', background: '#fff', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
    const linkStyle = { marginRight: '1rem', textDecoration: 'none', color: '#333', fontWeight: 'bold' };
    const btnStyle = { padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

    return (
        <div>
            <nav style={navStyle}>
                <div>
                    <span style={{ fontWeight: '900', fontSize: '1.2rem', marginRight: '20px' }}>HMS</span>
                    <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                    {(user.role === 'admin' || user.role === 'staff') && (
                         <Link to="/users" style={linkStyle}>Users</Link>
                    )}
                </div>
                <div>
                    <span style={{ marginRight: '1rem' }}>Hi, {user.username || 'User'} ({user.role})</span>
                    <button onClick={handleLogout} style={btnStyle}>Logout</button>
                </div>
            </nav>
            <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;