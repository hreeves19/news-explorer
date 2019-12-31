const routes = require('express').Router();
var bcrypt = require('bcryptjs');
var userDb = require('../collections/user');
const SALT_ROUNDS = 15;

// Get all users
routes.get('/', async (req, res) => {
    // eventDb.find()
    //   .then((event) => {
    //     res.send(event);
    // });
    let users = await userDb.find();
    res.send(users);
});

// Get all users
routes.get('/test', async (req, res) => {
    res.send('User db running!');
});

// Create a user
routes.post('/create', async (req, res) => {
    req.body.user_password = await bcrypt.hash(req.body.user_password, SALT_ROUNDS);
    userDb.create(req.body, async (error, user) => {
        if(error) {
            console.log(error);
            res.send(error);
        } else {
            console.log(user);
            res.send(user);
        }
    });
 });

 // Login a user
 routes.post('/login', async(req, res) => {
    // Selecting user by email
    userDb.findOne({user_email: req.body.user_email}, (user) => {
        if(!user) {
            res.send(false);
        } else {
            // Compare passwords
            bcrypt.compare(req.params.password, user.user_password, (error, success) => {
                if(success) {
                    res.send(user);
                } else {
                    res.send(false);
                }
            });
        }
    });
 });

module.exports = routes;