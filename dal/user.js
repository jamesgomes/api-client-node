import mongoose from 'mongoose';
import validator from 'node-mongoose-validator';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;

// User Schema
let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.path('name').validate(validator.$notEmpty({ msg: 'Please provide a name.' }));
UserSchema.path('email').validate(validator.$isEmail({ msg: 'Please provide a valid email address' }));
UserSchema.path('password').validate(validator.$notEmpty({ msg: 'Please provide a password.' }));

let User = module.exports = mongoose.model('User', UserSchema);


// Add User
module.exports.addUser = (user, callback) => {
    User.create(user, callback);
}

// Get User
module.exports.getUserByEmail = (email, callback) => {
    User.find({ email: { $eq: email } }, callback);
}

// Get User
module.exports.getUserById = (id, callback) => {
    User.find({ _id: { $eq: id } }, callback);
}


module.exports.passwordCreate = (password) => {

    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}


module.exports.User;
