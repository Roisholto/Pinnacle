<template>
    <v-app id="">
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            >
            <userNav/>
        </v-navigation-drawer>

        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="primary darken-2"
            dark
            :extension-height="storeInfoHeight"

            >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title
                style="width: 230px"
                class="ml-0 pl-0"
                >
                <v-btn bottom text large :to="homeLink">
                    <span class="text-capitalize">{{appName}}</span>
                </v-btn>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
                @focus="searchFocusedEvent"
                placeholder="Search items . . ."
                >
            </v-text-field>


            <v-spacer></v-spacer>

            <v-btn class="hidden-md-and-up" @click.stop="searchFocusedEvent" icon>
                <v-icon class="">mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>

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
            <template v-slot:extension v-if="$store.state.ui.installMode == 'standard'">
                <div id="store-main-info"
                    v-show="showMerchantInfo"
                    ref="storeMainInfo"
                    class="white w-100 position-absolute"
                    style="left:0"
                    >

                    <store-level-1 v-bind:store="merchantInfo" v-bind:options="{showType:false}" :storeDistance="true">
                    </store-level-1>

                </div>
            </template>
        </v-app-bar>

        <v-content id="store-content-body">
            <v-container
                class=""
                fluid
                >
                <slot />
            </v-container>
        </v-content>


        <store-footer></store-footer>

    </v-app>
</template>

<script>
import userNav from '@/components/shopper/user-nav1.vue' ;
import {APP_NAME, INSTALL_MODE} from '@/constants.js' ;
import { mapState, mapGetters } from 'vuex'
import storeLevel1 from '@/components/common/store/store-level-1.vue' ;
import ResizeSensor from 'resize-sensor' ;
import storeFooter from '@/components/shopper/store/store-footer.vue' ;

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
     drawer: null,
     appName:APP_NAME,
     INSTALL_MODE,
     store_main_info_height:''
     }),
     computed:{
         ...mapState({
             merchantInfo: state => state.merchant.info
            }),
        ...mapGetters({
            homeLink:'ui/homeLink'
        })  ,
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
        userNav,
        storeLevel1,
        storeFooter
    },
    mounted: function()
        {
        // update the margin-top of the router view to  height of (#store-main-info);
        // this.set_store_main_info_height() ;
        const vm = this ;
        if(vm.$refs.storeMainInfo)
            this.resizeMainInfo = new ResizeSensor(vm.$refs.storeMainInfo, vm.set_store_main_info_height) ;
        },
    beforeDestroy:function()
        {
        if(this.$refs.storeMainInfo)
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
          let el = this.$refs.storeMainInfo ;
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
