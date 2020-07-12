<template>
    <div class="d-flex">
        <div class="item-image d-flex align-center pr-3" style=""> <!-- col-sm-3 col-lg-2 px-1-->
            <v-avatar tile>
                <v-img :src="itemIcon"></v-img>
            </v-avatar>
             <!--<div class="image-container--16-9 ">
                 <lazy-image v-bind:data-src="itemIcon" v-bind:backgroundColor="'#fff'"/>
             </div>-->
         </div>
         <div class="flex-fill px-1">
             <div class="font-weight-medium name text-capitalize subtitle-2 text-truncate">
                 {{item.name}}
             </div>
             <template v-if="mode =='search-store' || mode=='invoice'">
                 <div class="small spec body-2">
                     {{item.spec||'N/A'}}
                 </div>
             </template>
             <slot></slot>
         </div>
    </div>
</template>
<script>
import lazyImage from '@/components/common/lazy-image.vue'
export default {
    name:"singleItem",
  props: ['item', 'mode'], // mode is either search-main, search-store, invoice
  data: function () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    itemIcon: function () {
      let icon = (Array.isArray(this.item.images) && this.item.images.length) ? this.item.images[0] : this.publicPath + 'svg/shopping-cart.svg'
      return icon
    }
  },
  components: {
    lazyImage
  },
}
</script>
