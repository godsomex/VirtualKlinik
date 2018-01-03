const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs')


const userSchema = new Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    password: { type: String, required: true, unique: true},
}, {timestamps: true});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// to encrypt password
userSchema.pre('save',function (next) {
    if (!this.isModified('password')) 
        return next();
    bcrypt.hash(this.password,null,null,(err,hash) =>{
        if(err) return next();
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

module.exports = mongoose.model('User', userSchema);