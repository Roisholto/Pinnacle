<template>
  <v-toolbar-title
      style="width: 230px"
      class="ml-0 pl-0"
      >
      <v-btn bottom text large :to="homeLink" :color=" !breakpoint.xs ? 'primary' : 'white'">
          <span class="text-capitalize">{{appName}}</span>
      </v-btn>
  </v-toolbar-title>
</template>
<script>
import {mapGetters} from 'vuex' ;
import {APP_NAME} from '@/constants.js' ;

export default {
  name:"AppbarTitle",
  data(){
    return {
      appName:APP_NAME,
    }
  },
  computed:{
    breakpoint(){
      return this.$vuetify.breakpoint ;
    },
    ...mapGetters({
      homeLink:'ui/homeLink'
    })
  },
}
</script>
