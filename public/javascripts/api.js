'use strict';

var api = {};

api.url = '/api/';

// http://stackoverflow.com/a/7356528
function isFunction (funcToCheck) {
  var _getType = {};
  return funcToCheck && _getType.toString.call(funcToCheck) === '[object Function]';
}

/**
 * Get all or one task (by _id) from the tasks in the database
 * @param  {String|Function}   taskIdOrCallback A callback function or the _id value for a task
 * @param  {[Function]} callback         The callback argument if arg1 is the task id
 */
api.getTasks = function(taskIdOrCallback, callback) {

  // Create the URL locally so we can manipulate it later
  var _apiEndpoint = api.url;
  // Initially set the callback to the first argument
  var _callback = taskIdOrCallback;

  /** Check if the first argument is NOT a function */
  if (!isFunction(taskIdOrCallback)) {
    // update the API URL to include the ID
    _apiEndpoint = api.url + taskIdOrCallback;
    // set the callback function to the second argument
    _callback = callback;
  }

  var config = {
    method: 'GET',
    url: _apiEndpoint
  };

  // My personal style is to place each function on a new line when chaining functions together
  // You don't have to do the same, I just wanted to give you an example if you haven't ever seen it
  $.ajax(config)
    .done(function(tasks) {
      if (isFunction(_callback)) {
        _callback(tasks);
      }
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

/**
 * Update a single task's information
 * @param  {Object}   task     The task to be updated
 * @param  {Function} callback The callback function to handle the API response
 */
api.updateTask = function (task, callback) {
  var config = {
    method: 'PUT',
    url: api.url + task._id,
    data: task
  };

  $.ajax(config)
    .done(function (status) {
      if (isFunction(callback)) {
        callback(status);
      }
    });
}