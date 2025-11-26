const express = require('express');
const router = express.Router();
const api = require('../services/apiClient');

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/api/customers', req);
        res.render('customers/index', { customers: response.data });
    } catch (error) {
        res.render('customers/index', { customers: [], error: 'Failed to load customers' });
    }
});

module.exports = router;