var TaskSubmission = Vue.extend({
  props: {
    /** The text to be inserted into the button to the right of the input box */
    submitButtonText: {
      type: String,
      default: 'Add Task'
    },
    /** The text to be shown if there is nothing typed into the textbox */
    placeholderText: {
      type: String,
      default: 'What do you want to accomplish?'
    },
    /** The available levels of importance for changing the color of other view items */
    importanceLevels: {
      type: Array,
      default: function () {
        return [{ text: 'Low', value: 1, contextColor: 'primary', textClass: 'text-primary' },
                { text: 'Moderate', value: 2, contextColor: 'warning', textClass: 'text-warning' },
                { text: 'High', value: 3, contextColor: 'danger', textClass: 'text-danger' }];
      }
    },
    /** The index position of the importance level selected by the user */
    currImportanceIndex: {
      type: Number,
      default: 0
    },
    /** The text value that appears inside the input box */
    taskDesc: {
      type: String,
      default: ''
    }
  },
  computed: {
    currImportance: function () {
      return this.importanceLevels[this.currImportanceIndex];
    },
    submitButtonColorClass: function () {
      return 'btn-' + this.currImportance.contextColor;
    },
    textColorClass: function () {
      return 'text-' + this.currImportance.contextColor;
    },
    task: function () {
      return {
        task: this.taskDesc,
        importance: this.currImportance.value,
        completed: false
      }
    }
  },
  template:
    '<div class="input-group input-group-lg">' +
      '<input type="text" v-model="taskDesc" class="form-control" name="task" placeholder="{{ placeholderText }}">' +
      '<span class="input-group-btn">' +
        '<button type="button" class="btn" :class="submitButtonColorClass" v-on:click="submitTask" :disabled="taskDesc.length === 0">{{ submitButtonText }}</button>' +
        '<button type="button" class="btn dropdown-toggle" :class="submitButtonColorClass" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="taskDesc.length === 0">' +
          '<span class="caret"></span>' +
          '<span class="sr-only">Toggle Dropdown</span>' +
        '</button>' +
        '<ul class="dropdown-menu">' +
          '<li v-for="level in importanceLevels">' +
            '<a v-on:click.prevent="currImportanceIndex = $index" data-value="{{ level.value }}" href="#">' +
              '<span class="{{ level.textClass }}">{{ level.text }}</span>' +
            '</a>' +
          '</li>' +
        '</ul>' +
      '</span>' +
    '</div>',
  methods: {
    /**
     * Submit the new task for saving to the database
     */
    submitTask: function () {
      // http://vuejs.org/guide/components.html#Custom-Events
      this.$dispatch('addTask', this.task);
      this.resetTask();
    },
    /**
     * Remove all style changes and input values for the task being created
     */
    resetTask: function () {
      this.taskDesc = '';
      this.currImportanceIndex = 0;
    }
  }
});