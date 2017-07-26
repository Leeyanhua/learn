const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  title: { type: String },
  allDay: { type: Boolean },
  start: { type: Date },
  end: { type: Date },
  events: { type: Array }
});

module.exports = RoomSchema;
