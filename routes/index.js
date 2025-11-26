const express = require('express');
const router = express.Router();
const api = require('../services/apiClient');

router.get('/login', (req, res) => {
    res.render('login', { error: req.query.error });
});

router.get('/', async (req, res) => {
    try {
        const stats = await api.get('/api/reports/dashboard', req);
        res.render('dashboard', { stats: stats.data });
    } catch (error) {
        res.render('dashboard', { stats: null, error: 'Could not fetch dashboard data' });
    }
});

module.exports = router;