<template>
    <!--- Product Categories here -->
    <Slick
      v-if="categorys.length"
      ref="slick"
      :options="slickOptions"
      @init="slickInit = true"
      >
      <single-product-category
      v-bind:category="category"
      v-for="(category, index) in categorys"
      v-bind:key="index" v-on:click="goto_category(category.name)"
      />
    </Slick>
</template>
<script>
import singleProductCategory from './single-product-category.vue'
import { mapState } from 'vuex'
import Slick from 'vue-slick'

export default {
  name: 'ProductCategorysCarousel',
  data(){
    return {
      slickInit: false,

      slickOptions: {
        arrows: true,
        autoplay:true,
        autoplaySpeed:4000,
        variableWidth: false,
        focusOnSelect: true,
        draggable:false,
        mobileFirst: true,
        swipeToSlide: false,
        rows:2,
        slidesToShow: 4,
        slideToScroll: 4,

        responsive: [
          {
            breakpoint: 600,
            settings: {
              rows:1
            }
          },
          {
            breakpoint: 768,
            settings: {
              rows:1
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 6,
              slideToScroll: 6,
              rows:1
            }
          }
        ]
      }
    }
  },
  components: {
    singleProductCategory,
    Slick
  },
  computed: {
    ...mapState({
      categorys: function (state) {
        return state.merchant.inventory.categorys
      }
    })

  },
  watch:{
    categorys:function(nv){
      console.log(' length ', nv.length) ;
      if(nv.length && this.slickInit)
        this.reInit()
    }
  },
  methods: {
    goto_category: function (category) {
      console.log('switching category', category)
      this.$router.push({ name: 'store-category', params: { category: category } })
    },
    reInit() {
          // Helpful if you have to deal with v-for to update dynamic lists
          this.$nextTick(() => {
              this.$refs.slick.reSlick();
          });
      },
    next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },
  }
}
</script>
<style lang="scss">
// customization for slick carousel
.slick-arrow{
    width: 30px ;
    height: 30px ;
    z-index:3 ;

    &.slick-next:before,&.slick-prev:before{
        color: /*var(--primary)*/ #f33348 !important;
        font-size: 28px
    }

    &.slick-prev{
        left: 0;
    }

    &.slick-next{
        right: 0;
    }
}
</style>
