<template>
  <v-btn fab right color="primary lighten-2" @click="ScrollToTop" fixed right bottom v-intersect="intersect">
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>
<script>
export default{
  name:"ScrollToTop",
  props:{
    pos:{
      type:Object,
      default(){
        return {
          top:0,
          left:0,
          behaviour: 'smooth'
        }
      }
    }
  },

  methods:{
    intersect(entries, observer, isIntersecting){
      console.log('isIntersecting', entries, observer, isIntersecting) ;
    },

    ScrollToTop(){
      window.scroll(Object.assign(this.pos,{
        top: 0,
        left: 0,
        behavior: 'smooth'
        })
      );
    }
  }
}
</script>
