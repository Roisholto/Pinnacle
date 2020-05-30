// just a component with the user menu at the top
<template>
    <v-list dense>
        <v-list-item-group color="primary">
        <!--<v-list-item
            :to="pageLinks.home">
            <v-list-item-action>
                <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    {{INSTALL_MODE == 'standard' ? APP_NAME : 'Home'}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      -->

        <v-list-item
            :to="pageLinks.merchant_contact"
            v-show="false"
            >
            <v-list-item-action class>
                <v-icon small>mdi-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    {{INSTALL_MODE == 'standard' ? 'Contact merchant' : 'Contact'}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider v-show="false"></v-divider>

        <v-subheader v-if="container != 'menu'">PERSONAL ACCOUNT</v-subheader>
        <!--<v-avatar color="indigo">
            <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>-->
        <v-list-item
            :to="{name:'saved-stores'}"
            v-if="INSTALL_MODE == 'standard'"
            >
            <v-list-item-action>
                <v-icon>mdi-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Saved stores
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
            :to="{name:'saved-locations'}"
            v-show="isSessionActive"
            >
            <v-list-item-action :class="{'mr-2':smallIcon}">
                <v-icon :small="smallIcon">mdi-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Saved Address
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
            :to="{name:'orders'}"
            >
            <v-list-item-action :class="{'mr-2':smallIcon}">
                <v-icon :small="smallIcon">mdi-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Orders
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>


        <v-list-item
            :href="authUrl+'signout'"
            v-show="isSessionActive"
            >
            <v-list-item-action :class="{'mr-2':smallIcon}">
                <v-icon :small="smallIcon">mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Signout
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>


        <v-list-item
            @click=""
            :href="authUrl+'password/change'"
            v-show="isSessionActive"
            >
            <v-list-item-action :class="{'mr-2':smallIcon}">
                <v-icon :small="smallIcon">mdi-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Reset password
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
            :href="authUrl+'signin'"
            v-show="!isSessionActive"
            >
            <v-list-item-action :class="{'mr-2':smallIcon}">
                <v-icon :small="smallIcon">mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Login
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item
            :href="authUrl+'?asa=shopper'"
            v-show="!isSessionActive">
            <v-list-item-action :class="{'mr-2':smallIcon}">
                <v-icon :small="smallIcon">mdi-account-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Register
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list-item-group>
    </v-list>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import {APP_NAME, INSTALL_MODE} from '@/constants.js' ;

export default {
  name: 'userNav',

  props:{
    container:{
      type:String,
      default(){
        return 'menu'
      }
    }
  },

  data:function(){
      return {
          localOpenState:false,
          INSTALL_MODE,
          APP_NAME,
          currItem:0,
      }
  },
  computed: {
      ...mapGetters({
      isSessionActive: 'user/isSessionActive',
      authUrl: 'authUrl',
      homeLink: 'ui/homeLink',
    }),

    smallIcon(){
      return this.container == 'menu'
    },

    pageLinks(){
      return this.$store.getters['pageLinks']();
    },

    merchantInfo(){
      return this.$store.state.merchant.info ;
    }



  },
  methods: {
    goto (to) {
      this.closeTooltip()
      this.$router.push(to)
    },
    closeTooltip () {
      this.$refs.tooltip.$data.tip.hide()
    }

  }
}
</script>
<style lang="scss" scoped="true">
    a {
     /* color: transparent */
     &.nav-item{
         display: block ;
         padding:0.2em 0
     }
    }

</style>
