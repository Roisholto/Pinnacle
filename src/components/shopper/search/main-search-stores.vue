<template>
    <div>
        <!--store search result-->
        <div class="w-100 text-center small my-1" v-bind:class="[requesting ? 'visible' : 'invisible']"><loadBar /></div>
        <div class="text-center font-weight-bold" v-if="!stores.length && !requesting">
            No result found
        </div>
        <store class="mb-2"
            v-for="(store,index) in stores"
            v-on:goto-store="goto_store"
            v-bind:store="store.info"
            v-bind:mode="'list'"
            v-bind:key="index" v-else>
            <!--<div class="py-2 small" slot="action-footer">
                Description here
            </div>-->
        </store>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import debounce from 'lodash'
import { API_ENDPOINT } from '@/constants.js'
import store from '@/components/common/store/store.vue'
import loadBar from '@/components/common/css-loaders/load-bar.vue'

export default {
  name: 'mainSearchStores',
  data: function () {
    return {
      requesting: false
    }
  },
  computed: {
    ...mapState({
      'searchText': (state) => state.search.search_text,
      'lastSearchText': (state) => state.search.stores.search_text,
      'stores': (state) => {
        let t = state.search.stores.items
        // console.log('t', t) ;
        return t
      },
      'location': (state) => state.user.currentLocation.coords
    })
  },
  watch: {
    searchText: function (nv) {
      this.debounced_m_search()
    }
  },
  created: function () {
    this.debounced_m_search = _.debounce(this.fetch_result, 2000)
  },
  components: {
    store,
    loadBar
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
        return
      }

      if (this.searchText.trim().length > 2) {
        let curr_text = this.searchText
        let url = API_ENDPOINT + '/search/outlets?search_text=' + curr_text
        if (Object.keys(this.location).length) {
          url += `&location=${this.location.lat},${this.location.lng}`
        }

        vm.requesting = true
        fetch(url)
          .then(function (resp) {
            return resp.json()
          })
          .then(function (json) {
            if (json.succ) {
              vm.$store.commit('search/update_items', Object.assign({ search_text: curr_text, section: 'stores' }, json.data))
            } else {
              // console.log('failure resp', json)
            }
          })
          .catch(function () {

          })
          .finally(function () {
            vm.requesting = false
          })
      }
    },
    goto_store: function (ev) {
      this.$router.push({ name: 'store', params: { storeid: ev } })
    }
  }

}
</script>
