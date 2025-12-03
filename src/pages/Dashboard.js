import React from 'react';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <div className="container">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Welcome, {user?.first_name || user?.username}</h1>
                    <p className="col-md-8 fs-4">Current Role: {user?.is_staff ? 'Staff/Admin' : 'Customer'}</p>
                    <p>Select a resource from the navigation bar to manage.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;