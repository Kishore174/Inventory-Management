const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true,    lowercase:true },
    password: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'USER'], required: true }
});

module.exports = mongoose.model('User', UserSchema);
