var taskSubmit = new Vue({
  el: '#taskSubmit',

  data: {
    taskDesc: '',
    picked: ''
  },

  methods: {
    addTask: function() {
      var self = this;
      var task = this.taskDesc;
      var importance = this.picked; // Default value 1 (TODO: allow for input)

      var task = {
        task: task,
        importance: importance,
        completed: false
      };

      api.addTask(task, function(status) { // The status variable is an http status
        refreshTasks();
        self.taskDesc = '';
      });
    }
  }
});

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
