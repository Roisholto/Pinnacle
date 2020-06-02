/** disable-eslint */
<template>
    <div>
        <div v-if="cart_length==0">
            <emptyCartPlaceholder :type="merchantInfo.type"/>
        </div>
    <div class="remove-last-border" v-else>
            <div class="mb-2 white" v-for="(cart_item, m_index) in cart " v-bind:key="m_index">
                <v-card class="rounded pa-2">
                    <div class="d-none justify-content-between mb-2">
                        <div class="">{{cart_item.name}}</div>
                        <v-icon color="grey ">
                            mdi-dots-vertical
                        </v-icon>
                    </div>

                    <div class="border-bottom py-3 px-2" v-for="(item,index) in cart_item.items" v-bind:key="index">
                        <div class="d-flex flex-column">
                            <div class="text-right py-1" v-if="item_cart_error[cart_item.name] && item_cart_error[cart_item.name][item.code]">
                                <span class="red--text body-2 text--darken-2">{{item_cart_error[cart_item.name][item.code]}} </span>
                            </div>
                            <div class="d-flex">
                                <div class="col-9 px-0 pr-2">
                                    <single-item v-bind:item="inventoryItems[item.code]" v-bind:mode="'invoice'">
                                        <div class="d-flex">
                                            <!-- remove_item_from_cart_items() -->
                                            <v-btn @click.stop="edit_item(m_index,index)"  color="primary" class="pl-0 body-2" text>
                                                <v-icon size="16px" class="mr-1">
                                                    mdi-pencil-outline
                                                </v-icon>
                                                <span class="" style="text-transform:capitalize">Edit</span>
                                            </v-btn>
                                            <div class="mx-sm-0 mx-md-2"></div>
                                            <v-btn  @click="remove_item(m_index,index)" dense color="primary" class="body-2" text>
                                                <v-icon size="16px" class="mr-1">
                                                    mdi-trash-can-outline
                                                </v-icon>
                                                <span class="" style="text-transform:capitalize">Remove</span>
                                            </v-btn>
                                        </div>
                                    </single-item>

                                </div>
                                <div class="col-3 d-flex px-0 text-right">
                                    <div class="body-2 flex-fill d-inline-block text-truncate ">{{to_currency(item.selected_price * item.selected_qty)}}</div>
                                    <div class="body-2 pl-2">{{item.selected_qty}}</div>
                                </div>
                                <!--<div class="col-2 px-0 pr-2 text-right">

                                </div>-->
                            </div>

                        </div>
                    </div>
                </v-card>
            </div>

            <v-card class="remove-last-border border rounded white" v-if="extra_services && cart_length > 0">
                <div class="pa-2">
                  <div class="d-flex border-bottom rounded py-2" v-if="home_delivery">
                      <div class="col text-capitalize font-weight-bold body-2">
                          delivery charge
                      </div>
                      <div class="col body-2">
                       <quotationInfo />
                      </div>
                  </div>
                  <div class="d-flex py-2 body-2" v-if="is_preorder">
                      <div class="col text-capitalize font-weight-bold small">
                          Service charge
                      </div>
                      <div class="col text-center">
                          {{to_currency(merchantPref.preorder_charge)}}
                      </div>
                  </div>
                </div>
            </v-card>
            <template v-if="cart_length > 0">

                <v-card class="mt-3">
                  <div class="pa-2 px-3">
                    <div class="border-bottom py-2" v-if="merchantPref.home_delivery == 1">

                        <v-checkbox
                          v-model="home_delivery"
                          hide-details
                          label="Have your order delivered to your doorstep"
                          color="primary"
                          />

                        <router-link v-bind:to="{name:'add-delivery-info'}"
                        v-if="home_delivery"
                        class="small d-block py-2"
                        >
                            Add delivery info
                        </router-link>
                    </div>

                    <template  v-if="merchantPref.accept_preorder == 1">
                        <div class="border-bottom py-2 ">
                            <div class="d-flex">
                                <v-checkbox
                                 v-model="is_preorder"
                                  hide-details
                                  label="Preorder"
                                  color="primary"
                                  />

                                <div class="ml-3 d-flex" v-if="is_preorder">
                                    <div style="width:100px" class="pr-2">
                                        <v-text-field
                                            @click="[preorder_vars.modalComp = 0 ,preorder_vars.open = true]"
                                            v-model="preorder_date"
                                            ref="preorderInput"
                                            hide-details
                                            placeholder="Date"/>
                                    </div>
                                    <div style="width:80px">
                                        <v-text-field
                                        hide-details
                                            @click="[preorder_vars.modalComp = 1 ,preorder_vars.open = true]"
                                            v-model="preorder_time"
                                            placeholder="Time"/>
                                    </div>

                                </div>
                            </div>
                            <div class="py-1" v-if="is_preorder">
                                <small><span class="font-weight-bold">{{merchantInfo.name}}</span> needs at least <span class="font-weight-bold">{{min_preorder_duration}}</span> to attend to your preorder</small>
                            </div>
                            <v-dialog v-model="preorder_vars.open" max-width="400">
                                <v-date-picker
                                    v-model="preorder_date"
                                    color="primary"
                                    @input="preorder_vars.open = false"
                                    v-if="preorder_vars.modalComp == 0">
                                </v-date-picker>
                                <v-time-picker
                                    v-model="preorder_time"
                                    @input="preorder_vars.open = false"
                                    v-else></v-time-picker>
                            </v-dialog>
                        </div>
                    </template>

                    <div class="text-center my-4">
                        <h3 class="py-1 font-weight-bold">{{to_currency(grand_total)}}</h3>
                        <div class="py-1">
                            <v-btn
                                ref="checkout"
                                type="submit"
                                block
                                color="primary"
                                :loading="creating_invoice"
                                v-on:click.stop="checkout()">
                                {{checkout_btn_txt}}
                            </v-btn>
                            <!--<button class="btn btn-sm btn-primary more-radius-1 px-3 w-100"  ref="checkout">{{checkout_btn_txt}}</button>-->
                        </div>
                    </div>

                    <v-dialog v-model="show_payment_form" max-width="35rem" centered body-class="pa-0">
                        <v-card>
                            <v-card-title>
                                <h3 class="headline">Make Payment</h3>
                            </v-card-title>
                            <v-divider class="my-0"></v-divider>
                            <payment
                                v-bind:merchant="merchantInfo"
                                v-bind:invoice="invoice_info"
                                v-bind:user="isSessionActive ? user : cartExtras.user_info"
                                v-on:payment-complete="handle_payment_complete($event)"
                            />
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="show_info_input" max-width="350" persistent>
                        <v-card>
                            <v-card-title>
                                We need a little info about you.
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    v-model="cart_user_info_mail"
                                    placeholder="Your email"
                                    :rules="[rules.email]"
                                    hint="We need to keep you informed regarding your order">
                                </v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn text color="secondary" @click.stop="show_info_input = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click.stop="show_info_input = validate_cart_user_info() ? false : true">
                                    Done
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <add-to-cart
                    v-bind:openState="add_cart.show_modal"
                    v-on:modal-hidden="add_cart.show_modal = false"
                    v-bind:productCode="add_cart.productCode"
                    v-bind:defaultSelection="add_cart.defaultSelection">
                    </add-to-cart>
                </div>
              </v-card>
            </template>
    </div>
