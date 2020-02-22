<template>
    <!--- Product Categories here -->
    <div>
        <div class="grid-6-base-2">
            <single-product-category
            v-bind:category="category"
            v-for="(category, index) in categorys"
            v-bind:key="index" v-on:click="goto_category(category.name)"
            />
        </div>

    </div>
</template>
<script>
import singleProductCategory from './single-product-category.vue'
import { mapState } from 'vuex'

export default {
  name: 'productCategorys',
  components: {
    singleProductCategory
  },
  computed: {
    ...mapState({
      categorys: function (state) {
        return state.merchant.inventory.categorys
      }
    })

  },
  methods: {
    goto_category: function (category) {
      console.log('switching category', category)
      this.$router.push({ name: 'store-category', params: { category: category } })
    }
  }
}
</script>
