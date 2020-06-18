<template>
    <div class="pt-3">
        <div class="d-flex justify-end">
            <v-btn tag="a"
                :download="data.ref"
                ref="download"
                :href="image_url"
                color="primary"
                style="border-width:2px"
                outlined
                small
                v-if="image_url">
                <v-icon>
                    mdi-download
                </v-icon>
                Save image
            </v-btn>

         <!-- <a href="javascript:;" ref="download"
              v-bind:class="save_as_styles.class"
              class="btn-sm"
              v-bind:style="save_as_styles.style">Save image
          </a>-->
      </div>

      <div class="" ref="paymentInfo">
          <div class="text-center">
              <div>
                  <v-icon  color="success" class="pa-3" size="4.5rem" style="transform: rotateY(0.5turn)">
                      mdi-thumb-up
                    </v-icon>
                </div>
              <div class="text-success"><small>Invoice Generated</small></div>
          </div>
          <payment-qrcode v-bind:code="data.ref" :invoiceId="data.invoice_id" :merchantId="data.mid"></payment-qrcode>
          <div class="text-center small">{{data.invoice_id}}</div>
      </div>
  </div>
</template>
<script>
import { cancel_classes, done_styles } from '../../common/more-radius-button.js'
import PaymentQrcode from './payment-qrcode.js'
import html2canvas from 'html2canvas'

// component shows up when shopper is done paying for items
// this component displays a qr code will be read by the scanner

// the props attr here is based on the response from the payment endpoint ;
// the value of *status* is always expected to be 'success' before this component is shown ;
// It is expected that the props have been validated ;
// displaying the payment reference and not the invoice id

export default{
  name:"InvoiceQr",
  props: {
    data: Object,

  },
  data: function () {
    return {
      // "data":{"ref":"ps-5fc2a598bb90","amount":2900,"invoice":"9cfa938e6439892d2fac8d04", mid:"9821982"},
      image_url:'',
    }
  },
  computed:{

  },
  components: {
    'payment-qrcode': PaymentQrcode
  },
  created: function () {
  },
  mounted: function () {
    let vm = this ;
    this.$nextTick()
      .then(function(){
      vm.store_as_image() ;
      })
  },
  methods: {
    trigger_download: function () {
    },
    store_as_image: function () {
      const vm = this
      html2canvas(vm.$refs.paymentInfo, {})
        .then(canvas => {
          // vm.$refs.appendChild(canvas) ;
          let link = vm.$refs.download
          // link.href = canvas.toDataURL()
          vm.image_url = canvas.toDataURL()
          // link.download = vm.data.ref
        })
        .catch(e => {
          console.log('Error generating ', e)
        })
    }
  }
}

</script>
