<template>
  <div class="glow-effect" :class="color_"></div>
</template>

<script>
export default {
  name:"GlowHint",

  props:{
    color:String
  },

  computed:{
    color_(){
      return this.color ? this.color : 'dark' ;
    }
  }
}
</script>
