const express = require('express');
const router = express.Router();
const api = require('../services/apiClient');

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/api/rooms', req);
        res.render('rooms/index', { rooms: response.data });
    } catch (error) {
        res.render('rooms/index', { rooms: [], error: 'Failed to load rooms' });
    }
});

router.get('/create', async (req, res) => {
    try {
        const types = await api.get('/api/room-types', req);
        res.render('rooms/create', { roomTypes: types.data });
    } catch (error) {
        res.render('rooms/create', { roomTypes: [], error: 'Failed to load room types' });
    }
});

router.post('/', async (req, res) => {
    try {
        await api.post('/api/rooms', req.body, req);
        res.redirect('/rooms');
    } catch (error) {
        res.redirect('/rooms/create?error=' + encodeURIComponent(error.message));
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const [room, types] = await Promise.all([
            api.get(`/api/rooms/${req.params.id}`, req),
            api.get('/api/room-types', req)
        ]);
        res.render('rooms/edit', { room: room.data, roomTypes: types.data });
    } catch (error) {
        res.redirect('/rooms');
    }
});

router.put('/:id', async (req, res) => {
    try {
        await api.put(`/api/rooms/${req.params.id}`, req.body, req);
        res.redirect('/rooms');
    } catch (error) {
        res.redirect(`/rooms/${req.params.id}/edit?error=Update failed`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await api.delete(`/api/rooms/${req.params.id}`, req);
        res.redirect('/rooms');
    } catch (error) {
        res.redirect('/rooms?error=Delete failed');
    }
});

module.exports = router;