const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const { isGuest } = require('../middlewares/guards');

const authController = require('express').Router();


authController.get('/register', isGuest(), (req, res) => {
    // TODO replace with actual view by assignment
    res.render('register', {
        title: 'Register page'
    });
});

authController.post('/register', isGuest(),
    // Express-validators
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 character long')
        .isAlphanumeric().withMessage('Username may content and letters and numbers'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 character long')
        .isAlphanumeric().withMessage('Password may content and letters and numbers'),

    async (req, res) => {

        try {
            // Checking without express-validator
            // if (req.body.username == '' || req.body.password == '') {
            //     throw new Error('All fields are required');
            // }

            // if (req.body.password.length < 5) {
            //     throw new Error('Password must be at least 5 characters long');
            // }

            const { errors } = validationResult(req);
            if(errors.length > 0) {
                throw errors;
            }

            if (req.body.password != req.body.repass) {
                throw new Error('Passwords don\'t match');
            }


            const token = await register(req.body.username, req.body.password);

            // TODO check assignment to see if register creates session
            res.cookie('token', token);
            res.redirect('/');     // TODO replace with redirect by assignment

        } catch (error) {
            const errors = parseError(error);

            // TODO add error display to actual template from assignment
            res.render('register', {
                title: 'Register Page',
                errors,
                body: { username: req.body.username }
            });
        }

    });


authController.get('/login', isGuest(), (req, res) => {
    // TODO replace with actual view by assignment
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');  // TODO replace with redirect by assignment

    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: { username: req.body.username }
        });
    }
});


authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = authController;