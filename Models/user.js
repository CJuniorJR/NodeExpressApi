const mongo = require('mongoose');
const Schema = mongo.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

User.pre('save', async function (next){
    let user = this;
    if(!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
})

module.exports = mongo.model('User', User);
