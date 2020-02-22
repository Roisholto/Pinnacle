<template>
    <div class="wrapper d-flex" style="min-height:220px">
        <aside class="px-0" style="background-color:rgb(236, 236, 236); border-radius:0 0 0 0.25rem">
            <div v-bind:class="{active: current_option == option.type } " class="d-flex option py-2 px-2" v-for="option in payment_options" v-on:click="change_pay_option(option.type)">
                <span style="width: 24px;" class="d-flex align-center">
                    <i v-bind:class="option.icon"></i>
                </span>
                <span class="flex-grow-1">{{option.type}}</span>
            </div>
        </aside>
        <div class="d-flex align-center py-3 px-2 w-100">
            <transition>
                <component class="flex-fill"
                    v-bind:is="current_option"
                    v-bind:invoice="invoice"
                    v-bind:userinfo="user"
                    v-on:payment-complete="handle_payment_complete($event)"
                    />
            </transition>
        </div>
    </div>
</template>
<script>
import Core from '../../../class.core.js'
import Card from './card/card-payment.js'
import {mapState} from 'vuex'

export default {
  name: 'Payment_Comp',
  props: ['merchant', 'invoice', 'user'],
  data: function () {
    return {
      payment_options: [
        { type: 'card', icon: 'fa fa-credit-card' }
        /* {type:'bank', icon:'fa fa-university'},
                {type:'btc', icon:'fab fa-btc'} */
      ],
      current_option: 'card'
    }
  },
  computed:{
      ...mapState({
          mid:state=> state.merchant.info.mid,
      })
  },
  components: {
    'card': Card

  },

  methods: {
    change_pay_option: function (type) {
      const vm = this
      vm.current_option = type
    },
    handle_payment_complete: function ($ev) {
      // expecting the status='success| fail' ;
      console.log('ev', $ev)
      if ($ev.status == 'success') {
        // payment is complete ;
        // close the modal
        // switch view to the payment success view ;
        this.$store.commit('merchant/empty_cart') ;
        // if user is not signed in store data in localSession ;
        // console.log(Core.db_user) ;
        this.$store.dispatch('user/init_data_store')
          .then(idb => {
            idb.payment.add($ev.data)
                .catch(function(e){

                })

            let mod_dt = {
                payment_ref:$ev.data.ref,
                payment_status : 'success'
                } ;

            idb.orders.where({inv_id:$ev.data.invoice.invoice}).modify(mod_dt)
                .catch(function(e){
                    console.log('error updating data', mod_dt) ;
                })
          })
        .catch(e=>{
            console.log('error adding data') ;
        })

      this.$router.push({
          name: 'payment-success',
          params:{
              data:{
                  invoice_id:$ev.data.invoice.invoice,
                  mid:this.mid,
                  ref:$ev.data.ref
              },
              status:'success'
          }
      })
      this.$emit('payment-complete', $ev)
      }
    }
  }
}

</script>
<style lang="scss" scoped="true">
.wrapper{
    flex-direction:column ;

    @media (min-width: 425px) {
        flex-direction:row ;
    }

    aside{
        @media(min-width: 425px)
            {
            width: 130px;
            }
    }

}
</style>
