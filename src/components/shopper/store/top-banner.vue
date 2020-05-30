<template>
  <ImageSlider :name="'home'" :mid="mid" :carousel="carousel"/>
</template>
<script>
import ImageSlider from './PageComponents/ImageSlider.vue' ;

export default {
  name:"TopBanner",
  computed:{
    mid:function(){
      return this.$store.state.merchant.info.mid
    },

    carousel(){
      return {
        showArrows:false,
        height: this.$vuetify.breakpoint.xs ? '180' : '300'
      }
    }
  },

  components:{
    ImageSlider
  }
}
</script>
