<template lang="html">
  <div>
    <v-btn
      block
      class="d-flex justify-space-between"
      color="white"
      :to="getStats(category).route"
      @click="$emit('route-changed')">
      All products
      <div>
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </div>
    </v-btn>

    <div class="py-1"></div>

    <!-- if item has children then display the children else display the current item -->

    <v-card class="mb-3" v-for="subcategory in category.children"  :key="subcategory.id">
      <div class="" >
        <div class="d-flex justify-space-between align-center px-2">
          <div class="text-uppercase body-2">{{subcategory.name}}</div>

          <v-btn text color="primary"
            :to="getStats(subcategory).route"
            @click="$emit('route-changed')"
            small>
            See all
          </v-btn>
        </div>

        <v-divider />

        <div class="row px-2 py-2" v-if="subcategory.children.length">
          <SingleCategory
            @route-changed="$emit('route-changed')"
            :category="subsubcategory"
            v-for="subsubcategory in subcategory.children"
            :key="subsubcategory.id"
            />
        </div>

        <div class="row px-2 py-2" v-else>
          <SingleCategory @route-changed="$emit('route-changed')" :category="subcategory" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import SingleCategory from './SingleCategory.vue' ;
import CategoryStats from './CategoryStats.vue' ;
import getStats from './category-stats.js' ;

export default {
  name:"SubCategory",

  props:{
    category:{
      type:Object,
      required:true
    }
  },

  components:{
    SingleCategory,
    CategoryStats
  },

  methods:{
    getStats
  }
}
</script>

<style lang="css" scoped>
</style>
