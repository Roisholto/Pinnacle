<template>
    <div>
        <div class="w-100 text-center small my-1" v-bind:class="[requesting ? 'visible' : 'invisible']"><loadBar /></div>
        <div class="text-center font-weight-bold" v-if="!items.length && !requesting">
            No result found
        </div>
        <div class="card my-2" v-for="(item,index) in items" v-bind:key="item.rid" v-else>
            <div class="card-body py-2 px-3">
                <router-link v-bind:to="{name:'store-search', params:{storeid:item.merchant.mid},query:{word:lastSearchText}}">
                    <single-item v-bind:item="item.item" v-bind:mode="'search-main'">
                        <div class="text-dark small">{{item.item.count}} matched items in store</div>
                    </single-item>
                </router-link>
                <hr class="my-2">
                <router-link v-bind:to="{name:'store', params:{storeid:item.merchant.mid}}">
                    <store-level-1 class="flex-row-reverse"
                        v-bind:store="item.merchant"
                        v-bind:options="{showMenu:false, showType:false}"></store-level-1>
                </router-link>
                <!--<div class="py-2 small" slot="action-footer">
                    Description here
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
import singleItem from '@/components/common/item/single-item.vue'
import { mapState } from 'vuex'
import debounce from 'lodash'
import { API_ENDPOINT } from '@/constants.js'
import storeLevel1 from '@/components/common/store/store-level-1.vue'
import loadBar from '@/components/common/css-loaders/load-bar.vue'
export default {
  name: 'mainSearchItems',
  props: ['item'],
  data: function () {
    return {
      requesting: false
    }
  },
  computed: {
    ...mapState({
      'searchText': (state) => state.search.search_text,
      'lastSearchText': (state) => state.search.items.search_text,
      'items': (state) => {
        let t = state.search.items.items
        // console.log('t', t) ;
        return t
      }
    })
  },
  watch: {
    searchText: function (nv) {
      this.debounced_m_search()
    }
  },
  components: {
    singleItem,
    storeLevel1,
    loadBar
  },
  created: function () {
    this.debounced_m_search = _.debounce(this.fetch_result, 2000)
  },
  mounted: function () {
    if (this.searchText != this.lastSearchText) {
      this.fetch_result()
    }
  },
  methods: {
    fetch_result () {
      // Dont think this block is necessary
      const vm = this
      if (vm.requesting) {
        console.log('request processing, will quit')
        return
      }

      if (this.searchText.trim().length > 2) {
        console.log('will search for items')
        let curr_text = this.searchText
        let url = API_ENDPOINT + '/search/items?search_text=' + curr_text

        vm.requesting = true
        fetch(url)
          .then(function (resp) {
            return resp.json()
          })
          .then(function (json) {
            if (json.succ) {
              console.log('succ resp')
              vm.$store.commit('search/update_items', Object.assign({ search_text: curr_text, section: 'items' }, json.data))
            } else {
              console.log('failure resp', json)
            }
          })
          .catch(function () {

          })
          .finally(function () {
            vm.requesting = false
          })
      }
    }
  }
}
</script>
