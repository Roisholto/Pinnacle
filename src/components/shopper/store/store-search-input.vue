<template>

    <search-input ref="searchBox" v-bind:defValue="searchText" v-on:input="searchInputEvent" v-on:focusin="searchFocusedEvent" v-bind:where="'store'"/>

</template>
<script>
import searchInput from '@/components/shopper/search-input'
import { mapState } from 'vuex'

export default {
  name: 'storeSearchInput',
  components: {
    searchInput
  },
  computed: {
    ...mapState({
      merchantInfo: state => state.merchant.info,
      searchText: state => state.merchant.search.search_text
    })
  },
  mounted: function () {
    // $(this.$refs.searchBox.$el).find('input').val('hello') ;
  },
  methods: {
    searchInputEvent: function (nv) {
      this.$store.dispatch('merchant/update_search_string', nv)
    },
    searchFocusedEvent: function () {
      // let  '/store/'+ this.$route.params.storeid+'/search' ;
      this.$router.push({ name: 'store-search', params: { storeid: this.merchantInfo.mid } })
    }
  }
}
</script>
