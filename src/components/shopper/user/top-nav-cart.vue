/*
* if in store show cart at the bottom
* if not in store but has been to a store, show cart in top nav

* Please note that the choice of placing this file is due to the fact that this
* component is more related to navigating back to the store provided a user
* had visited a store before and navigated away

to be used only at the top nav
*/
<template>
    <v-btn title="Back to last store" class="" :to="{name:'store', params:{storeid:mid}}" v-show="!in_store && mid" icon>
        <v-icon>
            mdi-storefront
        </v-icon>
        <div class="red darken-2 position-absolute rounded-circle small
                    white--text  the-total
                    d-flex align-center justify-center"
            style="top: -10px; right:0px ;width: 24px; height: 24px;">
            <span class="small d-inline-block text-truncate text" v-if="cart_count < 9">
                {{cart_count}}
            </span>
            <span class="" v-else>
                9<sup>+</sup>
            </span>
        </div>
    </v-btn>
</template>
<script>
import mapState from 'vuex'

export default {
  name: 'topNavCart',
  computed: {
    in_store: function () {
      // set current merchant ;
      let the_route = this.$route.path.split('/')
      let the_merchant = ''
      if (the_route.indexOf('store') == 1) {
        the_merchant = the_route[2] // this.$route.params['storeid']
      }

      // this.current_merchant = the_merchant ;
      return the_merchant
    },
    mid: function () {
      return this.$store.state.merchant.info.mid
    },
    cart_count: function () {
        return this.$store.getters['merchant/cart_length']
    }
  }
}
</script>
