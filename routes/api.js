'use strict';

var express = require('express');
var router = express.Router();
var database = require('./database.js');

// Create item
router.post('/', function(req, res) {
  var item = extractItem(req);

  database.createItem(item, function(status) {
    res.sendStatus(status);
  });
});

// Read item
router.get('/:id', function(req, res) {
  var id = req.params.id;

  database.readItem(id, function(item) {
    res.send(item);
  });
});

// Update item
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var item = extractItem(req);

  database.updateItem(id, item, function(status) {
    res.sendStatus(status);
  });
});

// Delete item
router.delete('/:id', function(req, res) {
  var id = req.params.id;

  database.deleteItem(id, function(status) {
    res.sendStatus(status);
  });
});

// Helpers
function extractItem(req) {
  var item = {
    task: req.body.task,
    importance: req.body.importance,
    completed: req.body.completed
  };

  return item;
}

module.exports = router;
