<template>
    <div class="container-fluid position-fixed bg-white z-index-sticky" style="bottom: 0;box-shadow: 0 0px 0.1px 0.1rem rgba(0, 0, 0, 0.1); width: 100%;">
        <div class="d-flex justify-content-around">
            <slot></slot>
        </div>
    </div>
</template>
<script>

// import singleBottomMenuItem from './single-bottom-menu-item'

export default {
  name: 'appBottomMenu',
  props: {
    items: Array
  },
  computed: {
    cart_count: function () {
      return this.$store.getters['merchant/cart_length']
    }
  },
  components: {
    // singleBottomMenuItem
  }
}

</script>
