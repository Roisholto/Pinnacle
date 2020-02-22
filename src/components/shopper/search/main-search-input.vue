<template>
    <search-input v-on:input="searchInputEvent" v-on:focusin="searchFocusedEvent" v-bind:where="'main'" v-bind:defValue="searchText"/>
</template>
<script>
import searchInput from '@/components/shopper/search-input'
import { PUBLIC_PATH } from '@/constants.js'

export default {
  name: 'storeSearchInput',
  components: {
    searchInput
  },
  computed: {
    searchText: function () {
      return this.$store.state.search.search_text
    }
  },
  methods: {
    searchInputEvent: function (nv) {
      this.$store.dispatch('search/update_search', nv)
    },
    searchFocusedEvent: function () {
      if (!this.$route.path.indexOf('/search') == 0) // =0
      { this.$router.push({ path: '/search/stores' }) }
    }
  }
}
</script>
