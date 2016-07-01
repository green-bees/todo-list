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
    classObject: function () {
      return this.isCompleted ? 'glyphicon-check' : 'glyphicon-unchecked';
    }
  },
  template:
    '<div>' +
      '<div class="task-state">' +
        '<span class="glyphicon" :class="classObject"></span>' +
      '</div>' +
      '<div class="task-attributes">' +
        '<h4>{{ taskText }}</h4>' +
        '<p>Importance: {{ importanceLevel }} | Completed: {{ isCompleted }}</p>' +
      '</div>' +
    '</div>'
});