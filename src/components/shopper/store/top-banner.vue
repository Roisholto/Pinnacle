<template>
  <ImageSlider :name="'home'" :mid="mid" />
</template>
<script>
import ImageSlider from './PageComponents/ImageSlider.vue' ;

export default {
  name:"TopBanner",
  computed:{
    mid:function(){
      return this.$store.state.merchant.info.mid
    }
  },

  components:{
    ImageSlider
  }
}
</script>
