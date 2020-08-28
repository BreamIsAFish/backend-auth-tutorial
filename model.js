const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;

const Schema = mongoose.Schema;
const userSchema = new Schema({
        username: String,
        password: String
})

Schema.pre('save', function(next) {
        this.password = bcrypt.hashSync(this.password, saltRound);
        next();
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
