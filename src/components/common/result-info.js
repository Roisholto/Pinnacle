const resultInfo = {
  props: [
    'level', // error warning success
    'message'
  ],
  computed: {
    level_class: function () {
      let classes = ['alert']
      switch (this.level) {
        case 'success':
          classes.push('alert-success')
          break
        case 'error':
          classes.push('alert-danger')
          break
        case 'warning':
          classes.push('alert-warning')
          break
        default:
          classes.push('alert-primary')
      }
    }
  },
  template: `<div v-bind:class="level_classes">{{message}}</div>`
}

export default resultInfo
