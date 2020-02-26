<template>
  <v-btn icon exact :to="theRoute" class="" color="primary">
      <v-badge color="red darken-2">
        <template slot="badge">{{cart_count}}</template>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
  </v-btn>
</template>
<script>
export default {
  name:"CartLength",
  computed: {
    theRoute: function(){
      let a = {name:'cart', params:{storeid:this.mid}} ;
      return a ;
    },

    in_store: function () {
      // set current merchant ;
      let the_route = this.$route.path.split('/')
      let the_merchant = ''
      if (the_route.indexOf('store') == 1) {
        the_merchant = the_route[2] // this.$route.params['storeid']
      }

      // this.current_merchant = the_merchant ;
      return the_merchant
    },
    mid: function () {
      return this.$store.state.merchant.info.mid
    },
    cart_count: function () {
      return this.$store.getters['merchant/cart_length']
    }
  }
}
</script>
