var TaskItem = Vue.extend({
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
    areActionsVisible: {
      type: Boolean,
      default: false
    },
    isBeingEdited: {
      type: Boolean,
      default: false
    },
    taskObject: {
      type: Object,
      coerce: function (val) {
        if (typeof val.completed === 'string' && val.completed == 'true') {
          val.completed = true;
        } else if (typeof val.completed === 'string' && val.completed == 'false') {
          val.completed = false;
        }

        val.originalText = val.task;

        return val;
      },
      required: true
    }
  },
  computed: {
    isCompleted: function () {
      if (this.taskObject.completed == 'true' || this.taskObject.completed == true) {
        return true;
      }

      return false;
    },
    taskStateClass: function () {
      return this.isCompleted ? 'glyphicon-check' : 'glyphicon-unchecked';
    },
    taskEditStatusClass: function () {
      return this.areActionsVisible ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
    },
    taskEditStatusClassEdit: function () {
      return this.isBeingEdited ? 'glyphicon-floppy-disk' : 'glyphicon-pencil';
    },
    taskEditStatusClassDelete: function () {
      return this.areActionsVisible ? 'glyphicon-trash' : 'hidden';
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
        '<button type="button" class="btn btn-lg btn-link" v-on:click="changeTaskStatus">' +
          '<span class="glyphicon" :class="taskStateClass"></span>' +
        '</button>' +
      '</div>' +
      '<div class="media-body task-attributes">' +
        '<div v-if="isBeingEdited" class="task-edit">' +
          '<input type="text" class="form-control" v-model="taskObject.task" name="task" placeholder="There must be text here" @keyup.enter="changeEditState">' +
        '</div>' +
        '<h4 v-else :class="taskCompleteClass">{{ taskObject.task }}</h4>' +
        '<div class="attributes-display">' +
          '<span :class="labelClasses">Importance</span>' +
          '<p>Importance: {{ importanceLevel }} | Completed: {{ isCompleted }}</p>' +
        '</div>' +
      '</div>' +
      '<div class="media-right media-middle">' +
        '<button type="button" class="btn btn-lg btn-link" v-on:click="changeActionsState">' +
          '<span class="glyphicon" :class="taskEditStatusClass"></span>' +
        '</button>' +
      '</div>' +
      '<div class="action-items" :class="{ hidden: !areActionsVisible }">' +
        '<button type="button" class="btn btn-lg btn-link pull-right" v-on:click="changeEditState">' +
          '<span class="glyphicon" :class="taskEditStatusClassEdit"></span>' +
        '</button>' +
        '<button type="button" class="btn btn-lg btn-link pull-right" v-on:click="submitRemove">' +
          '<span class="glyphicon glyphicon-trash"></span>' +
        '</button>' +
      '</div>' +
    '</div>',
  methods: {
    /**
     * Allow the task to be edited within the view
     * Change whether or not the Task is in the state of being edited
     * @return {Boolean} Whether or not the task is being edited
     */
    changeActionsState: function () {
      /** If it is currently being edited, break out of editing before saving */
      if (this.areActionsVisible === true) {
        this.areActionsVisible = false;
        // reset the text back to the original since it wasn't saved
        this.taskObject.task = this.taskObject.originalText;
        this.isBeingEdited = false;
      } else if (this.areActionsVisible === false) {
        this.areActionsVisible = true;
      }

      return this.areActionsVisible;
    },

    changeEditState: function () {
      this.isBeingEdited = !this.isBeingEdited;

      if (this.taskObject.originalText !== this.taskObject.task) {
        this.$dispatch('updateTask', this.taskObject);
      }
    },

    /**
     * Marks the current task as complete
     * @return {Boolean} Whether or not the task has been marked as completed
     */
    changeTaskStatus: function () {
      /** If it is currently being edited, break out of editing before saving */
      if (this.areActionsVisible === true) {
        return false;
      }

      // Flip the boolean
      this.taskObject.completed = !this.taskObject.completed;

      this.$dispatch('updateTask', this.taskObject);

      return this.isCompleted;
    },

    submitRemove: function () {
      this.$dispatch('removeTask', this.taskObject._id);
    }
  }
});
