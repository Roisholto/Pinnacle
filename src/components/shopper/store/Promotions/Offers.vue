<template>
  <storeLayout>
    <router-view />
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue' ;
import mapState from 'vuex' ;
import NoPromos from './NoPromos.vue' ;
import PromoList from './PromoList.vue' ;

export default {
  name:"Offers",

  data(){
    return {}
  },

  computed:{
    promos(){
      return this.$store.state.merchant.promotions.promos ;
    }
  },

  components:{
    storeLayout,
    NoPromos,
    PromoList
  }
}
</script>
