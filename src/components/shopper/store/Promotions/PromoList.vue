<template>
  <div class="row">
    <v-col class="col-sm-4 col-6 py-2" :key="promo.uuid" v-for="promo in promos">
      <SinglePromo :promo="promo" />
    </v-col>
  </div>
</template>

<script>
import SinglePromo from './SinglePromo.vue' ;


export default {
  name:"OfferList",

  props:{
    promos:{
      type:Array,
      required: true
    }
  },

  data(){
    return {

    }
  },

  computed:{

  },

  components:{
    SinglePromo
  }
}
</script>

<style lang="css" scoped>
</style>
