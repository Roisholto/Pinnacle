<template>
    <div class="d-flex flex-column align-center py-2 mb-1">

      <div class="my-2" style="width:100%">
          <v-text-field
              ref="otp"
              v-model="otp"
              placeholder="123456"
              label="OTP"
              hint="Enter OTP here, this is required to complete your payment"
              required
              autocomplete="off"
              required>
          </v-text-field>
      </div>

      <div class="d-flex justify-content-end" style="width:100%">
          <v-btn type="submit" color="primary" :loading="processing" v-on:click.stop="send_otp">
              Send OTP
          </v-btn>
      </div>
  </div>
</template>
<script>
import Core from '@/class.core.js'
import { API_ENDPOINT } from '@/constants.js'

export default {
    name:"Otp",
  props: ['data', 'inputs'],
  data: function () {
    return {
      otp: '',
      processing:false
    }
  },
  components: {
    // doneButton: done
  },
  mounted: function () {

  },
  methods: {
    send_otp: function () {
      let vm = this
      console.log('will send otp')
      if ('reference' in this.data) {
        let url = API_ENDPOINT + '/payment/shopper/reinit/otp'
        let options = Core.set_fetch_headers(
          { otp: this.otp, reference: this.data.reference },
          { method: 'POST' })
        Core.go_fetch(url, options)
          .then(resp => {
            vm.$emit('card-response', resp)
          })
          .catch(e => { console.log('error found', e) })
      } else {
        console.log()
      }
    }
  }
}
</script>
