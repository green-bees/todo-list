var taskList = new Vue({
  el: '#taskList',

  data: {
    tasks: []
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
    },

    removeTask: function(index) {
      var self = this;
      var id = this.tasks[index]._id;

      api.deleteTask(id, function(status) {
        self.getTasks();
      });
    }
  }
});

function refreshTasks() {
  taskList.getTasks();
};

taskList.getTasks();
