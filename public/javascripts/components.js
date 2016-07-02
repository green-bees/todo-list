var TaskItem = Vue.component('task-item', {
  props: {
    taskText: {
      type: String,
      required: true
    },
    importanceLevel: {
      coerce: function (val) {
        if (!isNaN(val)) {
          return parseInt(val);
        }

        return 1;
      },
      required: true
    },
    isCompleted: {
      coerce: function (val) {
        /** If the value exists and it evaluates to true */
        if (val == 'true') {
          return true;
        }

        return false;
      },
      required: true
    },
    isBeingEdited: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    taskStateClass: function () {
      return this.isCompleted ? 'glyphicon-check' : 'glyphicon-unchecked';
    },
    taskEditStatusClass: function () {
      return this.isBeingEdited ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
    },
    taskEditStatusClassEdit: function () {
      return this.isBeingEdited ? 'glyphicon-pencil' : 'hidden';
    },
    taskEditStatusClassDelete: function () {
      return this.isBeingEdited ? 'glyphicon-trash' : 'hidden';
    },
    taskCompleteClass: function () {
      return this.isCompleted ? 'completed' : 'incomplete';
    },
    labelClasses: function() {
        var importance = this.importanceLevel;
        return {
            'label': true,
            'label-default': importance == 1,
            'label-warning': importance == 2,
            'label-danger': importance == 3
        }
    }
  },
  template:
    '<div class="media">' +
      '<div class="media-left media-middle">' +
        '<button type="button" class="btn btn-lg btn-link" v-on:click="completeTask">' +
          '<span class="glyphicon" :class="taskStateClass"></span>' +
        '</button>' +
      '</div>' +
      '<div class="media-body task-attributes">' +
        '<h4 :class="taskCompleteClass">{{ taskText }}</h4>' +
        '<span :class="labelClasses">Importance</span>' +
        '<p>Importance: {{ importanceLevel }} | Completed: {{ isCompleted }}</p>' +
      '</div>' +
      '<div class="media-right media-middle">' +
        '<button type="button" class="btn btn-lg btn-link">' +
          '<span class="glyphicon" :class="taskEditStatusClass" v-on:click="changeEditState"></span>' +
        '</button>' +
        '<button type="button" class="btn btn-lg btn-link">' +
          '<span class="glyphicon" :class="taskEditStatusClassEdit"></span>' +
        '</button>' +
        '<button type="button" class="btn btn-lg btn-link">' +
          '<span class="glyphicon" :class="taskEditStatusClassDelete" v-on:click="removeTask"></span>' +
        '</button>' +
      '</div>' +
    '</div>',
  methods: {
    /**
     * Allow the task to be edited within the view
     * Change whether or not the Task is in the state of being edited
     * @return {Boolean} Whether or not the task is being edited
     */
    changeEditState: function () {
      /** If it is currently being edited, break out of editing before saving */
      if (this.isBeingEdited === true) {
        this.isBeingEdited = false;
      } else if (this.isBeingEdited === false) {
        this.isBeingEdited = true;
      }

      return this.isBeingEdited;
    },

    /**
     * Marks the current task as complete
     * @return {Boolean} Whether or not the task has been marked as completed
     */
    completeTask: function () {
      /** If it is currently being edited, break out of editing before saving */
      if (this.isBeingEdited === true) {
        return false;
      }

      this.isCompleted = true;

      return this.isCompleted;
    }
  }
});