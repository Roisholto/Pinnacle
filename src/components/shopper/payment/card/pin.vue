<template>
    <form v-on:submit.prevent="send_pin">
        <div class="d-flex flex-column py-2 mb-1">
          <div class="my-2">
              <v-text-field
                  v-model="pin"
                  ref="pin"
                  placeholder="1234"
                  type="password"
                  label="Pin"
                  hint="Enter your pin here, this is required to complete your payment"
                  required
                  autocomplete="off"
                  required>
              </v-text-field>
          </div>
          <div class="d-flex justify-content-end ">
              <v-btn type="submit" color="primary" :loading="processing">
                  Send Pin
              </v-btn>
          </div>
      </div>
  </form>
</template>
<script>
import Core from '@/class.core.js'
import { API_ENDPOINT } from '@/constants.js'

// window.jQuery = jQuery ;
export default {
  name:"Pin",
  props: ['data', 'inputs'], // {input:{}, status:'', data:{}}
  data: function () {
    return {
      pin: '',
      processing:false
    }
  },
  mounted: function () {
    const vm = this
    /*$(vm.$refs.pin).pincodeInput({
      inputs: 4,
      hideDigits: true,
      change: function (input, value, inputnumber) {
        console.log(input.value)

        console.log($(vm.$refs.pin).val())
      },
      complete: function (value) {
        console.log('complete')
        vm.pin = value
        vm.send_pin()
      }
  }) */
  },
  methods: {
    send_pin: function () {
        const vm = this
        if ('reference' in this.data)
            {
            let url = API_ENDPOINT + '/payment/shopper/reinit/pin'
            let options = Core.set_fetch_headers(
                {
                pin: this.pin,
                reference: this.data.reference
                },
                { method: 'POST' })
            vm.processing = true  ;
            Core.go_fetch(url, options)
                .then(function(resp){
                    vm.$emit('card-response', resp)
                    })
                .catch(function(e){
                    console.log('error found', e)
                    })
                .finally(function(){
                    vm.processing = false ;
                    })
            }
        else
            {
            // send input with key
            console.log('ref not found');
            }
        }
    }
}

</script>
