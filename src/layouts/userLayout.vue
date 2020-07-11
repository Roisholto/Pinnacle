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
        <v-system-bar app dark color="red lighten-2" class="justify-center" v-if="!isSessionActive">
            <div class="text-center">User not signed</div>
        </v-system-bar>
        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            :color="'primary darken-1'"
            class=""
            dark
            >

            <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="false"></v-app-bar-nav-icon>

            <AppbarTitle :color="'white'"/>

            <StoreSearchNavigation :icon="false"/>

            <v-spacer></v-spacer>

            <StoreSearchNavigation :icon="true" />

            <UserDropMenu :alternateColor="false"/>

            <!--<topNavCart />-->
            <CartLength :alternateColor="false"/>

            <v-btn icon class="d-none">
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
            <template v-slot:extension v-if="viewTitle">
                <v-container class="">
                    <span class="small text-uppercase" style="font-weight:500 ;">{{viewTitle}}</span>
                </v-container>
            </template>
        </v-app-bar>
        <v-content>
            <v-container
              class="fill-height align-start"
              fluid
              >
              <slot />
            </v-container>
        </v-content>
        <MainFooter />
    </v-app>
</template>

<script>
import userNav from '@/components/shopper/user-nav1.vue' ;
import {APP_NAME} from '@/constants.js' ;
import topNavCart from '@/components/shopper/user/top-nav-cart.vue' ;
import {mapGetters} from 'vuex' ;
import AppbarTitle from '@/components/shopper/store/appbar-title.vue' ;
import MainFooter from '@/components/shopper/MainFooter.vue' ;
import UserDropMenu from '@/components/shopper/UserDropMenu.vue' ;
import CartLength from '@/components/shopper/cart-length.vue' ;
import StoreSearchNavigation from '@/components/shopper/store/StoreSearchNavigation.vue'
import RouteLoadingOverlay from '@/components/shopper/RouteLoadingOverlay.vue' ;

export default {
    props: {
      source: String,
    },
    data: () => ({
     drawer: null,
     appName:APP_NAME,

    }),
    computed: {
      breakpoint(){
        return this.$vuetify.breakpoint ;
      },

      ...mapGetters({
          isSessionActive:'user/isSessionActive',
          homeLink:'ui/homeLink'
      }),

      viewTitle: function () {
        let c = ''
        switch (this.$route.name) {
          case 'saved-stores':
            c = 'Saved stores'
            break
          case 'transactions':
            c = 'transactions'
            break
          case 'orders' :
            c = 'orders'
            break
          case 'saved-cards' :
            c = 'saved cards'
            break
          case 'saved-locations' :
            c = 'saved locations'
            break
        }

        return c
      }
    },
    components:{
      RouteLoadingOverlay,
      userNav,
      topNavCart,
      AppbarTitle,
      MainFooter,
      CartLength,
      UserDropMenu,
      StoreSearchNavigation
    },
    methods:{

    }
  }
</script>
