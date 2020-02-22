<template>
    <v-dialog ref="modal" centered   modal-class="border-0" v-on:shown="modal_shown" v-on:hidden="modal_hidden" v-on:okay="">
        
        <location-picker v-bind:current_location="current_location" v-on:location-changed="location_changed($event)" v-on:address-change="address_changed"/>
        <div class="text-right" slot="modal-footer">
            <cancel-button class="bg-light mr-2 btn-sm py-1" v-on:click.prevent.stop="">Cancel</cancel-button>
            <done-button class="btn-sm py-1 btn-primary" v-on:click.prevent.stop="location_selected">Done</done-button>
        </div>

    </v-dialog>
</template>
<script>
import LocationPicker from './location-picker.vue'
import { cancel, done } from '../common/more-radius-button.js'

export default {
  name: 'locationPickerView',
  props: ['open', 'current_location'],
  data: function () {
    return {
      env: process.env.NODE_ENV,
      location: {},
      address: '', // input from address bar ;
      address2: ''
    }
  },
  components: {
    'cancel-button': cancel,
    'done-button': done,
    LocationPicker
  },
  computed: {
    openmodal: function () {
      if (this.open) { return true }
      return false
    }
  },
  watch: {
    openmodal: function (nv) {
      if (nv) { this.$refs.modal.show() } else {
        this.$refs.modal.hide()
      }
    }
  },
  beforemount: function () {
    console.log('mounted location picker', this)
    const vm = this
  },

  methods:
        {
          cancel_picker: function () {
            // close modal
          },
          modal_shown: function () {
            // this.open = true ;
            this.$emit('modal-shown')
          },
          modal_hidden: function () {
            // this.open = false ;
            this.$emit('modal-hidden')
          },
          resize_map: function ($ev) {
            $($ev).locationpicker('autosize')
          },
          location_changed: function (location) {
            this.location = location
          },
          address_changed: function (address) {
            // since sometimes address changes without triggering a location-change
            console.log('address', address)
            this.address2 = address
          },
          location_selected: function () {
            // run the location to the delivery service ; get quotation for delivery ;
            let loc = this.location
            loc.address2 = this.address2
            console.log('')
            // let body = {origin:loc,destination:store_loc, service_id:'e6f9a0b7-8f03-431f-a3da-7fbc914bbb72'} ;
            // console.log(this)
            this.$emit('location-selected', loc)
            // the parent should listen to location-selected event and then close the modal ;
            // this.$refs.modal.hide();
            // close the modal ;
          }
        }
}
</script>
