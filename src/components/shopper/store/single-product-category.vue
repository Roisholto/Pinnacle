<template>
    <div class="card d-flex position-relative justify-content-end align-center"
    v-on:click="$emit('click')"
    style="min-height:100px;">
        <div class="image-container--16-9"
            style="padding-top:70%">
            <img v-bind:src="bg_image" />
        </div>
        <div class="card-body pa-2 w-100 text-capitalize d-flex flex-column justify-space-between" style="background: rgba(162, 158, 158, 0.2)">
            <div class="body-2 font-weight-medium">{{category.name}}</div>
            <div class="caption primary--text text-right ">{{category.count}}</div>
        </div>
    </div>
</template>
<script>
import { publicPath } from '@/constants.js'
export default {
  name: 'singleProductCategory',
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    bg_image: function () {
      // set a random image from the list items belonging to this category => $router.app.merchant
      let img = this.category.image ? this.category.image : `${publicPath}svg/shopping-cart.svg`
      return img
    }
  }
}
</script>
