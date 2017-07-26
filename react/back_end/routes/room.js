const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = mongoose.model('Room');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const wherestr = {};

  Room.find(wherestr, function(err, data){
    if (err) {
      console.log("Error:" + err);
    } else {
      res.json({
        code: 0,
        data,
      });
    }
  });
});


router.post('/', function(req, res, next) {

    const room = new Room({
        title : req.body.title,
        allDay : req.body.allDay,
        start : req.body.start,
        end : req.body.end,
        events : req.body.events
    });

    room.save(function (err, data) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json({
              code: 0,
              data,
            });
        }
    });
});

module.exports = router;
