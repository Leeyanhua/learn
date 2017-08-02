const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const async = require('async');

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

//密码验证
router.post('/verify', function (req, res, next) {
  const pwd = req.body.pwd;
  // console.log('verify', pwd);
  if(pwd === "123456"){
    res.json({
       code: 0
   });
  } else {
    res.json({ code: 1 });
  }
});

//新增
router.post('/add-weeks', function(req, res, next) {
  const arr = req.body.weeks;
  console.log('add-weeks', arr);
  Room.create(arr, (err, count) => {
    if(err) console.log("Error:" + err);
    console.log('create', count);
    res.json({
       code: 0
    });
  });
});

//修改
router.put('/', function(req, res, next) {
  const wherestr = {
    start: req.body.start
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
    start : req.body.start
  };
  console.log(wherestr);
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
