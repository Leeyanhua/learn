const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  title: { type: String },
  start: { type: Date },
  end: { type: Date }
});

module.exports = RoomSchema;
