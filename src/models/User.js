const mongoose = require('mongoose');   
const bcrypt = require('bcryptjs');


const MIN_PASSWORD_LENGTH = 8;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                if(value.length < MIN_PASSWORD_LENGTH) throw new Error('Password must be at least 8 characters long');
                if(!STRONG_PASSWORD_REGEX.test(value)) throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
                return true;
            },
            message: 'Password must be at least 8 characters long',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


userSchema.pre('save', function(next) {
    const hashedPassword = bcrypt.hashSync(this.password, 5);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;