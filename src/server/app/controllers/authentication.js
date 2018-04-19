const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Quiz = require('../models/quiz');
const authConfig = require('../../config/config');
const bcrypt = require('bcrypt-nodejs');
const tokenDuration = 8 * 3600;

function generateToken(user) {
    return 'JWT ' + jwt.sign(user, authConfig.secret, {
        expiresIn: tokenDuration
    });
}

function setUserInfo(request) {
    const userInfo = {
        _id: request._id,
        email: request.email,
        pseudo: request.pseudo,
        role: request.role
    };
    userInfo.token = generateToken(userInfo);
    userInfo.tokenExpire = Math.floor(Date.now() / 1000) + tokenDuration;
    return userInfo;
}

exports.login = function(req, res) {
    res.status(200).json(setUserInfo(req.user));
}

exports.register = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const pseudo = req.body.pseudo;

    if (!email) return res.status(422).send({error: 'You must enter an email address'});
    if (!password) return res.status(422).send({error: 'You must enter a password'});
    if (!pseudo) return res.status(422).send({error: 'You must enter a pseudo'});

    User.findOne({email: email}, function(err, existingUser) {
        if (err) return next(err);
        if (existingUser) return res.status(422).send({error: 'That email address is already in use'});

        const user = new User({
            email: email,
            password: password,
            role: role,
            pseudo: pseudo
        });

        user.save(function(err, user) {
            if (err) return next(err);
            res.status(200).json(setUserInfo(user));
        });
    });
}

exports.edit = function(req, res) {
    console.log('Authentification.js : edit function');
    let user = req.body;
    console.log(user);
    if (!user.email) return res.status(422).send({error: 'You must enter an email address'});
    if (!user.password) return res.status(422).send({error: 'You must enter a password'});
    if (!user.pseudo) return res.status(422).send({error: 'You must enter a pseudo'});

    const SALT_FACTOR = require('../../pass').SALT_FACTOR;

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            User.findOneAndUpdate({_id: user.id}, { $set:{pseudo: user.pseudo, email: user.email, password:user.password} }, {new: true}, function(err, data) {
                Quiz.update({idUser: user.id},{ $set: {owner: user.pseudo}},function(error, data){
                     if (err) return next(err);
                     console.log(data);
                });
                if (err) return next(err);
                return res.status(200).json(setUserInfo(data));
            });
        });
    });
}

exports.roleAuthorization = function(roles) {
    return function(req, res, next) {
        const user = req.user;
        User.findById(user._id, function(err, foundUser) {
            if (err) {
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            if (roles.indexOf(foundUser.role) > -1) return next();

            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
        });
    }
}
