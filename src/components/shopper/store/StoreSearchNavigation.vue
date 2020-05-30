<template>
  <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
      :color="breakpoint.xs? 'primary': '' "
      @focus="searchFocusedEvent"
      placeholder="Search items . . ."
      v-if="!icon"
      >
  </v-text-field>
  <v-btn class="hidden-md-and-up"
    @click.stop="searchFocusedEvent"
    :color="!breakpoint.xs? 'white' : 'white'"
    :dark="!breakpoint.xs"
    icon
    v-else
    >
      <v-icon class="">mdi-magnify</v-icon>
  </v-btn>
</template>
<script>
import {mapState} from 'vuex' ;

export default{
  name:"StoreSearchNavigation",
  props:{
    icon:{
      type:Boolean,
      required:true,
      default:()=>false
    }
  },
  data(){
    return {

    }
  },

  computed:{
    ...mapState({
      merchantInfo: state => state.merchant.info
    }),

    breakpoint(){
      return this.$vuetify.breakpoint ;
    }
  },

  methods:{
    searchFocusedEvent: function () {
      // let  '/store/'+ this.$route.params.storeid+'/search' ;
      this.$router.push({ name: 'store-search', params: { storeid: this.merchantInfo.mid } })
    },
  }
}
</script>
