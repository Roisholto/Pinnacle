<template>
  <v-app id="">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              @click="goto"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="item.link"
            @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
        <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="hidden-sm-and-down">{{appName}}</span>
        </v-toolbar-title>
        <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
            class="hidden-sm-and-down"
            >
        </v-text-field>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-apps</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn
            icon
            large
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
            <router-view></router-view>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {APP_NAME} from '@/constants.js' ;
  export default {
    props: {
      source: String,
      appName:APP_NAME
    },
    data: () => ({
     drawer: null,
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
  }
</script>
