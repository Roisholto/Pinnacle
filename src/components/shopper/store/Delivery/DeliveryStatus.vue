<template>
  <div class="d-flex align-center">
    <GlowHint :color="colorHint" class="mr-2"/>
    <div class="flex-fill font-weight-bold text-capitalize">
      {{currentLabel}}
    </div>
  </div>
</template>
<script>
import GlowHint from '@/components/common/GlowHint.vue' ;

export default {
  name:"Delierystatus",

  props:{
    data:{
      type:Object,
      required:true
    }
  },

  data(){
    return {
      labels:['pending', 'enroute', 'delivered']
    }
  },

  computed:{
    currentState(){
      let l = 0 ;
      if(this.data.enroute)
        l = 1
      if(this.data.delivered)
        l = 2
      return l ;
    },

    currentLabel(){
      return this.labels[this.currentState] ;
    },

    colorHint(){
      let color = 'danger' ;

      if (this.currentState == 1)
        color  = 'warning' ;

      if(this.currentState == 2)
        color = 'success' ;

      return color ;
    },
  },

  components:{
    GlowHint
  }
}
</script>

<style lang="css" scoped>
</style>
