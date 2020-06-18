<template>
    <StoreSearchLayout @back="" :requesting="requesting">
        <div class="px-2 white">
            <div class="" v-for="(item, index) in orderedMatchItems" v-bind:key="item.code">
                <a href="javascript:;" v-on:click="open_modal(item.code)" class="d-flex black--text py-3">
                    <div class="col-9 px-0">
                        <single-item  v-bind:item="item" v-bind:mode="'search-store'"></single-item>
                    </div>
                    <div class="col-3 px-0 text-right align-self-center">
                        <span class="body-2">{{to_currency(item.rate[0].price)}}</span>
                    </div>
                </a>
                <v-divider inset/>
            </div>

            <template v-if="currentCode">
                <add-to-cart v-bind:productCode="currentCode" ref="theModal" />
            </template>
        </div>
    </StoreSearchLayout>
</template>
<script>

import debounce from 'lodash'
import { fetch_item_from_api } from '@/shopper.inventory.js'
import Core from '@/class.core.js'
import { mapState } from 'vuex'
import addToCart from '@/components/shopper/cart/add-to-cart.vue'
import { naija_currency } from '@/functions/to_currency.js'
import singleItem from '@/components/common/item/single-item.vue'
import StoreSearchLayout from '@/layouts/StoreSearchLayout.vue' ;


export default  {
  name: 'StoreMainSearch',
  data: function () {
    return {
      currentCode: '',
      requesting: false
    }
  },
  watch: {
    searchText: function (nv) {
      this.debounced_m_search(nv)
    }
  },
  computed:
        {
          match: function () {
            return this.match_merchant_inventory_search(this.searchText)
          },
          orderedMatchItems(){
            let a = [] ;
            let vm = this
            this.match.forEach(function(v){
              a.push(vm.allItems[v])
            }) ;

            a.sort(function(a, b){
              var nameA = a.name.toUpperCase(); // ignore upper and lowercase
              var nameB = b.name.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            }) ;

            return a ;
          },
          ...mapState({
            searchText: state => state.merchant.search.search_text,
            allItems: state => state.merchant.inventory.items
          })
        },
  components: {
    addToCart,
    singleItem,
    StoreSearchLayout,

  },

  created: function () {
    // do the search
    this.debounced_m_search = _.debounce(this.merchant_search_items, 2000)
  },
  mounted: function () {
    if (this.$route.query.word) { this.$store.dispatch('merchant/update_search_string', this.$route.query.word) }
  },
  methods: {
      searchInputEvent: function (nv) {
         this.$store.dispatch('merchant/update_search_string', nv)
      },
    to_currency (c) {
      return naija_currency(c)
    },
    open_modal: function (code) {
      let vm = this
      this.currentCode = code,
      this.$nextTick(function () {
        vm.$refs.theModal.modal_comp_open = true
      })
    },
    merchant_search_items: function (word) {
      // search  through inventory of current merchant ;
      // ordinarily we should check the indexeddb for records before checking the api_endpoint ;
      let val = word ? word.trim() : '' ;
      if (val.trim().length < 3) { return false }

      // console.log('checking api ')
      const vm = this
      let clause = [
        { name: { data: ['%' + val + '%'], factor: 'like' } },
        'or',
        { code: { data: ['%' + val + '%'], factor: 'like' } }
      ]
      vm.requesting = true ;
      fetch_item_from_api(Core.merchant, clause)
        .then(resp => {
          console.log('done fetching item from api', 'will match ')
          // this.match_merchant_inventory_search(val) ;
        })
        .catch(e => {
          console.log('Error found on fetch item from api', e)
        })
        .finally(()=>{
          vm.requesting = false ;
        })
    },
    // match merchant items with search text ;
    match_merchant_inventory_search: function (val) {
      let word = val ? val.toLowerCase() : '' ;
      let matched = []; let vm = this
      if (word == '') { matched = Object.keys(this.allItems) } else {
        Object.keys(vm.allItems).forEach(function (v, k) {
          if (vm.allItems[v].name.toString().toLowerCase().indexOf(word) != -1 || vm.allItems[v].code.toString().toLowerCase().indexOf(word) != -1) { matched.push(v) }
        })
      }
      return matched
    }
  }

}

</script>
