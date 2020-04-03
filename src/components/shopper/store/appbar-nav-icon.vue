<template>
  <v-app-bar-nav-icon @click.stop="drawer = !drawer" :dark="breakpoint.xs"></v-app-bar-nav-icon>
</template>
<script>
import {mapState} from 'vuex' ;
export default{
  name:"AppbarNavIcon",
  computed:{
    breakpoint(){
      return this.$vuetify.breakpoint ;
    },
    drawer:{
      get(){
        return this.$store.state.ui.leftNavDrawer ;
      },

      set(v){
        this.$store.commit('ui/update_info',['leftNavDrawer', v])
      }
    }
  }
}
</script>
