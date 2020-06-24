<template>
    <div class="">
        <div class="py-2 d-flex flex-column mb-4">
            <template v-if="displayOptions.showMerchant">
                <storeStyleCentered class="mb-8" :store="order.merchant"/>
            </template>

            <v-list>
              <v-list-item v-if="displayOptions.showInvoiceId">
                <v-list-item-content>
                  <v-list-item-subtitle>Ref</v-list-item-subtitle>
                  <div class="body-2 font-weight-medium text-uppercase">{{order.inv_id}}</div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>Order Date</v-list-item-subtitle>
                  <div class="body-2 font-weight-medium text-uppercase">{{order_date}}</div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>Home delivery</v-list-item-subtitle>
                  <div>
                    <div class="text-capitalize pb-1 body-2">{{delivery_}}</div>
                    <GetDeliveryStatus class="pl-2" :text="order.inv_id" v-if="order.home_delivery" />
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>Preorder</v-list-item-subtitle>
                  <div class="body-2 font-weight-medium text-uppercase">{{preorder_date}}</div>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>Payment status</v-list-item-subtitle>
                  <div class="pt-2">
                    <v-chip
                        small
                        class="mr-2"
                        :color="payment_status.color"
                        text-color="white">
                        {{payment_status.text}}
                        <v-icon right small>{{payment_status.icon}}</v-icon>
                    </v-chip>

                    <v-chip
                        v-if="order.payment_status=='success'"
                        small
                        class="mr-2"
                        color="primary"
                        text-color="white"
                        @click="get_qr"
                        >
                        Get qrcode
                        <v-icon right small>mdi-qrcode</v-icon>
                    </v-chip>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>

        </div>

        <order-items v-bind:items="order_detail"></order-items>

        <template v-if="order.payment_status=='success'">
            <v-dialog v-model="showModal" max-width="30rem" ref="the_modal">
                <v-sheet class="pa-3">
                    <component :is="modal_view" v-bind="selected_transaction"/>
                </v-sheet>
            </v-dialog>
        </template>
    </div>
</template>
<script>
import orderMeta from './order-meta.js'
import orderItems from '../../common/item/order-items.js'
import moment from 'moment'
import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;
import {mapGetters} from 'vuex' ;
import Payment_succ_Comp from '@/components/shopper/payment/payment-success.vue'
import storeStyleCentered from '@/components/common/store/store-style-centered.vue' ;
import GetDeliveryStatus from '@/components/shopper/store/Delivery/GetDeliveryStatus.vue' ;

export default {
  name:"orderDetail",
  props: {
      order:{
          required:true,
          type:Object
      },
      displayOptions:{
          type:Object,
          default:()=>{
            return {
                showMerchant:true,
                showInvoiceId:true
            }
        }
      }
  },
  data: function () {
    return {
        order_detail:[],
         modal_view: 'none',
         showModal: false,
         selected_transaction:{}
    }
  },
  computed: {
      ...mapGetters({
          // getOutlet:'outlets/getOutlet',
          isSessionActive:'user/isSessionActive'
      }),

    metadata: function () {
      // home_delivery, preordered, completed ;
      let data = {}
      data.home_delivery = this.order.home_delivery == undefined ? null : this.order.home_delivery
      data.preordered = this.order.preordered == undefined ? null : this.order.preordered
      data.complete = 0 // test on this.order.prints ;

      return data
    },

    order_date: function () {
      return moment.unix(this.order.created).format('lll')
    },

    delivery_ : function(){
        if(this.order.home_delivery)
            {
            return (this.order.attr) ? this.order.attr.home_delivery.location.full_address : 'could not read address'
            }

        return '-' ;
    },
    preorder_date: function () {
      return this.order.preordered ? moment.unix(this.order.attr.preordered.time).format('lll') : '-'
    },
    payment_status: function(){
        let rt = {
            color:'red',
            text: 'Not Paid',
            icon:'mdi-close'
        }
        if (this.order.payment_status=='success')
            {
            rt.color = 'green'
            rt.text = 'Paid' ;
            rt.icon = 'mdi-check'
            }

        return rt
    }
  },
  components: {
    'order-meta': orderMeta,
    'order-items': orderItems,
    'payment-succ': Payment_succ_Comp,
    'none': {
      template: '<div></div>'
    },
    storeStyleCentered,
    GetDeliveryStatus
  },
  watch:{
      showModal:function(v){
          if(v)
            {
            this.modalShown();
            }
      }
  },
  mounted:function(){
        if(this.isSessionActive)
            {
            if(!this.order.order_detail){
                this.fetch_order(this.order.inv_id)
                }
            }
        else
            {
            if(!this.order.order_detail)
                this.load_order(this.order.inv_id)
            else
                {
                this.order_detail = this.order.order_detail ;
                }
            }

    },
    methods:{
        load_order: function load_order(invoice_id)
            {
            const db = Core.db_user ;
            let vm = this ;
            return db.orders.where({inv_id:invoice_id}).first()
                .then(v=>{
                    console.log('found invoice on order',v) ;
                    vm.order_detail = v.order_detail ;
                })
            .catch(e=>{console.log('load_order',e)})
            },

        fetch_order: function (invoiceid)
            {
            const db = Core.db_user ;
            let vm = this ;
            let clause = {
                invoiceid:{data:[invoiceid], factor:'equalto'}
            }

            let url =  API_ENDPOINT+'/order/shopper'+'?clause='+encodeURIComponent(JSON.stringify(clause))+'&timestamp=1' ;
            let options = Core.set_fetch_headers();


            return fetch(url,options)
                .then(json=>{return json.json()})
                .then(resp=>{
                    console.log('fetch order', resp) ;
                    if(! ('error' in resp))
                        {
                        // let order = Core.set_db_id('invoiceid', resp.order) ;
                        vm.order_detail = resp.order[0].items ;
                        /*db.orders.bulkPut(order)
                            .then(row=>{
                                // console.log('order updated') ;
                            })*/
                        }
                    return resp ;
                })
            .catch(e=>{console.log('e',e)})
            },
        fetch_status(){

        } ,
        modalShown: function () {
            this.modal_view = 'payment-succ'
            },
        get_qr: function (data) {
            // show modal ;
            this.selected_transaction = { data: {ref:this.order.payment_ref, invoice_id:this.order.inv_id, mid:this.order.m_id}, status: 'success', showNotice: false }
            this.showModal= true ;
        }
    }
}

</script>
