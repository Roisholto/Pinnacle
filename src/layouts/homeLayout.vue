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
            color="white"
            
            >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title
                style="width: 230px"
                class="ml-0 pl-0"
                >
                <router-link  class="text-capitalize" :to="{path:'/'}">
                    {{appName}}
                </router-link>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
                @focus="searchFocusedEvent"
                placeholder="Search for outlets, restaurants, items . . ."
                >
            </v-text-field>


            <v-spacer></v-spacer>

            <v-btn class="hidden-md-and-up" :to="{path:'search/stores'}" icon>
                <v-icon class="">mdi-magnify</v-icon>
            </v-btn>

            <topNavCart />
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
        </v-app-bar>
        <v-content>
            <v-container
                class="fill-height"
                fluid
                >
                <slot />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import userNav from '@/components/shopper/user-nav1.vue' ;
import {APP_NAME} from '@/constants.js' ;
import topNavCart from '@/components/shopper/user/top-nav-cart.vue' ;

export default {
    props: {
      source: String,
    },
    data: () => ({
     drawer: null,
     appName:APP_NAME,
      items: [
        { icon: 'mdi-circle', text: 'Saved stores', link:{name:'saved-stores'}},
        { icon: 'mdi-circle', text: 'Transactions', link:{name:'transactions'} },
        { icon: 'mdi-circle', text: 'Orders', link:{name:'orders'} },
        { icon: 'mdi-circle', text: 'Cards', link:{name:'saved-cards'} },
        { icon: 'mdi-circle', text: 'Sign out', link:null, href:'' },
        { icon: 'mdi-circle', text: 'Reset password', link:null, href:'' },
        { icon: 'mdi-circle', text: 'Sign in', link:null, href:'' },
        // { icon: 'content_copy', text: '' },
      ],
    }),
    components:{
        userNav,
        topNavCart
    },
    methods:{
        searchFocusedEvent: function () {
          if (!this.$route.path.indexOf('/search') == 0) // =0
          { this.$router.push({ path: '/search/stores' }) }
        }
    }
  }
</script>
