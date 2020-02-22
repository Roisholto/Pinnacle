<template>
    <div class="">
        <div class="d-flex py-2" ref="addressMenu">
            <a href="javascript:;" class="d-block" v-on:click="emitBackButton">
                <v-icon color="primary">
                    mdi-arrow-left
                </v-icon>
            </a>
        </div>
        <v-progress-linear indeterminate
            v-if="fetchingQuotation" />
        <LPicker v-on:input="locationInputEvent" v-bind="LPickerBinds" class="white" v-bind:style="LPickerStyle"/>
    </div>
</template>
<script>
import LPicker from '@/components/common/location-picker/LPicker.vue'
import ResizeSensor from 'resize-sensor'
import Core from '@/class.core.js'
import { API_ENDPOINT } from '@/constants.js'
let default_iso_code = 'NG' ;

export default {
  name: 'addressPicker',
  props:{
    sent_coords:Object
  },
  data: function () {
    return {
      fetchingQuotation: false,
      address_menu_height: '0px'
    }
  },

  computed: {
    heights: function () {
      return {
        'storeInfo': this.$store.getters['ui/heights']('storeInfoHeight'),
        'storeFooter': this.$store.getters['ui/heights']('storeFooterHeight'),
        'appHeader': this.$store.getters['ui/heights']('appHeaderHeight')
      }
    },
    LPickerStyle: function () {
      return { height: `calc(100vh - ${this.heights.storeInfo} - ${this.heights.storeFooter} - ${this.heights.appHeader} - ${this.address_menu_height} - 1rem)` }
    },
    location: {
      get: function () {
        console.log('getting location')
        return this.$store.state.merchant.cartExtras.delivery.info.location
      },
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_delivery_info', { location: n })
      }

    },

    LPickerBinds: function () {
        let c = this.location.coords.lat ? this.location.coords : { lat: 6.516875060149681, lng: 3.3896770439941974 } ;

      return {
        options: {
          map: { center: this.sent_coords /*this.location.coords.lat ? this.location.coords : { lat: 6.516875060149681, lng: 3.3896770439941974 }*/ },
          autocomplete: {componentRestrictions: {country: default_iso_code}}
        },
        value: c
      }
    }
  },

  watch: {
    'location.coords': function (nv) {
      this.getQuotation()
    }
  },

  components: {
    LPicker
  },

  mounted: function () {
    // this.form = Object.assign({},this.form, this.currentDeliveryInfo) ;
    this.resizeAddressMenu = new ResizeSensor(this.$refs.addressMenu, this.set_address_menu_height)
  },

  beforeDestroy: function () {
    this.resizeAddressMenu.detach()
  },

  methods: {
    emitBackButton: function () {
      if (!this.fetchingQuotation) {
        this.$emit('back-button-clicked')
      }
    },

    locationInputEvent: function ($ev) {
      this.location = $ev
    },

    getQuotation: function () {
      this.fetchingQuotation = true
      let url = `${API_ENDPOINT}/delivery/quotation/${Core.merchant}`
      let options = Core.set_fetch_headers({ destination: this.location }, { method: 'post' })
      const vm = this
      fetch(url, options)
        .then(function (resp) {
          return resp.json()
        })
        .then(function (json) {
          console.log('quotation', json)
          vm.$store.commit('merchant/cartExtras/update_quotation', json)
        })
        .catch(function (e) {
          console.log('error fetching quotation', e)
        })
        .finally(function () {
          vm.fetchingQuotation = false
        })
    },

    set_address_menu_height: function ($ev) {
      console.log('set address menu called')
      let $el = $(this.$refs.addressMenu)
      let rt = 0
      if ($el.length) {
        rt = $el.innerHeight()
      }
      this.address_menu_height = rt.toString() + 'px' // '40px'
      return rt
    }
  }
}
</script>
