const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = mongoose.model('Room');

//查询
router.get('/', function(req, res, next) {

  const wherestr = {};
  const opt = { "title": 1 , "start": 1 , "end": 1 , "_id": 0 };

  Room.find(wherestr, opt, function(err, data){
    if (err) {
      console.log("Error:" + err);
    } else {
      res.json({
        code: 0,
        data: data,
      });
    }
  });
});

//新增
router.post('/', function(req, res, next) {

  const room = new Room({
      title : req.body.title,
      start : req.body.start,
      end : req.body.end
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

//修改
router.put('/', function(req, res, next) {
  const wherestr = {
    title: req.body.title
  };
  const updatestr = {
    title : req.body.newTitle
  };
  console.log("wherestr", wherestr, "updatestr", updatestr);
  Room.update(wherestr, updatestr, function(err, data){
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

//删除
router.delete('/', function(req, res, next) {
  const wherestr = {
    title : req.body.title
  };

  Room.remove(wherestr, function(err, data){
    if (err) {
        console.log("Error:" + err);
    }
    else {
        res.send({
          code: 0,
          data,
        });
    }
  });
});
module.exports = router;
