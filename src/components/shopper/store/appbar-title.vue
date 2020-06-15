<template>
  <v-toolbar-title
      class="ml-0 pl-0"
      >
      <!--<v-btn bottom text large :to="pageLinks.home" :color="color_">
          <span class="text-capitalize">{{appName}}</span>
      </v-btn>-->
      <router-link bottom text large :to="pageLinks.home" :class="[color_+'--text']" class="d-flex align-center">
        <v-img :src="logo" width="48" class="float-left mr-2"></v-img>
        <span class="display-1 hidden-sm-and-down font-weight-medium mr-0 mr-md-4 transparent">
          {{appName}}
        </span>
      </router-link>
  </v-toolbar-title>
</template>
<script>
import {mapGetters} from 'vuex' ;
import {APP_NAME} from '@/constants.js' ;

export default {
  name:"AppbarTitle",

  props:{
    color:String
  },

  data(){
    return {
      appName:APP_NAME,
    }
  },
  computed:{
    breakpoint(){
      return this.$vuetify.breakpoint ;
    },

    pageLinks(){
      return this.$store.getters['pageLinks']() ;
    },

    color_(){
      return this.color ? this.color : !this.breakpoint.xs ? 'primary' : 'white' ;
    },

    logo(){
      return '/img/logo.png'
      // return process.env.VUE_APP_ASSETS_BASE+'/logo.png' ;
    }
  },
}
</script>
