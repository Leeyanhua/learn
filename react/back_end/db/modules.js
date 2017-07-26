const mongoose = require('./db.js');
const RoomSchema = require('./Room');

module.exports = () => {
  console.log("creatmodel");
  mongoose.model('Room', RoomSchema);
};
