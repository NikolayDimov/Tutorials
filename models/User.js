const { Schema, model } = require('mongoose');


// TODO add User properties and validation according to assignment 
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [5, 'Username must be at least 5 characters long'] },
    hashedPassword: { type: String, required: true }
});

// Index
userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;