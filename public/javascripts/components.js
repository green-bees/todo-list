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
      return this.isBeingEdited ? 'glyphicon-remove' : 'glyphicon-chevron-down';
    }
  },
  template:
    '<div class="media">' +
      '<div class="media-left media-middle">' +
        '<button type="button" class="btn btn-lg btn-link">' +
          '<span class="glyphicon" :class="taskStateClass"></span>' +
        '</button>' +
      '</div>' +
      '<div class="media-body task-attributes">' +
        '<h4>{{ taskText }}</h4>' +
        '<p>Importance: {{ importanceLevel }} | Completed: {{ isCompleted }}</p>' +
      '</div>' +
      '<div class="media-right media-middle">' +
        '<button type="button" class="btn btn-lg btn-link">' +
          '<span class="glyphicon" :class="taskEditStatusClass"></span>' +
        '</button>' +
      '</div>' +
    '</div>'
});