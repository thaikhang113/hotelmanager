const express = require('express');
const router = express.Router();
const api = require('../services/apiClient');

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/api/bookings', req);
        res.render('bookings/index', { bookings: response.data });
    } catch (error) {
        res.render('bookings/index', { bookings: [], error: 'Failed to load bookings' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await api.get(`/api/bookings/${req.params.id}`, req);
        res.render('bookings/detail', { booking: response.data });
    } catch (error) {
        res.redirect('/bookings');
    }
});

router.post('/:id/checkout', async (req, res) => {
    try {
        await api.post(`/api/bookings/${req.params.id}/checkout`, {}, req);
        res.redirect(`/bookings/${req.params.id}`);
    } catch (error) {
        res.redirect(`/bookings/${req.params.id}?error=Checkout failed`);
    }
});

module.exports = router;