</div>
</template>
<script>
import * as spJs from '../../shopper.payment.js'
import Payment_Comp from './payment/payment.vue'
import { calc_preorder_duration_unit } from '../../constants.js'
import { validate_preordered } from '../../shopper.invoice.js'
import Core from '../../class.core.js'
import moment from 'moment'
import jBox from 'jbox'
import Vue from 'vue'
import { mapState, mapGetters  } from 'vuex'
import { naija_currency } from '@/functions/to_currency.js'
import singleItem from '@/components/common/item/single-item.vue'
import addToCart from './cart/add-to-cart.vue'
import quotationInfo from './cart/delivery/quotation-info.vue'
import emptyCartPlaceholder from '@/components/shopper/cart/empty-cart-placeholder.vue'
import 'jbox/Source/plugins/Notice/jBox.Notice.js'
import {email} from '@/functions/rules.js' ;

window.jBox = jBox

export default {
  name: 'cartComp',
  props: {
    merchant: Object,
    storeid: String
  },
  data: function () {
    return {
        preorder_vars:{
            open:false,
            modalComp:0,
            date:'',
            time:''
        },
        rules: {
            email
        },
        show_info_input:false,
        // preorder:0, // holds the value for preordered period ;
        creating_invoice: false,
        location: {},
        show_payment_form: false,
        add_cart: {
            show_modal: false,
            productCode: '', // will be used in the addToCart component ;
            defaultSelection: {}
        },
      item_cart_error:{

        },
      // use this with flat-pickr
      timeConfig: {
          allowInput: true,
          enableTime: true,
          minDate: new Date()
        },
      invoice_info: {} // only populated after the invoice has been generated on the server ;
    }
  },
  computed: {
    ...mapState({
      inventoryItems: state => state.merchant.inventory.items,

      merchantPref: state => state.merchant.pref,

      merchantInfo: state => state.merchant.info,

      cart: state => state.merchant.cart,

      cartExtras: state => state.merchant.cartExtras,

      user: state => state.user
    }),

    ...mapGetters({
        isSessionActive:'user/isSessionActive',
        getPreorderTime: 'merchant/cartExtras/getPreorderTime'
    }),
    checkout_btn_txt: function () {
      return this.creating_invoice ? 'Processing...' : 'CHECKOUT'
    },

    cart_user_info_mail:{
        get: function(){
            return this.cartExtras.user_info.email ;
        },
        set: function(x){
            this.$store.commit('merchant/cartExtras/update_user_info', {email:x}) ;
        }
    },

    home_delivery: {
      get: function () {
        return this.cartExtras.delivery.is_delivery
      },
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_is_delivery', n)
      }
    },
    // determines the visibility of the preorder input
    is_preorder: {
      get: function () {
        return this.cartExtras.preorder.is_preorder
      },
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_is_preorder', n)
      }
    },

    preorder: {
      get: function () {
        return this.cartExtras.preorder.time
      },
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_preorder_time', n)
      }
    },

    preorder_time: {
      get: function () {
        return this.cartExtras.preorder.vars.time
      },
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_preorder_var_time', n)
      }
    },

    preorder_date: {
      get: function () {
        return this.cartExtras.preorder.vars.date
      },
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_preorder_var_date', n)
      }
    },

    preorder_info: function () {
      let merchantPref = this.merchantPref
      let merchantInfo = this.merchantInfo

      if (merchantPref.preorder_charge > 0) { return `${merchantInfo.name} charges ${merchantPref.preorder_charge} naira on all preorders` }

      return `${merchantInfo.name} does not place additional charges on preorders`
    },

    grand_total: function () {
      let cart = this.cart
      let total = 0

      cart.forEach(function (c) {
        c.items.forEach(function (v) {
          total += (v.selected_price * v.selected_qty)
        })
      })

      if (this.is_preorder) { total += parseFloat(this.merchantPref.preorder_charge) }

      if (this.home_delivery) {
        let isQk = this.isDeliveryQuotationOkay()
        if (isQk) {
          total += parseFloat(isQk.charge)
        }
      }
      return total
    },
    min_preorder_duration: function () {
      return this.preorder_duration(this.merchantPref.preorder_duration.min)
    },
    max_preorder_duration: function () {
      return this.preorder_duration(this.merchantPref.preorder_duration.max)
    },
    cart_length: function () {
      return this.$store.getters['merchant/cart_length']
    },

    // Home delivery or preordered is truthy ,
    extra_services: function () {
      return this.home_delivery || this.is_preorder
    }

  },
  watch: {
    is_preorder: function (nv, ov) {
      if (nv) {
        this.$nextTick().then(() => {
          // $(this.$refs.preorderInput.$el).focus()
        })
      }
    }
  },
  components: {
    'payment': Payment_Comp,
    singleItem,
    addToCart,
    quotationInfo,
    emptyCartPlaceholder,
  },

  mounted: function () {

  },
  methods: {
    ...mapGetters({
      init_user_store: 'user/initDataBase'
    }),

    validate_cart_user_info: function(){
        let val_email = email(this.cart_user_info_mail) ;
        return (typeof val_email == 'boolean' && val_email)
        },

    edit_item: function (x, y) {
      let item = this.$store.getters['merchant/cart_item']([x, y]) // () // JSON.parse(JSON.stringify( ) ) ;
     // console.log('item is ', item)
      this.add_cart.productCode = item.code
      // remove the product code from the defaultSelection
      let dd = Object.assign({}, item)
      delete dd.code
      this.add_cart.defaultSelection = dd
      this.add_cart.show_modal = true
    },
    remove_item: function (x, y) {
      return this.$store.dispatch('merchant/remove_item_from_cart_items', [x, y])
    },
    to_currency: function (c) {
      return naija_currency(c)
    },
    checkout: function () {
      // grab the items in cart, and send it to the api ;
      // the api returns a jwt for this transaction,
      // the jwt contains the invoice-id,amount-to-be paid;
      // the user enters her card details to which is transferred back to the api to complete the transaction ;
      if (this.creating_invoice) {
        return
      }

      let attr = {}

      if(!this.isSessionActive)
        {
        // display a modal to receive the customer information
        // mail,
        // validate email ;
        if (! this.validate_cart_user_info())
            {
            // display modal to receive the email
            this.show_info_input = true
            return ;
            }
        else
            {
            attr.user_info = this.cartExtras.user_info ;
            }
        }

      let cart = JSON.parse(JSON.stringify(Object.assign({}, this.cart) ) )

      const vm = this
      const errors = []
      if (this.cart_length > 0 && this.grand_total > 0) {
        // send data to the api ;
        // readjust cart for equality with data sent back from the api "order" endpoint ;
        // this is most ideal when user is not logged in
        // Of course the down side is when the api changes then we have to change this ;
        let cart_items
        Object.keys(cart).forEach(function (v) {
          // since the status is not required on the api ;
          delete cart[v].status ;
          cart_items = cart[v].items
          let code
          cart_items.forEach(function (vv) {
            code = vv.code
            //console.log('code', code)
            vv.price = vv.selected_price
            vv.qty = vv.selected_qty
            vv.pack = cart[v].name
            // vv.name = vm.inventoryItems[code].name
            // vv.images = vm.inventoryItems[code].images
            vv.pr_code = code
            // delete vv.name
            //delete vv.images
            delete vv.selected_qty ;
            delete vv.selected_price ;
          })
        })

        if (this.is_preorder) {
          // validate the preorder 'Ensure its a time in the future and that it is within the merchants business hour' ;
          // if is valid add to attr_object else display an error
          // Ensure the
          const the_time = moment(this.getPreorderTime)
          if (the_time.isValid) {
            // now ensure it is within the business hour ;
            let the_day_name = the_time.format('dddd').toLowerCase()
            let the_biz_hrs = this.merchantPref.business_hours
            if (the_biz_hrs[the_day_name]) // the business opens on this day ;
            {
              let the_hrs = the_biz_hrs[the_day_name][0]
              const startOf_the_time = the_time.clone().startOf('day')
              let openAt = startOf_the_time.clone().add({ seconds: the_hrs.open })
              let closeAt = startOf_the_time.clone().add({ seconds: the_hrs.close })

              if (the_time.format('X') >= openAt.format('X') && the_time.format('X') <= closeAt.format('X')) {
                // no problems
                // now check if its within the preorder_duration
                if (validate_preordered(the_time.format('X'), this.merchantPref.preorder_duration)) {
                  attr.preordered = the_time.format('X')
                  // console.log(the_time.format('llll')) ;
                } else {
                  errors.push(`Merchant needs at least <b>${vm.min_preorder_duration}'s </b>
                                        to attend to preorders and preorders cannot exceed
                                        <b>${vm.max_preorder_duration}'s </b> from date of order`)
                }
              } else {
                errors.push('Merchant does not open at the set time')
              }
            } else { errors.push('Merchant does not open at the selected time') }
          } else {
            errors.push('Invalid preorder date')
          }
          // if()
        }

        if (this.home_delivery) {
          // the api expects the delivery location as {'coords':{lat:'',lng:''}, address:''} ;
          let dlvOkay = this.isDeliveryQuotationOkay()
          if (dlvOkay) {
            attr.home_delivery = Object.assign({}, {
              name: this.cartExtras.delivery.info.name,
              phone: this.cartExtras.delivery.info.phone
            },
            dlvOkay
            )
          } else {
            if (typeof (dlvOkay) === 'boolean')
                { errors.push('delivery not set') }
            else
                { errors.push(dlvOkay.description) }
          }
        }

        if (errors.length) {
          new jBox('Notice', {
            color: 'red',
            content: `<small> ${errors.join('<br>')} </small>`
          })
          // console.log('errors found',errors) ;
          return
        }

        // console.log('cart', cart) ;
        this.creating_invoice = true ;
        this.item_cart_error = {} ;
        spJs.send_cart_details({ cart: cart, attr: attr })
          .then(resp => {
            // console.log('invoice response', resp) ;
            if (resp != undefined) {
              if (!('error' in resp)) {
                vm.invoice_info = resp
                // put the payment info and cart details in db ;
                let the_data = Object.assign({}, { order_detail: resp.order_items }, attr, resp)
                the_data.inv_id = resp.invoice
                // Add the merchant info for offline reference ;
                the_data.merchant = vm.merchantInfo
                // the_data.amount = resp.amount ;
                // display modal to make payment ;
                let db_user = vm.init_user_store() ;
                db_user.orders.add(the_data)
                    .then(function(v){
                        delete vm.invoice_info.order_items ;
                        vm.showPaymentForm()
                    })
                .catch(e => {
                    console.log('error storring info', e)
                    new jBox('Notice', {
                        content: 'An error occured storing detail on client'
                        })
                    })
                }
            else
                {
                // todo copy the notice function from opencrm project
                new jBox('Notice', {
                  color: 'red',
                  content: resp.error,
                  autoClose: 8000
                })

                if('invalids' in resp)
                    {
                    if(resp.invalids.length)
                        {
                        let invalids = resp.invalids ;
                        for(let i=0; i< invalids.length ; i++)
                            {
                            console.log(invalids[i].pack, vm.item_cart_error);
                            if(! (invalids[i].pack in  vm.item_cart_error))
                                {
                                Vue.set(vm.item_cart_error,
                                    invalids[i].pack,
                                    {})
                                }

                            Vue.set(vm.item_cart_error[invalids[i].pack],
                                invalids[i].code,
                                invalids[i].error)
                            }
                        }
                    }
              }
            }
          })
          .catch(e => console.log('cart error', e))
          .finally(function () {
            vm.creating_invoice = false
          })
      }
    },
    preorder_duration: function (v) {
      let d = calc_preorder_duration_unit(v)
      return d.value.toString() + ' ' + d.unit
    },
    showPaymentForm: function (data) {
      // show the form then
      this.show_payment_form = true
    },
    handle_payment_complete: function ($ev) {
      if ($ev.status == 'success') {
        // close the modal ;
        this.show_modal = false
      }
    },
    // this will onlly be called if user chooses option for home delivery
    isDeliveryQuotationOkay: function () {
      // should return true or false ;
      if (this.cartExtras.delivery.quotation.error || Object.keys(this.cartExtras.delivery.quotation).length == 0) { return false } else {
        return this.cartExtras.delivery.quotation.data
      }
    }
  }
}
</script>
