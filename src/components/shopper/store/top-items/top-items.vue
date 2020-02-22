// displays top items for current merchant;
<template>
    <div>
        <div v-if="theTopItems">
            <div v-if="theTopItems.succ">
                <h3>{{heading}}</h3>
                <slick class="zoom-slick" v-bind:options="slickOptions" v-on:swipe="onSwipeEvent" v-on:setPosition="onSlickSetPosition">
                    <div class="pa-2"
                        v-for="item in listedItems"
                        v-bind:key="item.code"
                        ><!-- theTopItems.data.items -->
                        <singleItemCard
                            v-bind:item="item"
                            v-on:click="singleItemClicked(item.code)"
                        />
                    </div>
                </slick>
            </div>
            <div v-else>
                {{theTopItems.error}}
            </div>
        </div>
        <div v-else>
            Some Error Occured here ;
        </div>
        <addToCart v-bind:productCode="selected_item" v-bind:openState="openAddCart" v-on:modal-hidden="openAddCart = false"/>
    </div>
</template>
<script>
import Slick from 'vue-slick'
import { API_ENDPOINT } from '@/constants.js'
import singleItem from './single-item.vue'
import 'slick-carousel/slick/slick.css'
import addToCart from '@/components/shopper/cart/add-to-cart.vue'
import singleItemCard from '@/components/common/item/single-item-card.vue'
import parse_rate from '@/functions/parse_item_rates.js'

export default {
  name: 'topItems',
  computed: {
    heading: function () {
      return this.theTopItems.data ? this.theTopItems.data.alias : ''
    },
    theTopItems: function () {
      return Object.assign({}, this.$store.state.merchant.inventory.subLists.top_list)
    },
    listedItems: function () {
        let a = this.theTopItems.data.items

      if (this.theTopItems) {
          let a = JSON.parse(JSON.stringify(this.theTopItems.data.items))

          a.forEach(function(v){
              console.log('parsed rate',parse_rate(v.rate) );
             v.rate = parse_rate(v.rate) ;
          })

          return a ;
      }
      return []
    }
  },
  data: function () {
    return {
      selected_item: '',
      openAddCart: false,
      slickCanHandleClick: true, // use to determie the state of slick ;
      slickOptions: {
        lazyLoad:'progressive',  
        arrows: false,
        variableWidth: false,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 1,
        centerPadding: '60px',
        mobileFirst: true,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slideToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
              // slideToScroll:4
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slideToScroll: 4
            }
          }
        ]
      }
    }
  },
  components: {
    Slick,
    singleItem,
    addToCart,
    singleItemCard
  },

  mounted: function () {

  },
  methods: {
    onSwipeEvent: function (sl, drx) {
      this.slickCanHandleClick = false
      // sl.target.stopImmediatePropagation() ;
    },
    onSlickSetPosition: function () {
      this.slickCanHandleClick = true
    },

    singleItemClicked: function (code) {
      if (this.slickCanHandleClick) {
        this.selected_item = code
        this.openAddCart = true
      }
    }
  }
}
</script>
<style lang="scss">
.zoom-slick    {
    img {
        /* filter: blur(2px) */
    }

    .slick-center {
        /* transform: scale(1.1) ;*/
        transition: transform 0.5s ;

        img{
            filter: blur(0)
        }

    }
}
</style>
