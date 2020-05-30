<template>
  <v-menu dense :offset-y="true" min-width="150">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
      >
        <v-icon :color="!alternateColor ? 'white' : breakpoint.xs ? 'white' : 'primary'">
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </template>
    <userNav />
  </v-menu>
</template>
<script>
import userNav from '@/components/shopper/user-nav1.vue' ;
export default {
  name:"UserDropMenu",
  props:{
    //whether to alternate color or not
    alternateColor:{
      type:Boolean,
      default:()=>true
    }
  },
  computed: {
    breakpoint(){
      return this.$vuetify.breakpoint ;
    },
  },

  components:{
    userNav
  }
}
</script>
