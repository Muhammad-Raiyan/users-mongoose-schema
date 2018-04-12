const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt = require('bcryptjs');
const timestamps = require('mongoose-timestamp');

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },

    temporaryToken: {
        type: String,
        required: true
    },

    followers: {
        type: Number,
        default: 0
    },

    following: {
        type: Number,
        default: 0
    }
});

userSchema.plugin(timestamps);
const User = mongoose.model('user', userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);

    } catch(error) {
        throw new Error('Hashing failed: ' + error);
    }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        throw new Error('Comparing failed: ' + error);
    }
};
