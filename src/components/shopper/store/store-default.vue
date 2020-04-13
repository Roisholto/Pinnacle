<template>
    <storeLayout>
        <!--top banner -->
        <v-dialog max-width="500" v-model="showOpening" v-if="openingModalCount == 0">
          <Opening @close-modal="closeOpeningModal"/>
        </v-dialog>
        <div class="position-relative" style="margin:0 -15px">
          <TopBanner />
        </div>
        <!-- Top items here [Carousel like]-->
        <topItems class="my-2"/>

        <div class="my-2">
          <v-btn block color="primary" large :to="{name:'store-category', params:{category:'all'}}">
            Browse products
          </v-btn>
        </div>

        <QuickBlog />
        <!-- End Top items -->

        <NeedHelp />
        <!--- Product Categories here -->
        <v-sheet light class="text-center py-10">
            <h3 class="mb-5 display-1 font-weight-light primary--text">Shop by aisle</h3>
            <product-categorys-carousel class="py-6"></product-categorys-carousel>
        </v-sheet>

        <v-sheet light class="py-10" style="">
          <div class="display-1 font-weight-light mb-5 primary--text text-center mx-auto" style="max-width:500px">
            Shopping online on <span class="primary--text">{{appName}}</span> is tad easy !!
          </div>
          <HowToShop/>
        </v-sheet>

        <JoinUs />

        <!-- End product categorys -->
    </storeLayout>
</template>
<script>
import ProductCategorysCarousel from './product-categorys-carousel.vue'
import topItems from './top-items/top-items.vue'
import storeLayout from '@/layouts/storeLayout.vue' ;
import TopBanner from './top-banner.vue' ;
import QuickBlog from './quick-blog.vue' ;
import HowToShop from './page-elements/how-to-shop.vue' ;
import Opening from './page-elements/opening.vue' ;
import JoinUs from './page-elements/join-us.vue' ;
import NeedHelp from './page-elements/need-help.vue' ;

import {mapState} from 'vuex' ;


let sitehost = '' ;
export default {
  name: 'StoreDefault',
  data(){
    return {
      appName:process.env.VUE_APP_APP_NAME,
      showOpening:true
    }
  },

  components: {
    ProductCategorysCarousel,
    topItems,
    storeLayout,
    TopBanner,
    QuickBlog,
    HowToShop,
    Opening,
    JoinUs,
    NeedHelp
  },

  computed: {
    openingModalCount(){
      return this.$store.state.ui.StoreDefault.openingModalCount ;
    }
  },

  watch:{
    showOpening(nv){
      if(!nv)
        {
          this.$store.commit('ui/incrementOpeningModalCount') ;
        }
    }
  },

  methods: {
    closeOpeningModal:function(e){
      this.showOpening= e
      // this.$store.commit('ui/incrementOpeningModalCount') ;
      // console.log('close', e)
    }
  }
}
</script>
