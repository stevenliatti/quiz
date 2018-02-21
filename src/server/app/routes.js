const authController = require('./controllers/authentication');
const express = require('express');
const passportService = require('../config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    const router = express.Router();
    const authRoutes = express.Router();

    // Auth Routes
    router.use('/auth', authRoutes);
    authRoutes.post('/register', authController.register);
    authRoutes.post('/login', requireLogin, authController.login);
    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.json({ content: 'Success' });
    });

    

    
    // Set up routes
    app.use('/', router);
    app.all('*', function(req, res) {
        res.status(404).json({error: '404 Page not found.'});
    });
}
