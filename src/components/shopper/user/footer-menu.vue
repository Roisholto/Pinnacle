<template>
    <appBottomMenu>
        <singleBottomMenuItem>
            <router-link v-bind:to="storeLinkInfo.to">
                {{storeLinkInfo.text}}
            </router-link>
        </singleBottomMenuItem>
    </appBottomMenu>
</template>
<script>
import appBottomMenu from '../app-bottom-menu.vue'
import singleBottomMenuItem from '../single-bottom-menu-item.vue'

export default {
  name: 'footerMenu',
  data: function () {
    return {
      user_sidebar_id: ''
    }
  },
  components: {
    appBottomMenu,
    singleBottomMenuItem
  },
  computed: {
    merchantInfo: function () {
      return this.$store.state.merchant.info
    },
    cart_count: function () {
      return this.$store.getters['merchant/cart_length']
    },
    storeLinkInfo: function () {
      return (this.merchantInfo.mid) ? { text: 'Last store', to: { name: 'store', params: { storeid: this.merchantInfo.mid } } }
        : { text: 'Home', to: { path: '/' } }
    }
  }
}
</script>
