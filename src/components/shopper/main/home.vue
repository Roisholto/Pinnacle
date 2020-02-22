<!--
<div class="d-flex align-center" style="height:calc(100vh - 80px)">
            <div class="text-center w-100">
                Locate a place to shop with convinience
            </div>
        </div>
-->
<template>
    <homeLayout>
        <div class="align-self-start" style="width:100%">
            <!--store search result-->
            <div class="w-100 text-center small my-1" v-bind:class="[requesting ? 'visible' : 'invisible']"><loadBar /></div>
            <div class="text-center font-weight-bold" v-if="!stores.length && !requesting">
                We could not find any outlet nearby
            </div>
            <div class="grid-4" v-else>
                <storeLevel1 class="mb-2"
                    v-for="(store,index) in stores"
                    v-on:body-clicked="goto_store(store.m_id)"
                    v-bind:store="store.info"
                    v-bind:displayMode="'grid'"
                    v-bind:key="index" >
                    <!--<div class="py-2 small" slot="action-footer">
                        Description here
                    </div>-->
                </storeLevel1>
            </div>
        </div>
    </homeLayout>
</template>
<script>
import { mapState } from 'vuex'
import debounce from 'lodash'
import { API_ENDPOINT, INSTALL_MODE } from '@/constants.js'
import storeLevel1 from '@/components/common/store/store-level-1.vue'
import loadBar from '@/components/common/css-loaders/load-bar.vue'
import homeLayout from '@/layouts/homeLayout.vue'

export default {
  name: 'home',
  data: function () {
    return {
      requesting: false,
      stores: [],
      record: {},
      INSTALL_MODE
    }
  },

  computed: {
    ...mapState({
      'location': (state) => state.user.currentLocation.coords
    })
  },

  created: function () {
    this.debounced_m_search = _.debounce(this.fetch_result, 2000)
  },

  components: {
    homeLayout,
    storeLevel1,
    loadBar
  },


  mounted: function () {
    this.fetch_result()
  },
  methods: {
    fetch_result () {
      // Dont think this block is necessary
      const vm = this
      if (vm.requesting) {
        return
      }

      let url = API_ENDPOINT + '/search/outlets?search_text='
      if (Object.keys(this.location).length && INSTALL_MODE == 'standard') {
        url += `&location=${this.location.lat},${this.location.lng}`
      }

      vm.requesting = true
      fetch(url)
        .then(function (resp) {
          return resp.json()
        })
        .then(function (json) {
          if (json.succ) {
            vm.stores = json.data.items
            vm.record = json.data.record

          } else {
            // console.log('failure resp', json)
          }
        })
        .catch(function () {

        })
        .finally(function () {
          vm.requesting = false
        })
    },
    goto_store: function (ev) {
      console.log('part clicked', ev)
      this.$router.push({ name: 'store', params: { storeid: ev } })
    }
  }

}
</script>
