var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');
// var group_controller = require('../controllers/groupController');
// var chat_controller = require('../controllers/chatController');
// var message_controller = require('../controllers/messageController');
var auth_controller = require('../controllers/authController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get dashboard
router.get('/', auth_controller.index);

// get login
router.get('/login', auth_controller.login_get);

// post login
router.post('/login', auth_controller.login_post);

// get logout
router.get('/logout', auth_controller.logout);

//get signup
 router.get('/signup', user_controller.user_create_get);

 //post signup
router.post('/signup', auth_controller.signup_post);

module.exports = router;
