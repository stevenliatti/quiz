const authController = require('./controllers/authentication');
const createQuizController = require('./controllers/createquiz');
const commitParticipationController = require('./controllers/commitparticipation');

const express = require('express');
const passportService = require('../config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app) {
    const router = express.Router();
    const authRoutes = express.Router();
    const createQuizRoutes = express.Router();
	const participateQuizRoutes = express.Router();

    // Auth Routes
    router.use('/auth', authRoutes);
    authRoutes.post('/register', authController.register);
    authRoutes.post('/login', requireLogin, authController.login);
    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.json({ content: 'Success' });
    });

    // Create Quiz Routes
    router.use('/createquiz', createQuizRoutes);
    createQuizRoutes.post('/', createQuizController.createQuiz);
    
	// Participate quiz Routes
    router.use('/commitquiz', participateQuizRoutes);
    participateQuizRoutes.post('/', commitParticipationController.ParticipationSchema);
	
    // Set up routes
    app.use('/', router);
    app.all('*', function(req, res) {
        res.status(404).json({error: '404 Page not found.'});
    });
}
