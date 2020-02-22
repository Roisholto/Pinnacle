<template>
    <div>
      <div  class="remove-last-border" v-if=" transactions.length" >
          <single-transaction class="border-bottom" v-bind:transaction="item" v-for="item in transactions" v-bind:key="item.ref">
              <div class="">
                  <a href="javascript:;" v-on:click.prevent="get_qr(item)">getQr</a>
              </div>
          </single-transaction>
          <v-dialog v-model="showModal" max-width="30rem" ref="the_modal" centered hideHeader hideFooter v-on:shown="modalShown">
              <v-sheet class="pa-3">
                  <component :is="modal_view" v-bind="selected_transaction"/>
              </v-sheet>
          </v-dialog>
      </div>

      <div class="" v-else>
          <div class="text-center">No records found ... </div>
      </div>
  </div>
</template>
<script>
// holds the user payments ;
import '@/class.core.js'
import Payment_succ_Comp from '../../payment/payment-success.vue'
import SingleTransaction from './single-transaction.vue'

export default {
  name: 'Transactions',
  props: ['user'],
  data: function () {
    return {
      selected_transaction: {},
      modal_view: 'none',
      showModal:false,
    }
  },
  computed: {
    transactions: function () {
      return this.$store.state.user.transactions
    }
  },
  watch:{
      showModal:function(v){
          if(v)
            {
            this.modalShown();
            }
      }
  },
  components: {
    'single-transaction': SingleTransaction,
    'payment-succ': Payment_succ_Comp,
    'none': {
      template: '<div>None</div>'
    }
  },
  mounted: function () {
    console.log('router length', this.$router.app.user)
  },

  methods: {
    modalShown: function () {
      this.modal_view = 'payment-succ'
    },
    get_qr: function (data) {
      // show modal ;
      this.selected_transaction = { data: data, status: 'success', showNotice: false }
      this.showModal= true ;
    }
  }
}

</script>
