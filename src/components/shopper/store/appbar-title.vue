<template>
  <v-toolbar-title
      style="width: 230px"
      class="ml-0 pl-0"
      >
      <v-btn bottom text large :to="pageLinks.home" :color="color_">
          <span class="text-capitalize">{{appName}}</span>
      </v-btn>
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
    }
  },
}
</script>
