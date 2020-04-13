<script>
import Vue from 'vue' ;

export default {
  name:"PageTemplate",

  props:{
    content:String
  },

  render (createElement){
    // https://snipcart.com/blog/vue-render-functions
    const compiledTemplate = Vue.compile(this.content);
    return compiledTemplate.render.call(this, createElement);
    }
}
</script>
