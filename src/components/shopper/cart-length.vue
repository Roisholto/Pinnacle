<template>
  <v-badge :color="badgeColor+' '+badgeColorIntensity" overlap>
    <template slot="badge"><span :class="badgeColor =='grey' ? 'red--text': ''">{{cart_count}}</span></template>
    <v-btn exact :to="theRoute" class="" :color="!alternateColor ? 'white' :  breakpoint.xs ? 'white' : 'primary'">
      <v-icon :color="badgeColor == 'grey' ? 'primary' : ''">mdi-cart</v-icon>
      <span :class="badgeColor == 'grey' ? 'primary--text' : ''">Checkout</span>
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
      return !this.alternateColor ? 'grey' :  this.breakpoint.xs ? 'grey' : 'red'
    },

    badgeColorIntensity(){
      return this.badgeColor == 'grey' ? 'lighten-4' : 'darken-2' ;
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
