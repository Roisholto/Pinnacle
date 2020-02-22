<template>
    <v-bottom-navigation
        app
        fixed
        grow
        ref="footer"
        class=""
        color="primary"
        >
        <v-btn exact :to="{name: 'store'}"
            class="">
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn exact :to="{name: 'cart'}" class="">
            <span>Cart</span>
            <v-badge color="red darken-2">
              <template slot="badge">{{cart_count}}</template>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
        </v-btn>

        <v-btn exact :to="{name: 'merchant-profile'}" class="">
            <span>Profile</span>
            <v-icon>mdi-information</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>
<script>
import ResizeSensor from 'resize-sensor'
import Vue from 'vue' ;

export default {
  name: 'storeFooter',
  data: function () {
    return {
      user_sidebar_id: ''
    }
  },
  computed: {
    cart_count: function () {
      return this.$store.getters['merchant/cart_length']
    }

  },
  components: {

  },
  mounted: function () {
    let vm = this ;
    Vue.nextTick()
        .then(function(){
            vm.resizeFooter = new ResizeSensor(vm.$refs.footer.$el, vm.set_store_footer_height)
        })

  },
  beforeDestroy: function () {
    this.resizeFooter.detach()
  },
  methods: {
    set_store_footer_height: function ($ev) {
      let $el = $(this.$refs.footer.$el)
      let rt = 0
      if ($el.length) {
        rt = $el.innerHeight()
      }

      this.$store.commit('ui/update_info', ['storeFooterHeight', rt])
      return rt
    }
  }

}

</script>
