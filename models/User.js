const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', UserSchema);