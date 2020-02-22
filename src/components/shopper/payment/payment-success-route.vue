<template>
    <backPageLayout :to="{name:'store', params:{storeid:$route.params.storeid}}" :prioritizeTo="true">
        <payment-succ :data="data" />
    </backPageLayout>
</template>
<script>
import backPageLayout from '@/layouts/backPageLayout.vue'
import PaymentSuccComp from './payment-success.vue'
import {mapState} from 'vuex'
// component shows up when shopper is done paying for items
// this component displays a qr code will be read by the scanner

// the props attr here is based on the response from the payment endpoint ;
// the value of *status* is always expected to be 'success' before this component is shown ;
// It is expected that the props have been validated ;
// displaying the payment reference and not the invoice id

export default {
    name:"PaymentSuccRoute",
    props: {
        status: String,
        data: Object,// "data":{"ref":"ps-5fc2a598bb90","amount":2900,"invoice":"9cfa938e6439892d2fac8d04"},
        },
  components: {
    'payment-succ':PaymentSuccComp,
    backPageLayout
    // 'save-button':saveAs
  },
  created: function () {
  },
  mounted: function () {

  },
  methods: {
    
  }
}
</script>
