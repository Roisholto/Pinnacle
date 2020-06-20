// list items qualified for current promo ;
<template lang="html">
  <div class="py-2">
    <div class="grid-6-base-2">
      <single-item-card
        v-for="(item) in matched"
        v-bind:item="item"
        :promo="promo"
        v-bind:key="item.id"
        v-on:click="openModal(item.code)"
        /><!-- v-bind:item="inventoryItems[item]" v-on:click="open_modal(item)" -->
    </div>
    <template v-if="currentCode">
        <add-to-cart v-bind:productCode="currentCode" ref="theModal" />
    </template>
  </div>
</template>
<script>
import SingleItemCard from '@/components/common/item/single-item-card.vue'
import addToCart from '@/components/shopper/cart/add-to-cart.vue'

export default {
  name:"PromoItems",

  props:{
    promo:{
      type:Object,
      required:true
    }

  },

  data(){
    return{
      currentCode:null,
    }
  },


  computed:{

    name(){
      return this.promo.name
    },

    type(){
      return this.promo.type
    },

    items(){
      return this.promo.discount_params.items ;
    },

    inventory(){
      return this.$store.state.merchant.inventory.items
    },

    matched(){
     switch (this.type) {
       case 'product':
         return this.matchTypeProduct() ;
         break;
       default:
     }
    }
  },

  components:{
    SingleItemCard,
    addToCart
  },

  methods:{
    matchTypeProduct(){
      if(this.items.indexOf('*') == -1)
        {
        let o = this.items ;
        let a = Object.values(this.inventory) ;
        let b = a.filter(function(x){
          return o.indexOf(x.code)!= -1 ;
        })
        return b ;
        }
      else
        {
        return Object.values(this.inventory) ;
        }
      },

    matchTypeBrand(){

    },

    matchTypeCategory(){

    },

    openModal(code){
      let vm = this
      this.currentCode = code ;
      this.$nextTick(function () {
        vm.$refs.theModal.modal_comp_open = true ;
      })

    }
  }

}
</script>

<style lang="css" scoped>
</style>
