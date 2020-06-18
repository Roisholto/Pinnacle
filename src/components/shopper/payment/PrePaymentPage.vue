<template>
  <storeLayout>
    <v-card class="mx-auto" width="600">
      <v-card-text>
        We generated an invoice for your order.
        Save the QrCode below to make your cash payment in-store.
        Alternatively <a class="primary--text" @click.prevent="show_payment_form = true">proceed</a> to pay online
        <InvoiceQr :data="invoice"/>
      </v-card-text>
      <v-dialog v-model="show_payment_form" max-width="35rem" centered body-class="pa-0">
          <v-card>
              <v-card-title>
                  <h3 class="headline">Make Payment</h3>
              </v-card-title>
              <v-divider class="my-0"></v-divider>
              <payment
                  v-bind:merchant="payment.merchantInfo"
                  v-bind:invoice="payment.invoiceInfo"
                  v-bind:user="payment.userInfo"
                  v-on:payment-complete="handle_payment_complete($event)"
              />
          </v-card>
      </v-dialog>
    </v-card>
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue' ;
import InvoiceQr from './invoice-qr.vue' ;
import Payment from './payment.vue' ;

export default {
  name:"PrePaymentPage",

  props:{
    invoice:{
      type:Object,
      required:true
    },
    payment:{
      type:Object,
      required: true
    }
  },

  data(){
    return {
      show_payment_form: false,
    }
  },

  components:{
    storeLayout,
    InvoiceQr,
    Payment
  },

  methods:{
    handle_payment_complete: function ($ev) {
      if ($ev.status == 'success') {
        // close the modal ;
        this.show_modal = false
      }
    },
  }

}
</script>
