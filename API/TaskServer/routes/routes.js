var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../models/Task.js');
var List = require('../models/List.js');

/* GET home page. */
router.get('/tasks/', function(req, res, next) {
  Task.find(function (err, tasks) {
    if (err) return res.json({error:true,message:err});
    res.json(tasks);
  });
});

router.get('/tasks/query/:list', function(req, res, next) {
  Task.find({list:req.params.list},function (err, tasks) {
    if (err) return res.json({error:true,message:err});
    res.json(tasks);
  });
});
/* Get Task */
router.get('/tasks/:id', function(req, res, next) {
  Task.findById(req.params.id, function (err, task) {
    if (err) return res.json({error:true,message:err});
    res.json(task);
  });
});

/* Insert Task */
router.post('/tasks/', function(req, res, next) {
  Task.create(req.body, function (err, task) {
    console.log(err);
    if (err) return res.json({error:true,message:err});
    res.json(task);
  });
});

/* Update Task */
router.put('/tasks/:id', function(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, task) {
    if (err) return res.json({error:true,message:err});
    res.json(task);
  });
});

router.get('/compeleted', function(req, res, next) {
  Task.find({done:true}, function (err, List) {
    console.log(err);
    if (err) return res.json({error:true,message:err});
    res.json(List);
  });
});

/* Delete Task */
router.delete('/tasks/:id', function(req, res, next) {
  Task.findByIdAndRemove(req.params.id, req.body, function (err, task) {
    if (err) return res.json({error:true,message:err});
    res.json(task);
  });
});



/* GET home page. */
router.get('/lists/', function(req, res, next) {
  List.find(function (err, lists) {
    if (err) return res.json({error:true,message:err});
    res.json(lists);
  });
});

router.get('/mainList/', function(req, res, next) {
  List.findOne({isMain:true}, function (err, list) {
    console.log(err);
    if (err) return res.json({error:true,message:err});
    if (list)
    {
      res.json(list);
    }else{
      List.create({"title":"Daily Tasks",isMain:true}, function (err, list) {
        console.log(err);
        if (err) return res.json({error:true,message:err});
        res.json(list);
      });
    }
  });
});


/* Get List */
router.get('/lists/:id', function(req, res, next) {
  List.findById(req.params.id, function (err, List) {
    if (err) return res.json({error:true,message:err});
    res.json(List);
  });
});



/* Insert List */
router.post('/lists/', function(req, res, next) {
  console.log(req);
  List.create(req.body, function (err, List) {
    console.log(err);
    if (err) return res.json({error:true,message:err});
    res.json(List);
  });
});

/* Update List */
router.put('/lists/:id', function(req, res, next) {
  List.findByIdAndUpdate(req.params.id, req.body, function (err, List) {
    if (err) return res.json({error:true,message:err});
    res.json(List);
  });
});

/* Delete List */
router.delete('/lists/:id', function(req, res, next) {
  List.findByIdAndRemove(req.params.id, req.body, function (err, List) {
    if (err) return res.json({error:true,message:err});
    res.json(List);
  });
});

module.exports = router;
