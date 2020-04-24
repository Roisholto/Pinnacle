<template>
    <storeLayout>
        <div class="py-2">
            <v-breadcrumbs class="white py-4 text-capitalize" v-bind:items="bread"/>
        </div>

        <template v-if="matched.length">
            <v-progress-linear color="primary" indeterminate :active="requesting" class="mb-2"/>
            <div class="grid-6-base-2">
                <single-item-card
                    v-for="(item) in idb_matched"
                    v-bind:item="item"
                    v-bind:key="item.id"
                    v-on:click="open_modal(item.code)"
                    /><!-- v-bind:item="inventoryItems[item]" v-on:click="open_modal(item)" -->
            </div>
            <template v-if="currentCode">
                <add-to-cart v-bind:productCode="currentCode" ref="theModal" />
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <div class="my-3">
                    <v-icon color="red" size="6.5rem">
                        mdi-basket-outline
                    </v-icon>
                </div>
                <h4>No items in this Category</h4>
            </div>
        </template>

    </storeLayout>
</template>
<script>
import * as siJs from '@/shopper.inventory.js'
import singleItemCard from '@/components/common/item/single-item-card.vue'
import { mapState } from 'vuex'
import addToCart from '../cart/add-to-cart.vue'
import storeLayout from '@/layouts/storeLayout.vue' ;
import SearchFilter from './SearchFilter.vue' ;
import Core from '@/class.core.js' ;
import {difference} from 'lodash' ;

export default {
  name: 'Category',
  props: {
    category: {
      required: true,
      type: String
    }
  },
  components: {
    singleItemCard,
    addToCart,
    storeLayout,
    SearchFilter
  },

  data: function () {
    return {
      currentCode: '',
      // sending server request
      requesting:false,
      // number of times server request sent ;
      fetchCount:0,
      // result from the fetch
      fetchResult:{
        inventory:[],
        record:{}
      },

      idb_matched:[]
    }
  },

  computed: {
    ...mapState({
      inventoryItems: function (state) {
        return state.merchant.inventory.items
      },
      filterClause:state=> state.merchant.filter.clause,
      filterData:state=>state.merchant.filter.data
    }),
    capitalized_category () {
      return this.category.toUpperCase()
    },
    matched: function () {
      return this.idb_matched.map(x => x.code)
    },
    bread(){
      return [
        {
        text: 'Store',
        link:true,
        disabled: false,
        exact:true,
        // href:this.$router.resolve({name:'store', params: this.$route.params}).href,
        to: { name: 'store', params:this.$router.params  }
        },
        /* {
                    text: 'Category',
                    to: { name: 'store-category', params:this.$router.params}
                }, */
        {
          text: this.category,
          disabled: false,
          link:true,
           exact: true,
          // href:'wirld',
         to: { name: 'store-category', params: this.category }
        }
      ]
    }
  },

  watch:{
    category(){
      this.query() ;
    },

    filterClause(nv){
      this.query() ;
    }
  },


  mounted: function () {
    this.query()
  },

  methods: {
    query(){
      // restart the whole process ;
      this.fetchCount = 0 ;
      this.fetchResult = {inventory:[], record:{}} ;
      this.get_matched()
      this.fetch_inv() ;
    },

    fetch_inv(){
      let query = this.category != 'all' ? [{ category: { data: [this.category], factor: 'equalto' } } ] : [];

      if(this.filterClause.length){
        let xp = this.query.length ? ['and', this.filterClause] : [this.filterClause] ;
        console.log('xp', xp)
        query.push(...xp)
      }


      let vm = this ;
      vm.requesting = true ;
      siJs.fetch_item_from_api(this.$route.params.storeid, query)
        .then(resp => {
          console.log('fetch ', resp)
          if(resp.inventory)
            {
            vm.fetchResult.inventory.push(...resp.inventory) ;
            vm.fetchResult.record = resp.record ;
            }
        })
       .catch(e => { console.log(e) })
       .finally(function(){
         vm.requesting = false
       })
    },

    get_matched: async function () {
      const vm = this
      let matched = []
      // load items that belong to the category ;
      let tb = Core.db_merchant.inventory ;
      let b = this.filterData.brands ;
      let t = this.filterData.tags ;

      tb = vm.capitalized_category != 'ALL' ?
        tb.where('category').equalsIgnoreCase(vm.capitalized_category)
        :
        tb.toCollection() ;

      tb = b.length && t.length ?
          tb.and(function(x){
            return b.indexOf(x.brand) > -1 ;
          })
          .and(function(x){
            return _.difference(x.tags, t).length > 0
          })
          : b.length && !t.length ?
            tb.and(function(x){
              return b.indexOf(x.brand) > -1 ;
            })
          : t.length && !b.length ?
            tb.and(function(x){
              return _.difference(x.tags, t).length > 0
            })
          :
          tb ;

      /*tb = b.length && t.length ?
          tb.where('brand').anyOfIgnoreCase(b).and('tags').anyOfIgnoreCase(t)
          : b.length && !t.length ?
          tb.where('brand').anyOfIgnoreCase(b)
          : t.length && !b.length ?
          tb.where('tags').anyOfIgnoreCase(t)
          :
          tb ;*/

      tb.distinct().toArray(x=>{
        vm.idb_matched = x ;
      }) ;

      // this.matched = matched ;
      // access the api for more data if there exists ;

      return matched
    },
    open_modal: function (code) {
      let vm = this
      this.currentCode = code ;
      this.$nextTick(function () {
        vm.$refs.theModal.modal_comp_open = true ;
      })
    }

  }
}

</script>
