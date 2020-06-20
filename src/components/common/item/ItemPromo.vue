<template>
  <div>
    <v-icon color="pink" class="mr-1" small>mdi-tag</v-icon>
    <span class="caption pink--text ">{{label}}</span>
  </div>
</template>

<script>
export default {
  name:"ItemPromo",

  props:{
    promos:{
      type:Array,
      required:true,
    },

  },

  computed:{
    label(){
      let promo = this.promos[0] ;
      if(promo.type == 'product'){
        let discount_params = promo.discount_params ;
        if(promo.discount_params.type == 1){
          let item_a_count = discount_params.item_a_count > 0 ? discount_params.item_a_count : 1 ;
          return `Buy ${discount_params.item_count} get ${item_a_count} free` ;
        }
      }

      return '-'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
