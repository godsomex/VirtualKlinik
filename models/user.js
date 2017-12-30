const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs')


const userSchema = new Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    password: { type: String, required: true, unique: true, lowercase: true },
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userSchema.pre('save',function (next) {
    if (!this.isModified('password')) 
        return next();
    bcrypt.hash(this.password,null,null,(err,hash) =>{
        if(err) return next();
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);