<template>
  <v-tabs
  background-color="primary"
  show-arrows
  height="36"
  optional
  >
    <CategoryMenu/>
    <v-tab :to="{name:'merchant-promos'}">
      <v-btn
        text
        dark
      >
        <v-icon left>
          mdi-sale
        </v-icon>
        offers
      </v-btn>
    </v-tab>
    <v-tab>
      <v-btn
        text
        dark
      >
        <v-icon left>
          mdi-circle
        </v-icon>
        favourites
      </v-btn>
    </v-tab>
    <v-tab>
      <v-btn
        text
        dark
      >
        <v-icon left>
          mdi-truck
        </v-icon>
        Track delivery
      </v-btn>
    </v-tab>
  </v-tabs>
</template>
<script>
import CategoryMenu from './categories.vue' ;
export default {
  name:"Extension",
  data(){
    return {

    }
  },
  components:{
    CategoryMenu
  }
}
</script>
