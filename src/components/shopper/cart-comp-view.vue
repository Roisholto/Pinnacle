/** disable-eslint */
<template>
  <storeLayout>
    <CartComp class="col-md-6 mx-auto col-sm-8"/>
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue' ;
import CartComp from './cart-comp.vue' ;

window.jBox = jBox

export default {
  name: 'CartCompView',
  props: {
    merchant: Object,
    storeid: String
  },

  components: {
    CartComp,
    storeLayout
  },

}
</script>
