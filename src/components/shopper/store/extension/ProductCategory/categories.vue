<template>
  <v-tab @change="dialog = !dialog">
    <v-btn
      text
      dark
    >
      Shop Groceries
      <v-icon>
        mdi-chevron-down
      </v-icon>
    </v-btn>
    <v-bottom-sheet v-model="dialog" scrollable>
      <v-card :height="height" class="py-3">
        <v-card-text class="">
          <MainCategory @route-changed="dialog = false"/>
        </v-card-text>
      </v-card>

    </v-bottom-sheet>
  </v-tab>
</template>
<script>
import {mapState} from 'vuex' ;
import MainCategory from '@/components/shopper/store/ProductCategory/MainCategory.vue' ;

export default{
  name:"CategoryMenu",

  data(){
    return {
      dialog:false
    }
  },

  computed:{
    height(){
      return this.$vuetify.breakpoint.height -
              this.$store.state.ui.appHeaderHeight -
              this.$store.state.ui.storeInfoHeight;
    },
    ...mapState({
      categorys: function (state) {
        let a = [{count:0, id:0, image:null, name:"all"}] ;
        a.push(...state.merchant.inventory.categorys)
        return a ;
      },

      categoryMenu:function(state){
        return state.merchant.pageComponents.menus.product_category
      }
    })
  },

  components:{
    CategorysNest,
    MainCategory
  }
}
</script>
