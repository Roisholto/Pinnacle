<template lang="html">
  <div>
    <v-sheet>
      <v-breadcrumbs :items="bread" />
    </v-sheet>
    <NoPromos v-if="promos.length == 0"/>
    <PromoList :promos="promos"  v-else />
  </div>
</template>

<script>
import NoPromos from '@/components/shopper/store/Promotions/NoPromos.vue' ;
import PromoList from '@/components/shopper/store/Promotions/PromoList.vue' ;

export default {
  name:"AllPromotions",

  data(){
    return {

    }
  },

  computed:{
    promos(){
      return this.$store.state.merchant.promotions.promos ;
    },

    bread(){
      return  [
        {
        text: 'Store',
        link:true,
        disabled: false,
        exact:true,
        // href:this.$router.resolve({name:'store', params: this.$route.params}).href,
        to: { name: 'store', params:this.$router.params  }
        },
        {
          text: 'Offers',
          disabled: false,
          exact: true,
          to: { name: 'merchant-promos' }
        }
      ]
    }
  },

  components:{
    NoPromos,
    PromoList
  }
}
</script>
