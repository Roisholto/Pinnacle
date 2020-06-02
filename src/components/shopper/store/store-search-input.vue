<template>
    <v-text-field
        autofocus
        :solo-inverted="false"
        :solo="true"
        :dense="true"
        hide-details
        height="40px"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        :value="searchText"
        @input="searchInputEvent"
        placeholder="Search items . . ."
        :loading="loading"
        clearable
        >
    </v-text-field>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'StoreSearchInput',

  props: {
    loading:Boolean,

  },

  components: {

  },
  computed: {
    ...mapState({
      merchantInfo: state => state.merchant.info,
      searchText: state => state.merchant.search.search_text
    }),
    breakpoint(){
      return this.$vuetify.breakpoint ;
    },
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
