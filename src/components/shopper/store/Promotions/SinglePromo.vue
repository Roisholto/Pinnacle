<template>
  <v-card>
    <v-img
     :src="img"
     class="white--text align-end"
     gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
     height="150px"
     >
     <v-card-title class="subtitle-1">{{promo.name}}</v-card-title>
   </v-img>

   <v-card-text>
     <div v-if="promo.is_coupon">
       <v-icon class="mr-2" color="green" v-show="promo.code == appliedCoupon">
         mdi-check-circle-outline
       </v-icon>
       <span class="mr-2" v-show="promo.code != appliedCoupon">Apply coupon</span>
       <CouponCode :code="promo.code" @click="applyCoupon"/>
     </div>
     <template v-else>
       <v-chip color="yellow darken-2" class="black--text" dark small>Automatic</v-chip>
     </template>

     <div class="pt-2">
       <v-icon class="mr-2" color="red darken-1">mdi-timer-outline</v-icon>
       <span v-if="promo.stop_at">Expires {{expiryToNow}}</span>
       <span class="" v-else>-</span>
     </div>
   </v-card-text>
   <v-card-actions>
     <v-btn text color="orange" :to="{
       name:'single-merchant-promo',
       params:{
         promo:promo
       }
     }">SHOP</v-btn>
     <v-spacer></v-spacer>
     <v-btn
      icon
      @click="show_description = !show_description"
      >
      <v-icon>{{ show_description ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>
   </v-card-actions>
   <v-expand-transition>
     <div v-show="show_description">
       <v-divider></v-divider>
       <v-card-text>
          {{promo.description}}
       </v-card-text>
     </div>
   </v-expand-transition>
  </v-card>
</template>

<script>
import CouponCode from './CouponCode.vue' ;
import moment from 'moment' ;

export default {
  name:"SinglePromo",

  props:{
    promo:{
      type:Object,
      required: true
    }
  },

  data(){
    return {
      show_description:false
    }
  },

  computed:{
    img(){
      // default promotion
      return this.promo.image ? this.promo.image : '/img/promo.png' ;
    },

    expiryToNow(){
      if(this.promo.stop_at)
        {
        let x = moment(this.promo.stop_at) ;
        return x.fromNow() ;
        }
      return '-'
    },

    appliedCoupon(){
      return this.$store.state.merchant.cartExtras.promotion.coupon
    }
  },

  components:{
    CouponCode
  },

  methods:{
    applyCoupon(){
      // unset or set ;
      let c = this.promo.code == this.appliedCoupon ? null : this.promo.code ;
      this.$store.commit('merchant/cartExtras/set_promo_code', c) ;
    },

    shopQualifiedProduct(){
      // the qualifying items ;
      let it = this.promo.discount_params.items ;
      this.$router.push({
        name:'single-merchant-promo',
        params:{
          name:this.promo.name,
          items:this.promo.discount_params.items,
          type:this.promo.type
        }
      })
      // console.log(it)
    }
  },



}
</script>

<style lang="css" scoped>
</style>
