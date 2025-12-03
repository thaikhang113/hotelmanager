import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const RoomManager = () => {
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({ room_number: '', room_type_id: 1, floor: 1, status: 'available' });

    useEffect(() => { fetchRooms(); }, []);

    const fetchRooms = async () => {
        const res = await axiosClient.get('/rooms');
        setRooms(res.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/rooms', form);
            fetchRooms();
        } catch (err) { alert('Error creating room'); }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'available' ? 'maintenance' : 'available';
        try {
            await axiosClient.put(`/rooms/${id}/status`, { status: newStatus });
            fetchRooms();
        } catch (err) { alert(err.message); }
    };

    return (
        <div className="container">
            <h3>Room Management</h3>
            <form className="mb-4 row g-2" onSubmit={handleCreate}>
                <div className="col"><input className="form-control" placeholder="Room Number" onChange={e => setForm({...form, room_number: e.target.value})} required /></div>
                <div className="col"><input type="number" className="form-control" placeholder="Type ID" onChange={e => setForm({...form, room_type_id: e.target.value})} required /></div>
                <div className="col"><input type="number" className="form-control" placeholder="Floor" onChange={e => setForm({...form, floor: e.target.value})} required /></div>
                <div className="col-auto"><button className="btn btn-primary">Add Room</button></div>
            </form>
            <div className="row">
                {rooms.map(r => (
                    <div className="col-md-3 mb-3" key={r.room_id}>
                        <div className={`card text-white ${r.status === 'available' ? 'bg-success' : 'bg-secondary'}`}>
                            <div className="card-body">
                                <h5 className="card-title">Room {r.room_number}</h5>
                                <p>Type: {r.room_type_id} | Floor: {r.floor}</p>
                                <p>Status: {r.status}</p>
                                <button className="btn btn-light btn-sm" onClick={() => toggleStatus(r.room_id, r.status)}>Toggle Status</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomManager;