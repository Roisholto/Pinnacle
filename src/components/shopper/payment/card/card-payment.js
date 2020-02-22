import CardInfo from './card-info.vue'
import jQuery from 'jquery'
import '@/assets/js/modules/custompincodeinput/js/bootstrap-pincode-input.js'
import '@/assets/js/modules/custompincodeinput/css/bootstrap-pincode-input.css'
import Core from '@/class.core.js'
import { done } from '@/components/common/more-radius-button.js'
import { API_ENDPOINT } from '@/constants.js'
import Pin from './pin.vue'
import Otp from './otp.vue'

export const Card = {
  props: ['invoice', 'userinfo'],
  data: function () {
    return {
      view: 'card',
      notice: {
        show: false,
        info: '',
        state: false

      },
      compProps: {

      }
    }
  },
  computed: {

    the_props: function () {
      if (this.view == 'card') {
        return this.$props
      } else {
        return this.compProps
      }
    },
    notice_classes: function () {
      return {
        'alert-danger': this.notice.state == 'red ',
        'alert-success': this.notice.state == 'green '
      }
    }

  },
  components: {
    'card': CardInfo,
    'pin': Pin,
    'otp': Otp

  },
  template: `<div>
                <div v-bind:class="notice_classes" class="alert py-2 body-2 red--text" role="alert" v-if="notice.show">
                    {{notice.info}}
                </div>
                <component v-bind:is="view" v-bind="the_props" v-on:card-response="handle_card_response($event)"/>
            </div>`,
  mounted: function () {
    const vm = this
    if (this.userinfo == undefined || !this.userinfo.signedin) {

    }
  },
  methods: {
    handle_card_response: function (resp) {
      const vm = this
      // payment completed ;
      if ('error' in resp) {
        vm.notice.show = true
        vm.notice.state = 'error'
        vm.notice.info = resp.description
      } else {
        switch (resp.status) {
          case 'success' :
            // emit payment complete-event ;
            // switch to the payment success component ;
            return vm.$emit('payment-complete', resp)
            break
          case 'send_pin':
            // switch the
            vm.compProps = resp
            vm.view = 'pin'
            vm.notice = { show: false, 'info': '', state: '' }

            break
          case 'send_otp' :
            vm.compProps = resp
            vm.view = 'otp'
            vm.notice = { show: false, 'info': '', state: '' }
            break
          case 'open_url':
            window.open(resp.data.url, '_blank')
            break
          case 'pending':
            vm.notice = { show: true, 'info': 'charge attempted, pending.', state: 'error' }
          case 'timed_out':
            vm.notice = { show: true, 'info': 'Timed out', state: 'error' }
            break
          case 'failed':
            vm.notice.show = true
            vm.notice.state = 'error'
            vm.notice.info = resp.data.message
            break
        }
      }
    }
  }

}

export default Card
