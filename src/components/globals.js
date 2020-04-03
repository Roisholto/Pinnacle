import Vue from 'vue'

// load vuetify-components ;
const requireComponent = require.context(
  '../../node_modules/vuetify/lib/components', // The relative path of the components folder
  true, // Whether or not to look in subfolders
  /V[A-Z]\w+\.(vue|js)$/ // The regular expression used to match base component filenames
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = fileName
    .split('/')
    .pop() // Get last part - filename
    .replace(/\.\w+$/, '') // Removes .vue

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
