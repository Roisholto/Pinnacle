<template>
  <v-list>
    <v-list-item v-for="(item, index) in locations" :key="item.index">
      <v-icon class="mr-2">
        mdi-circle-outline
      </v-icon>
      <v-list-item-title class="text-capitalize">{{item.name}}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
import {mapState, mapActions} from 'vuex' ;
export default {
  name:"LocationsList",

  data(){
    return {
      local:[]
    }
  },

  computed:{
    ...mapState({
      list:(state)=>state.merchant.deliveryLocations.locations
    }),

    locations(){
      if(this.list.length == 0)
        this.fetchLocations() ;

      return this.list
    }

  },

  mounted(){
    // this.fetchLocations() ;
  },

  methods:{
    ...mapActions({
      'fetchLocations':'merchant/deliveryLocations/fetchLocations'
    })
  }
}
</script>
