const authController = require('./controllers/authentication');
const quizController = require('./controllers/quiz');
const rankingController = require('./controllers/ranking');

const express = require('express');
const passportService = require('../config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

const allRoles = ['user', 'admin'];

module.exports = function(app) {
    const router = express.Router();
    const authRoutes = express.Router();
    const quizRoutes = express.Router();
    const rankingRoutes = express.Router();

    // Auth Routes
    router.use('/auth', authRoutes);
    authRoutes.post('/register', authController.register);
    authRoutes.post('/login', requireLogin, authController.login);
    authRoutes.get('/protected', requireAuth, function(req, res) {
        res.json({ content: 'Success' });
    });
    authRoutes.post('/account', authController.edit);

    // Quiz routes
    router.use('/quiz', quizRoutes);
    quizRoutes.get('/getAll', quizController.getAll);
    quizRoutes.post('/create', requireAuth, authController.roleAuthorization(allRoles), quizController.createQuiz);
    quizRoutes.post('/commit', requireAuth, authController.roleAuthorization(allRoles), quizController.createParticipation);
    
    // Ranking routes
    router.use('/ranking', rankingRoutes);
    rankingRoutes.get('/quiz/:id', rankingController.quiz);
    rankingRoutes.get('/quizzes', rankingController.quizzes);
    rankingRoutes.get('/players', rankingController.players);
    
    // Set up routes
    app.use('/', router);
    app.all('*', function(req, res) {
        res.status(404).json({error: '404 Page not found.'});
    });
}
