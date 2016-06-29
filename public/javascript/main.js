Vue.component('tasks', {
  template: '#tasks-template',

  data: function() {
    return {
      list: []
    }
  },

  created: function() {
    $.getJSON('api', function(tasks) {    //get request for full tasks list
      this.list = tasks;
    }.bind(this))
  },

  methods: {
    deleteTask: function(task) {    //delete method. no request yet
      this.list.$remove(task);
    }
  }
})

Vue.component('task', {
  template: '#task-template'
})

Vue.component('newTask', {
  template: '#newTask-template'
})

new Vue({
  el: '#app',

  data: {           //default values for new task form use
    task: '',
    importance: 1,
    completed: false
  }

})
