<template>
    <v-card @click="$emit('click')">
        <div class="w-100 px-0 image-container--16-9 " style="padding-top:70%">
            <!-- <img class="lozad" v-bind:data-src="itemIcon"> -->
            <lazyImage v-bind:data-src="itemIcon"  v-bind:backgroundColor="'#fff'"/>
        </div>
        <!--<v-img
          :src="itemIcon"
          height="200px"
          contain
          aspect-ratio="1.5"
        ></v-img>-->
        <v-card-title class="price align-center font-weight-bold d-flex" style="line-height:1.2">

            <div class="flex-fill" style="font-size:0.95rem;">
                {{to_currency(item.rate[0].price)}}
            </div>
            <v-btn
                icon
                color="primary"
                text
                @click.stop="$emit('click')"
                style="margin-right:-12px"
                >
                <v-icon size="18px">mdi-plus-circle</v-icon>
            </v-btn>

        </v-card-title>
        <v-card-subtitle class="py-2">
            <div>
                {{item.name}}
            </div>
            <div class="">
                {{item.spec||'N/A'}}
            </div>
        </v-card-subtitle>

        <v-card-actions class="justify-end d-none" >
            <v-btn
                color="primary"
                text
                @click.stop="$emit('click')"
                >
                ADD
            </v-btn>
        </v-card-actions>
    </v-card>


</template>

<script>
/*<div class="card cursor-pointer d-flex position-relative justify-content-end align-center" v-on:click="$emit('click')" style="min-height:100px;">
    <div class="w-100 px-0 image-container--16-9 " style="padding-top:100%">
        <!-- <img class="lozad" v-bind:data-src="itemIcon"> -->
        <lazyImage v-bind:data-src="itemIcon"  v-bind:backgroundColor="'#fff'"/>
    </div>
    <div class="pa-2 text-left body-2 w-100 card-body d-flex flex-column" style="background:rgba(0,0,0,0.1)">
        <div class="font-weight-bold name text-capitalize caption">{{item.name}}</div>
        <div class="spec text-capitalize caption" >
            {{item.spec||'N/A'}}
        </div>
        <div class="flex-fill justify-end d-flex">
            <div class="price text-right font-weight-bold align-self-end">
                {{to_currency(item.rate[0].price)}}
            </div>
        </div>
    </div>
</div>*/
import lazyImage from '@/components/common/lazy-image.vue'
import { publicPath } from '@/constants.js'
import { naija_currency } from '@/functions/to_currency.js'

export default {
  name: 'singleItemCard',
  props: ['item', 'mode'], // mode is either search-main, search-store, invoice
  data: function () {
    return {}
  },
  computed: {
    itemIcon: function () {
      let icon = this.item.images.length ? this.item.images[0] : publicPath + 'svg/shopping-cart.svg'
      return icon
    }
  },
  components: {
    lazyImage
  },
  methods: {
    to_currency (c) {
      return naija_currency(c)
    }
  }
}
</script>
