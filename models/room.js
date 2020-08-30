const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
      roomName: String,
      date: Date,
      available: Boolean
});

module.exports = mongoose.model('Room', roomSchema);