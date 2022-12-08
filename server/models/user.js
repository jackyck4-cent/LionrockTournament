
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new Schema({
    username: {
        type: String
    },
    display_name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    reference: {
        type: String
    },
    role: {
        type: String
    },
    /* 
    password: {
        type: String
    }
    */
}, {
    collection: 'users'
})
 
//userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
let options = ({ missingPasswordError: 'Wrong / Missing Password' , usernameField: 'username' });
userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema)