const dbPassword = process.env['DATABASE_PASSWORD'];
const dbUsername = process.env['DATABASE_USERNAME'];
const dbName = process.env['DATABASE_NAME'];
var mongoose = require('mongoose');
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@dev0-ldd80.mongodb.net/test?retryWrites=true&w=majority`;
var db = mongoose.createConnection(uri, {dbName: dbName, useNewUrlParser: true});

// Define schema
var Schema = mongoose.Schema;

var userModel = new Schema({
    user_firstname: String,
    user_lastname: String,
    user_phonenumber: Number,
    user_email: String,
    user_emailverified: Boolean,
    user_password: String,
    user_address: {
        street_address: String,
        state: String,
        country: String,
        zip_code: Number
    }
});

var Event = db.model('user', userModel, 'user');

module.exports = Event; // this is what you want