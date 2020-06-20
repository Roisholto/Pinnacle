<template>
  <div>
      <audio ref="audio" preload="auto">
        <source src="/assets/audio/blop.ogg" type="audio/ogg">
        <source src="/assets/audio/blop.mp3" type="audio/mpeg">
      </audio>
      <v-snackbar v-model="snackbar.show" :timeout="4000" color="primary">
        Item added to cart
      </v-snackbar>
  </div>
</template>
<script>
export default {
  name:"CartChangeAlert",

  data(){
    return {
      snackbar:{
        show:false,
      }
    }
  },

  computed: {
    cart_count: function () {
      return this.$store.getters['merchant/cart_length']
    }
  },

  watch:{
    cart_count: function(n,o){
      if(n > o)
        {
        // play audio ;
        this.$refs.audio.play() ;
        this.snackbar.show = true ;
        }
    }
  }
}
</script>
