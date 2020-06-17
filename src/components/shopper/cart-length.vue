<template>
  <v-badge  :color="badgeColor" overlap>
    <template slot="badge"><span :class="badgeColor =='white' ? 'red--text': ''">{{cart_count}}</span></template>
    <v-btn exact :to="theRoute" class="" :color="!alternateColor ? 'white' :  breakpoint.xs ? 'white' : 'primary'">
      <v-icon>mdi-cart</v-icon>
      Checkout
    </v-btn>
  </v-badge>
</template>
<script>
export default {
  name:"CartLength",

  props:{
    alternateColor:{
      type:Boolean,
      default:()=>true
    }
  },

  computed: {
    breakpoint(){
      return this.$vuetify.breakpoint ;
    },

    badgeColor(){
      return !this.alternateColor ? 'white' :  this.breakpoint.xs ? 'white' : 'red darken-2'
    },

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
