<template lang="html">
  <div class="col-sm-3 col-4">
    <v-hover
      v-slot:default="{ hover }">
      <v-card
        :flat="!hover"
        @click="$emit('route-changed')"
        class="d-flex flex-column justify-center align-center"
        :to="getStats(category).route"
      >
        <v-img :src="category.image" height="100" width="100"></v-img>
        <div class="py-1 body-2 text-center">{{category.name}}</div>

      </v-card>
    </v-hover>
  </div>
</template>

<script>
import getStats from './category-stats.js' ;

export default {
  name:"SingleCategory",

  props:{
    category:{
      type:Object,
      required:true
    }
  },

  components:{

  },

  methods:{
    getStats
  }
}
</script>

<style lang="css" scoped>
</style>
