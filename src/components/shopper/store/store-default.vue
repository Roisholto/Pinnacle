<template>
    <storeLayout>
        <!-- Top items here [Carousel like]-->
        <topItems class="my-2"/>
        <!-- End Top items -->

        <!--- Product Categories here -->
        <div class="my-4">
            <h3>Browse categories</h3>
            <product-categorys class="py-2"></product-categorys>
        </div>
        <!-- End product categorys -->
    </storeLayout>
</template>
<script>
import productCategorys from './product-categorys.vue'
import topItems from './top-items/top-items.vue'
import storeLayout from '@/layouts/storeLayout.vue' ;

export default {
  name: 'StoreDefault',
  components: {
    productCategorys,
    topItems,
    storeLayout
  },
  computed: {

  },

  methods: {

  }
}
</script>
