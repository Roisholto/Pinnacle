<template>
    <storeLayout>
        <div class="py-2">
            <v-breadcrumbs class="white py-4 text-capitalize" v-bind:items="bread"/>
        </div>
        <v-dialog
          v-model="gettingMatched"
          persistent
          width="300">
          <v-card
            color="primary"
            dark
          >
            <v-card-text class="text-center">
              Querying database, Please hold on.
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
        <template v-if="matched.length">
            <v-progress-linear color="primary" indeterminate :active="requesting" class="mb-2"/>
            <v-data-iterator
              :items="idb_matched"
              :items-per-page="100"
              item-key="code"
              :footer-props="{disableItemsPerPage:true}"
              @update:page="$vuetify.goTo(0)"
              >
              <template v-slot:default="{items}">
                <div class="grid-6-base-2">
                    <single-item-card
                        v-for="(item) in items"
                        v-bind:item="item"
                        v-bind:key="item.id"
                        v-on:click="open_modal(item.code)"
                        /><!-- v-bind:item="inventoryItems[item]" v-on:click="open_modal(item)" -->
                </div>
              </template>
            </v-data-iterator>
            <template v-if="currentCode">
                <add-to-cart v-bind:productCode="currentCode" ref="theModal" />
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <div class="my-3">
                    <v-icon color="red" class="animate__animated animate__swing" style="animation-duration:2s" size="6.5rem">
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
import {searchMenuIndex, getQualifyingCategorys} from './ProductCategory/category-stats.js' ;

export default {
  name: 'Category',
  props: {
    category: {
      required: true,
      type: String
    },
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

      // running query on idb ;
      gettingMatched: false,

      idb_matched:[]
    }
  },

  computed: {
    ...mapState({
      inventoryItems: function (state) {
        return state.merchant.inventory.items
      },
      filterClause:state=> state.merchant.filter.clause,
      filterData:state=>state.merchant.filter.data,
      categoryMenu:state=>state.merchant.pageComponents.menus.product_category,
      categorys:state=>state.merchant.inventory.categorys
    }),

    capitalized_category () {
      return this.category.trim().toUpperCase()
    },

    categoryAsArray(){
      return this.capitalized_category.split('|').filter(x=> x.length) ;
    },

    // Assume the current
    matchedCategory(){
      let vm = this ;
      let c = this.categorys.map( x=>{ return {id:x.id, name:x.name.toUpperCase()} })
        .filter(function(x){
          return x.name == vm.categoryAsArray[0] ;
        }) ;

      return c[0]  ;
    },

    matched: function () {
      return this.idb_matched.map(x => x.code)
    },

    bread(){
      let map = [] ;
      if(this.capitalized_category == 'ALL'){
        map = [
            {
              text:'ALL',
            }
          ]
        }
      else{
        map = this.mapCategoryToParent() ;
        map = map.map(function (x){
          let cats = getQualifyingCategorys(x).map(x=> x.name).join('|') ;
          return {
            text:x.name,
            exact:true,
            to:{
              name: 'store-category',
              params: {
                category:cats
              }
            }
          }
        }) ;
      }

      map.unshift({
        text: 'Store',
        exact:true,
        to: {
          name: 'store',
          params:this.$router.params
        }
      })

      return map ;
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
    this.query() ;
  },

  methods: {
    mapCategoryToParent(){
      if(this.categoryMenu.length && this.matchedCategory){
        if(this.capitalized_category != 'ALL')
          {
          let a = searchMenuIndex(this.categoryMenu,this.matchedCategory)

          return a
          }
      }


      return [] ;
    },
    query(){
      // restart the whole process ;
      this.fetchCount = 0 ;
      this.fetchResult = {inventory:[], record:{}} ;
      this.get_matched()
      this.fetch_inv() ;
    },

    fetch_inv(){
      let query = this.category != 'all' ? [{ category: { data: this.categoryAsArray, factor: 'equalto' } } ] : [];

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
      let matched = [] ;
      vm.gettingMatched = true ;
      // load items that belong to the category ;
      let tb = Core.db_merchant.inventory ;
      let b = this.filterData.brands ;
      let t = this.filterData.tags ;


      tb = vm.capitalized_category != 'ALL' ?
        tb.where('category').anyOfIgnoreCase(vm.categoryAsArray)
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
      })
      .catch(function(e){
        
      })
      .finally(function(){
        vm.gettingMatched = false
      })

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
