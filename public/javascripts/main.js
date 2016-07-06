var taskList = new Vue({
  el: '#taskList',

  data: {
    tasks: []
  },

  components: {
    'task-submission': TaskSubmission,
    'task-item': TaskItem
  },

  methods: {
    getTasks: function() {
      var self = this;

      api.getTasks(function(tasks) {
        self.tasks = [];
        tasks.forEach(function(task) {
          self.tasks.push(task);
        });
      });
    }
  },

  events: {

    /**
     * Add the task to the beginning of the list of tasks
     * http://vuejs.org/guide/components.html#Custom-Events
     * @param {Object} task The task to be inserted into the list
     */
    addTask: function (task) {
      // Array.unshift() puts the item at the beginning of the Array
      this.tasks.unshift(task);

      api.addTask(task);
    },

    /**
     * Updatesa a task's attributes and sends that update to the database
     * @param  {Object} task The task to be updated
     */
    updateTask: function (task) {
      api.updateTask(task);
      this.getTasks();
    },

    removeTask: function(taskID) {
      api.deleteTask(taskID, function(status) {
        this.getTasks();
      });
    }

  }
});

function refreshTasks() {
  taskList.getTasks();
};

taskList.getTasks();
