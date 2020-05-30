<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="position-relative justify-content-end align-center"
      v-on:click="$emit('click')"
      :flat="mode=='carousel'"
      :tile="mode=='carousel'"
      style="min-height:100px;">
      <div
        class="image-container--16-9"
        style="padding-top:70%">
        <img v-bind:src="bg_image" />
      </div>

      <v-card-text>
        <div class="body-2 font-weight-medium text-truncate text-capitalize">{{category.name}}</div>
        <div class="caption primary--text text-right" v-show="mode!='carousel'">{{category.count}}</div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
import { publicPath } from '@/constants.js'

export default {
  name: 'singleProductCategory',
  props: {
    displayOptions:{
      type:Object,
      default:()=>{
        displayCount:false
      }
    },
    mode:{
      type:String,
      default(){
        return 'carousel' ;
      }
    },
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
