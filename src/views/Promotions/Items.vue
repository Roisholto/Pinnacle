<template lang="html">
  <div>
    <v-sheet>
      <v-breadcrumbs :items="bread" />
    </v-sheet>
    <PromoItems :promo="promo"/>
  </div>
</template>

<script>
import PromoItems from '@/components/shopper/store/Promotions/PromoItems.vue' ;

export default {
  name:"Items",

  props:{
    promo:{
      type:Object,
      required:true
    }
  },

  computed:{
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
        },
        {
          text: this.promo.name,
          disabled: true,
        },

      ]
    }
  },

  components:{
    PromoItems
  }
}
</script>

<style lang="css" scoped>
</style>
