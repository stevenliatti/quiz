const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../config/config');

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

    if (!email) return res.status(422).send({error: 'You must enter an email address'});
    if (!password) return res.status(422).send({error: 'You must enter a password'});

    User.findOne({email: email}, function(err, existingUser) {
        if (err) return next(err);
        if (existingUser) return res.status(422).send({error: 'That email address is already in use'});

        const user = new User({
            email: email,
            password: password,
            role: role
        });

        user.save(function(err, user) {
            if (err) return next(err);
            res.status(200).json(setUserInfo(user));
        });
    });
}

exports.edit = function(req, res) {
    console.log("Editing")
    console.log(req.body);

    // User.findOne({email: email}, function(err, existingUser) {
    //     if (err) return next(err);
    //     console.log(existingUser);
    // });
    res.status(200).json({update: 'Test update'});   
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
