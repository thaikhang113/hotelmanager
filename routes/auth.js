const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        const dummyToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
        res.cookie('token', dummyToken, { httpOnly: true, maxAge: 3600000 });
        res.cookie('user', JSON.stringify({ username: 'Admin', role: 'admin' }), { httpOnly: true, maxAge: 3600000 });
        return res.redirect('/');
    }
    res.redirect('/login?error=Invalid credentials');
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/login');
});

module.exports = router;