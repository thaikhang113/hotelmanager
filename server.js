const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(methodOverride('_method'));

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const customerRoutes = require('./routes/customers');

app.use((req, res, next) => {
    const publicPaths = ['/login', '/auth/login'];
    if (!req.cookies.token && !publicPaths.includes(req.path)) {
        return res.redirect('/login');
    }
    res.locals.user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    next();
});

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});