// renderer.js
import Vue from 'vue'

export default Vue.component('PageRenderer', {
  functional: true,
  name:'PageRenderer',
  render: function(h, context) {
    if (!context.props.template) return h()
    return h(Vue.compile(context.props.template))
  },
})
