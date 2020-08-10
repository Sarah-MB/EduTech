var async = require('async')
var models = require('../models/user');
var User = models.user;

const {
    body,
    validationResult,
    sanitizeBody
} = require('express-validator');

/*
 * Module exports.
 */

// Display User create form on GET.
exports.user_create_get = function(req, res, next) {
    var displayData = {
         title: 'Create User',
    };
    res.render('pages/user/create', displayData);
};

exports.profile = function(req, res, next) {
    var displayData = {
         title: 'Profile',
         user: req.user,
    };
    res.render('pages/user/profile', displayData);
};

exports.profile_update_get = function(req, res, next) {
    var displayData = {
         title: 'Profile Update',
         user: req.user,
    };
    res.render('pages/settings/index', displayData);
};

exports.user_login_get = function(req, res, next) {
    var displayData = {
         title: 'Login',
         user: req.user,
    };
    res.render('/login', displayData);
};
// Display list of all Users.
exports.user_list = function(req, res, next) {

    try {
        User.findAll({
            order: [
                ['firstname', 'ASC'],
            ]
        }).then(function(list_users) {
            var displayData = {
                users: list_users,
                title: 'User List',
                me: req.user,
            };
            // Successful, so render.
            res.render('pages/user/index', displayData);
        });
    }
    // catch error if the operation wasn't successful
    catch (err) {
        console.log('The error log ' + err);
        // res.send(err); API
        res.render('error', {
            title: 'User List Function',
            fileLocation: 'controllers/userController.js',
            error: err,
            message: err.message,
            layout: 'layouts/detail'
        });
    }
};

// Display detail page for a specific User.
exports.user_details = function(req, res, next) {
    let user_id = req.params.chat_id;
    User.findByPk(
        user_id,
    ).then(function(the_user) {
        if (the_user == null) { // No user with that id.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        var displayData = {
            user: the_user,
            title: 'User Details',
        };

        // Successful, so render.
        res.render('pages/user/details', displayData);
        console.log('User details rendered successfully')
    });

};
