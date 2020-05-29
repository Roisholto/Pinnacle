<template>
  <div class="d-flex">
    <CategoryMenu/>
    <v-btn
      text
      dark
      :to="{name:'merchant-offers'}"
    >
      <v-icon left>
        mdi-sale
      </v-icon>
      offers
    </v-btn>
  </div>
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
