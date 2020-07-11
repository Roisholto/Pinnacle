<template>
    <v-app id="">
      <RouteLoadingOverlay />
        <v-navigation-drawer
            v-model="drawer"
            app
            :clipped="false"
            v-if="false"
            >
            <!--:clipped="$vuetify.breakpoint.lgAndUp"  v-if="breakpoint.xs"-->
            <userNav/>
        </v-navigation-drawer>

        <v-app-bar
            app
            :color="breakpoint.xs ? 'primary': ''"
            class="appbar-extension-primary"
            :extension-height="36"
            :hide-on-scroll="breakpoint.xs"
            ><!--:clipped-left="$vuetify.breakpoint.lgAndUp"extension-height=storeInfoHeight-->

            <AppbarNavIcon v-if="false"/> <!-- breakpoint.xs -->

            <AppbarTitle />

            <v-spacer></v-spacer>

            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              dense
              class="hidden-sm-and-down px-4"
              :color="breakpoint.xs? 'primary': '' "
              @focus="searchFocusedEvent"
              placeholder="Search items . . ."

              style="max-width:600px"
              >
            </v-text-field>



            <v-btn class="hidden-md-and-up"
              @click.stop="searchFocusedEvent"
              :color="!breakpoint.xs? 'primary' : 'white'"
              :dark="!breakpoint.xs"
              icon>
                <v-icon class="">mdi-magnify</v-icon>
            </v-btn>

            <UserDropMenu />
            <CartLength />

            <!--<v-btn></v-btn>-->
            <v-btn
                icon
                large
                class="d-none"
                >
                <v-avatar
                    size="32px"
                    item

                    >
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                    alt="Vuetify"
                    >
                    </v-img>
                </v-avatar>
            </v-btn>

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
              <Extension ref="extension" />
            </template>
        </v-app-bar>

        <v-content id="store-content-body">
            <v-container
                fluid
                >
                <slot />
            </v-container>
        </v-content>
        <CartChangeAlert app/>
        <MainFooter />
        <div style="position:fixed;right:0;bottom:0">
          <div class="position-relative d-flex pb-4">
            <SearchFilter v-if="$route.name == 'store-category'"/>
            <v-spacer class="mx-2"/>
            <ScrollToTop :isFixed="false"/>
          </div>
        </div>
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
import ScrollToTop from '@/components/common/scroll-to-top.vue' ;
import AppbarTitle from '@/components/shopper/store/appbar-title.vue' ;
import AppbarNavIcon from '@/components/shopper/store/appbar-nav-icon.vue' ;
import SearchFilter from '@/components/shopper/store/SearchFilter.vue' ;
import MainFooter from '@/components/shopper/MainFooter.vue' ;
import UserDropMenu from '@/components/shopper/UserDropMenu.vue' ;
import CartChangeAlert from '@/components/shopper/cart-change-alert.vue' ;
import RouteLoadingOverlay from '@/components/shopper/RouteLoadingOverlay.vue' ;


export default {
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
       RouteLoadingOverlay,
        userNav,
        storeLevel1,
        MainFooter,
        CartLength,
        Extension,
        ScrollToTop,
        AppbarTitle,
        AppbarNavIcon,
        SearchFilter,
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
            this.resizeMainInfo = new ResizeSensor(vm.$refs.extension.$el, vm.set_store_main_info_height) ;
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
          let el = this.$refs.extension.$el ;
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
