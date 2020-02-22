<template>
    <div>
        <template v-if="curr_view=='email'">
            <email v-bind:value="input.email" v-bind:amount="invoice.amount" v-on:email-valid="email_valid($event)"/>
        </template>

        <template v-else>
            <div class="d-flex flex-column">
                <div v-if="ENV!='production'" class="alert alert-primary py-1 small px-sm-0"> <!-- environment is test-->
                    Check out <a href="https://developers.paystack.co/docs/test-cards" target="_blank"> https://developers.paystack.co/docs/test-cards</a> for test cards
                </div>
                <!--<button v-on:click="recognizeCard">Scan atm card</button>
                <img src="/assets/img/WIN_20190705_09_48_44_Pro(2).jpg" class="d-none" ref="scanImg"/>-->
                <form v-on:submit.prevent="submit_card($event)">
                    <div class="py-2 mb-1">
                        <v-text-field
                            v-model="input.number"
                            label="Card Number"
                            v-payment:formatCardNumber
                            placeholder="0000 0000 0000 0000"
                            required>
                            <div class="grey--text text--darken-1" slot="append"><i :class="card_icon"></i></div>
                        </v-text-field>
                        <span class="small text-danger" v-show="!validate.card && validate.validated">invalid input</span>
                    </div>
                    <div class="py-2 mb-1 d-flex">
                        <div class="pl-0 pr-2" style="width:50%">
                            <v-text-field
                                v-model="input.expiry"
                                label="Expiry"
                                placeholder="MM/YY"
                                v-payment:formatCardExpiry
                                required>
                            </v-text-field>
                            <span class="small text-danger" v-show="!validate.expiry && validate.validated">invalid expiry</span>
                        </div>
                        <div class="pl-2 pr-0" style="width:50%">
                            <v-text-field
                                v-model="input.cvv"
                                placeholder="123"
                                label="CVV"
                                v-payment:formatCardCVC
                                required
                                autocomplete="off"
                                required>
                            </v-text-field>
                            <span class="small text-danger" v-show="!validate.cvv && validate.validated">invalid cvv</span>
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="d-flex justify-content-end ">
                            <v-btn type="submit" block color="primary" v-bind:disabled="requesting" :loading="requesting">
                                {{button_text}}
                            </v-btn>
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </div>
</template>
<script>
import Core from '@/class.core.js'
import Email from './email.vue'
import { naija_currency } from '@/functions/to_currency.js'
import VueCardFormat from 'vue-credit-card-validation'
import VueStripePayment from 'vue-stripe-payment'
import Vue from 'vue'
import { PUBLIC_PATH } from '@/constants.js'
import {email as mail_validation} from '@/functions/rules.js' ;

Vue.use(VueCardFormat)
Vue.use(VueStripePayment)

// import Tesseract from 'tesseract.js';

// const { TesseractWorker } = Tesseract;
// const worker = new TesseractWorker();
/* worker.create({
  workerPath: '/assets/lib/tesseract.js-worker_1.0.10.js',
  langPath: '/assets/lib/lang/tesseract.js-',
  corePath: '/assets/lib/tesseract.js-core_0.1.0.js',
}); */

export default {
  name: 'CardInfo',
  props: ['invoice', 'userinfo'],
  data: function () {
    return {
      card: {},
      ENV: process.env.NODE_ENV,
      input: {
        number: '',
        expiry: '',
        cvv: '',
        email: ''
      },
      validate: {
        card: false,
        cvv: false,
        expiry: false,
        // has it been validated at least once
        validated: false
      },
      curr_view: '',
      requesting: false // if request is sent to server ;
    }
  },
  computed: {
    card_type: function () {
      return this.$payment.cardType(this.input.number)
    },
    card_icon: function () {
      let a = {
        visa: 'fab fa-cc-visa',
        mastercard: 'fab fa-cc-mastercard',
        null: 'fa-credit-card fa'
      }
      return a[this.card_type]
    },
    button_text: function () {
      let x = this.requesting ? 'Processing . . .' : 'Pay ' + naija_currency(this.invoice.amount)
      return x
    }

  },
  components: {
    'email': Email
  },
  mounted: function () {
    const vm = this
    if (!this.userinfo.signedin)
        {
        this.input.email = this.userinfo.email ;
        // if the email address is valid don't show the email component again ;
        let validate = mail_validation(this.input.email)
        if(typeof validate != 'boolean' || !validate)
            this.curr_view = 'email'
        }
  },
  methods: {
    /* recognizeCard:function(){
            const img = this.$refs.scanImg;
            console.log(img);
            worker
                .recognize(img)
                .progress(message => console.log(' tesse :',message))
                .then(result => {
                  console.log(result);
                })
                .finally()

            }, */
    validate_inputs: function () {
      this.validate.card = this.$payment.validateCardNumber(this.input.number)
      this.validate.expiry = this.$payment.validateCardExpiry(this.$payment.cardExpiryVal(this.input.expiry))
      this.validate.cvv = this.$payment.validateCardCVC(this.input.cvv)

      this.validate.validated = true
      return this.validate.card && this.validate.expiry && this.validate.cvv
    },
    submit_card: function () {
      if (!this.validate_inputs()) { return false }

      const vm = this
      // validate card inputs then send to payment endpoint
      let url = Core.API_ENDPOINT + '/payment/shopper/init/card/' + Core.merchantid
      const input = Object.assign({}, this.input)
      input.number = input.number.replace(/ /g, '')
      input.expiry = input.expiry.replace(/ /g, '')

      console.log('input ', input.number)
      delete input.email
      let options = Core.set_fetch_headers({
        'card': input,
        'invoice': this.invoice,
        'info': { email: this.input.email }
      },
      { method: 'POST' })

      console.log('options ', options)
      this.requesting = true
      fetch(url, options)
        .then(function (resp) {
          return resp.json()
        })
        .then(function (json) {
          console.log(json)
          vm.$emit('card-response', json)
        })
        .catch(function (e) {
          console.log(e)
        })
        .finally(function () {
          vm.requesting = false
        })
    },

    email_valid: function (email) {
      this.input.email = email
      this.curr_view = ''
    }
  }
}

</script>
