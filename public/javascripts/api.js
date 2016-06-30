'use strict';

var api = {};

api.url = '/api/';

// Get all tasks
api.getTasks = function(callback) {
  var config = {
    method: 'GET',
    url: api.url
  };

  $.ajax(config).done(function(tasks) {
    callback(tasks);
  });
};

// Add a task
api.addTask = function(task, callback) {
  var config = {
    method: 'POST',
    url: api.url,
    data: task
  };

  $.ajax(config).done(function(status) {
    callback(status);
  });
};

// Delete a task
api.deleteTask = function(id, callback) {
  var config = {
    method: 'DELETE',
    url: api.url + id
  };

  $.ajax(config).done(function(status) {
    callback(status);
  });
};
