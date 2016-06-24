'use strict';

// File that has connection information
var databaseConnector = require('./dbMod.js');

// Connects to the database and defines collection name
var database = null;
var collection = 'test'; // Change this to `tasks` for production
databaseConnector.connect(function(db) {
  database = db;
});

var api = {};

// Adds a task to the database
api.createItem = function(item, callback) {
  database.collection(collection).insertOne(item, function(err, result) {
    if(err) {
      callback(err.status);
    } else {
      callback(200);
    }
  });
};

// Reads a task with `id` from the database
api.readItem = function(id, callback) {
  var cursor = database.collection(collection).find({
    _id: id
  });

  cursor.each(function(err, doc) {
    if(doc != null) {
      callback(doc);
    } else {
      callback();
    }
  });
};

// Reads all tasks from the database
api.readItems = function(callback) {
  var items = [];
  var cursor = database.collection(collection).find();

  cursor.each(function(err, doc) {
    if(doc != null) {
      items.push(doc);
    } else {
      callback(items);
    }
  });
};

// Updates a task with `id` in the database
api.updateItem = function(id, item, callback) {
  database.collection(collection).updateOne({
    _id, id
  }, item, function(err, results) {
    if(err) {
      callback(err.status);
    } else {
      callback(200);
    }
  });
};

// Deletes a task with `id` from the database
api.deleteItem = function(id, callback) {
  database.collection(collection).deleteOne({
    _id: id
  }, function(err, results) {
    if(err) {
      callback(err.status);
    } else {
      callback(200);
    }
  });
};

module.exports = api;
