<!-- component used in displaying pages
| content displayed in an iframe
| useful for displaying landing pages for products, a promo
-->
<template>
  <v-app id="blank-page">
    <v-content id="store-content-body">
      <v-container
          class=""
          fluid
          >
          <slot />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {APP_NAME, INSTALL_MODE} from '@/constants.js' ;
import { mapState, mapGetters } from 'vuex'
import storeLevel1 from '@/components/common/store/store-level-1.vue' ;
import ResizeSensor from 'resize-sensor' ;
import storeFooter from '@/components/shopper/store/store-footer.vue' ;
import CartLength from '@/components/shopper/cart-length.vue' ;
import Extension from '@/components/shopper/store/extension/extension.vue' ;
import ScrollToTop from '@/components/common/scroll-to-top.vue' ;
import AppbarTitle from '@/components/shopper/store/appbar-title.vue' ;
import AppbarNavIcon from '@/components/shopper/store/appbar-nav-icon.vue' ;

export default {
    name:"BlankPageLayout",
    props: {
      source: String,
      showMerchantInfo:{
          type:Boolean,
          default:()=> {
              return true
          }
      }
    },

    data: () => ({
     appName:APP_NAME,
     INSTALL_MODE,
     store_main_info_height:'',
     useExtension:true
     }),
     computed:{
         ...mapState({
           merchantInfo: state => state.merchant.info,
           }),

         drawer:{
           get(){
             return this.$store.state.ui.leftNavDrawer ;
           },

           set(v){
             this.$store.commit('ui/update_info',['leftNavDrawer', v])
           }
         },

        ...mapGetters({
            homeLink:'ui/homeLink'
          }),

        breakpoint(){
          return this.$vuetify.breakpoint ;
        },

         storeInfoHeight:{
             set:function(n){
                 this.$store.commit('ui/update_info',['storeInfoHeight',n])
                 },
             get:function(){
                 return this.$store.state.ui.storeInfoHeight.toString()+'px' ;
                 }
             },


     },
    components:{
        storeLevel1,
        storeFooter,
        CartLength,
        Extension,
        ScrollToTop,
        AppbarTitle,
        AppbarNavIcon
    },
    mounted: function()
        {

        },
    beforeDestroy:function()
        {

        },

    methods:{
      
    }
}
</script>
