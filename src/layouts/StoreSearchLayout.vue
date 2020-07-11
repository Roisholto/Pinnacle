<template>
    <v-app id="">
      <RouteLoadingOverlay />
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            v-if="false"
            >
            <userNav/>
        </v-navigation-drawer>

        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            :color="breakpoint.xs ? 'primary': ''"
            class="appbar-extension-primary"
            :extension-height="storeInfoHeight"
            :extended="breakpoint.xs"
            light
            :hide-on-scroll="breakpoint.xs"
            >
            <AppbarNavIcon v-if="false"/>

            <AppbarTitle />

            <v-spacer></v-spacer>

            <StoreSearchInput style="max-width:600px" v-if="!breakpoint.xs" :loading="requesting"/>

            <UserDropMenu />

            <CartLength />

            <template v-slot:extension>
              <!-- v-if="$store.state.ui.installMode == 'standard'" -->

                <!--<div id="store-main-info"
                    v-show="showMerchantInfo"
                    ref="storeMainInfo"
                    class="white w-100 position-absolute"
                    style="left:0"
                    >

                    <store-level-1 v-bind:store="merchantInfo" v-bind:options="{showType:false}" :storeDistance="true">
                    </store-level-1>
                </div>-->
              <div ref="extension" class="position-relative" style="width:100%">
                <div v-if="breakpoint.xs" class="justify-center d-flex pt-2">
                  <StoreSearchInput :loading="requesting"/>
                </div>
                <Extension />
              </div>
            </template>
        </v-app-bar>

        <v-content id="store-content-body">
            <v-container
                class=""
                fluid
                >
                <slot />
                <CartChangeAlert/>
            </v-container>
        </v-content>
        <ScrollToTop/>

        <!--<store-footer></store-footer>-->

    </v-app>
</template>

<script>
import userNav from '@/components/shopper/user-nav1.vue' ;
import {APP_NAME, INSTALL_MODE} from '@/constants.js' ;
import { mapState, mapGetters } from 'vuex'
import storeLevel1 from '@/components/common/store/store-level-1.vue' ;
import ResizeSensor from 'resize-sensor' ;
import storeFooter from '@/components/shopper/store/store-footer.vue' ;
import CartLength from '@/components/shopper/cart-length.vue' ;
import Extension from '@/components/shopper/store/extension/extension.vue' ;
import StoreSearchInput from '@/components/shopper/store/store-search-input.vue' ;
import ScrollToTop from '@/components/common/scroll-to-top.vue' ;
import AppbarTitle from '@/components/shopper/store/appbar-title.vue' ;
import AppbarNavIcon from '@/components/shopper/store/appbar-nav-icon.vue' ;
import UserDropMenu from '@/components/shopper/UserDropMenu.vue' ;
import CartChangeAlert from '@/components/shopper/cart-change-alert.vue' ;
import RouteLoadingOverlay from '@/components/shopper/RouteLoadingOverlay.vue' ;

export default {
    name:"StoreSearchLayout",
    props: {
      source: String,
      requesting:Boolean,
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
      breakpoint(){
        return this.$vuetify.breakpoint ;
      },

    ...mapState({
             merchantInfo: state => state.merchant.info
            }),

      drawer:{
        get(){
          return this.$store.state.ui.leftNavDrawer ;
        },

        set(v){
          this.$store.commit('ui/update_info',['leftNavDrawer', v])
        }
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
      RouteLoadingOverlay,
      userNav,
      storeLevel1,
      storeFooter,
      CartLength,
      Extension,
      StoreSearchInput,
      ScrollToTop,
      AppbarTitle,
      AppbarNavIcon,
      UserDropMenu,
      CartChangeAlert
    },
    mounted: function()
        {
        // update the margin-top of the router view to  height of (#store-main-info);
        // this.set_store_main_info_height() ;
        const vm = this ;
        //console.log('store extension ',this.$refs.extension)
        if(vm.$refs.extension)
            {
            this.useExtension = true ;
            //console
            this.resizeMainInfo = new ResizeSensor(vm.$refs.extension, vm.set_store_main_info_height) ;
            }
        },
    beforeDestroy:function()
        {
        if(this.$refs.extension)
            this.resizeMainInfo.detach() ;
        },
    methods:{
        searchInputEvent: function (nv) {
          this.$store.dispatch('merchant/update_search_string', nv)
        },
        searchFocusedEvent: function () {
          // let  '/store/'+ this.$route.params.storeid+'/search' ;
          this.$router.push({ name: 'store-search', params: { storeid: this.merchantInfo.mid } })
      },
      set_store_main_info_height: function($ev)
          {
          let el = this.$refs.extension ;
          let $el = $(el) ;
          let rt = 0
          if($el.length)
              {
              rt = $el.innerHeight() ;
              }

          this.storeInfoHeight = rt ;
          return 0 ;
          },

    }
}
</script>
