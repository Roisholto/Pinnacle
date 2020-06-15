// purpose is just to display handle entering items into the cart ;
// will display a modal where the entry will be made ;
<template>
    <v-dialog light max-width="45rem" v-model="modal_comp_open" scrollable>
        <v-card >
            <v-card-title class="headline">Add item to cart</v-card-title>
            <v-card-text style="height:300px">
            <v-form id="the-single-cart-entry-form" ref="addItemForm" v-on:submit.prevent="finalize_add_to_cart" v-if="productCode">
                <template v-if="theProductInfo">
                    <template v-if="modal_completely_shown">

                            <!--<template v-if="false">-->
                                <div class="d-none justify-content-end align-center">
                                    <div class="px-2">
                                        <a href="javascript:;" v-on:click="cart_pack_open = true">
                                            <v-icon color="grey ">
                                                mdi-plus
                                            </v-icon>
                                        </a>
                                    </div>
                                    <div class="pl-2">
                                        <select class="form-control-sm" v-model="product.selected_pack" v-on:input="prepData.selected_pack = $event.target.value" required>
                                            <option disabled value="">select pack</option>
                                            <option v-bind:value="pack" v-for="pack in cart_packs">{{pack}}</option>
                                        </select>
                                    </div>
                                </div>
                            <!--</template>-->

                            <div class="col-12 px-0 py-3 border-bottom">
                                 <single-item  v-bind:item="theProductInfo" v-bind:mode="'search-store'"></single-item>
                             </div>

                             <price-selector class="py-3"
                                v-bind:rate="prepData.rate"
                                v-on:selection-change="priceSelectionChangeEvent"
                                v-bind:defaults="price_selector_default"
                                /><!-- v-on:price-change="price_change"
                                v-on:qty-change="qty_change" -->

                            <requestInputs
                                ref="reqInp"
                                :inputs="theProductInfo.request_inputs"
                                @input="requestInputsChangeEvent"
                                :currentInputs="extra_inputs_default"
                                class="mb-1"/>
                            <itemDescription :description="theProductInfo.description"/>
                    </template>
                    <template v-else>
                        <div class="text-center">fetching item . . .</div>
                    </template>
                </template>
                <template v-else>
                    <h4 class="text-center">Pending shown </h4>
                </template>
            </v-form>

            <div v-else>
                <!-- improve this Add more emotion -->
                <h4 class="text-center">
                    Product not set
                </h4>
            </div>
        <!--<div slot=""></div>-->
            <v-dialog v-model="cart_pack_open" hideFooter size="sm">
                <addCartPack v-on:pack-added="[cart_pack_open = false, product.selected_pack = $event]"/>
            </v-dialog>
            </v-card-text>

            <v-card-actions v-if="theProductInfo">
              <v-spacer></v-spacer>

              <v-btn
                color=""
                text
                @click="modal_comp_open=false"
              >
                Cancel
              </v-btn>

              <v-btn
                color="primary darken-1"
                text
                type="submit"
                @click.stop="finalize_add_to_cart"
                >
                Ok
              </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog width="400" v-model="replaceItemsDialog.model">
          <v-card>
            <v-card-title>Replace Item</v-card-title>
            <v-card-text>
              The selected item exists in your cart already, What will you like to do ?
            </v-card-text>
            <v-divider />
            <v-card-actions class="flex-wrap pa-0">
              <div class="col pa-0" >
                <v-btn color="grey" block tile @click="replaceItemsDialog.model = false">Cancel</v-btn>
              </div>
              <div class="col pa-0">
                <v-btn color="primary" block tile @click="replaceItem">Replace</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-dialog>
</template>
<script>
import 'jbox/Source/plugins/Confirm/jBox.Confirm.js'
import 'jbox/Source/plugins/Confirm/jBox.Confirm.css'
import jBox from 'jbox'
import 'jbox/Source/plugins/Confirm/jBox.Confirm.js'
import { mapState } from 'vuex'
import addCartPack from '@/components/shopper/cart/add-cart-pack.vue'
import priceSelector from './price-selector.vue'
import singleItem from '@/components/common/item/single-item.vue'
import { fetch_item_from_api } from '@/shopper.inventory.js'
import itemDescription from '@/components/common/item/item-description'
import requestInputs from '@/components/shopper/cart/request-inputs/request-inputs.vue' ;

window.jBox = jBox

export default {
  name: 'addToCart',
  props: {
    productCode: {
      type: String,
      required: true
    },
    defaultSelection: Object,
    openState: false
  },
  data: function () {
    return {
      lastOpenState: null,
      modal_completely_shown: false,
      // could be renamed say selection ;
      product: {
        selected_price: '',
        selected_qty: '',
        qty_step: '',
        extra_request_inputs:{},
        selected_pack: 'pack1'
      },
      cart_pack_open: false,
      modal_comp_open: false,
      snackbar:false,
      replaceItemsDialog:{
        model:false,
        data:{

        }
      }
    }
  },
  computed: {
    cart_packs: function () {
      return this.$store.getters['merchant/cart_packs']
    },
    theProductInfo: function () {
      // could as well be a in $store.getter
      let dt = this.$store.state.merchant.inventory.items[this.productCode]
      if (dt) { return dt } else {
        // fetch item from api ;
        fetch_item_from_api(this.$route.params.storeid, [{ code: { data: [this.productCode], factor: 'equalto' } }])
      }
    },
    prepData: function () {
      return Object.assign({}, this.$data.product, this.theProductInfo)
    },
    cart_list: function () {
      return this.$store.state.merchant.cart
    },
    price_selector_default: function () {
      return this.defaultSelection ? this.product : null
    },
    extra_inputs_default: function () {
      return this.defaultSelection ? this.product.extra_request_inputs : null
    },
  },
  watch: {
    openState: function (nv, ov) {
      this.lastOpenState = ov
      this.modal_comp_open = nv
    },
    modal_comp_open:function(nv){
        if(nv)
            {
            this.$emit('modal-shown');
            // this.modal_completely_shown = true ;
            this.modal_shown()
            }
        else
            {
            this.$emit('modal-hidden')
            this.modal_completely_shown = false ;
            }
    }
  },
  components: {
    addCartPack,
    priceSelector,
    singleItem,
    itemDescription,
    requestInputs
  },
  mounted: function () {
      this.modal_shown();
  },
  methods:
        {
          modal_shown: function () {
            this.$emit('modal-shown')

            let vm = this
            if (vm.defaultSelection)
                {
                vm.product = Object.assign({}, vm.product, vm.defaultSelection)
                }
            else
                {
                vm.product = {
                    selected_price: '',
                    selected_qty: '',
                    qty_step: 0,
                    selected_pack: 'pack1',
                    extra_request_inputs:{},
                    }

                if (!vm.prepData.selected_pack)
                    {
                    vm.product.selected_pack = vm.cart_packs[0]
                    }
                }

            vm.modal_completely_shown = true

          },
          priceSelectionChangeEvent: function (val) {
            this.product.selected_price = val.price
            this.product.selected_qty = val.qty
          },

          requestInputsChangeEvent:function(val){
              // console.log('val req ipt', val)
              this.product.extra_request_inputs = val
          },

          replaceItem(){
            let cart = this.cart_list ;
            let i = this.replaceItemsDialog.data.i, j= this.replaceItemsDialog.data.j ;

            cart[i].items[j].selected_price = this.replaceItemsDialog.data.selected_price
            cart[i].items[j].selected_qty = this.replaceItemsDialog.data.selected_qty
            cart[i].items[j].extra_request_inputs = this.replaceItemsDialog.data.extra_request_inputs;

            this.overwrite_cart(cart)
            this.replaceItemsDialog.model = false
            this.modal_comp_open = false
          },

          finalize_add_to_cart: function ($ev) {
            const vm = this
            // check if cart is empty ;
            // if it is add a new pack ; and populate with the current item ;
            // if it is not => add to the last open pack
            if (!this.$refs.addItemForm.validate())
              {
              if(this.prepData.request_inputs.length)
                {
                //open the expansion panel;
                this.$refs.reqInp.$data.expState=0;
                }
              return
              }

            const prepData = JSON.parse(JSON.stringify(this.prepData))
            // console.log('prepdata', prepData)
            const cart = this.cart_list
            console.log('cart', cart) ;
            let cart_item, cart_item_items

            for (let i = 0; i < cart.length; i++) {
              cart_item = cart[i]

              if (cart_item.name == prepData.selected_pack) {
                cart_item_items = cart_item.items
                // now check if item exists already ;
                let item_found = false
                for (let j = 0; j < cart_item_items.length; j++) {
                  if (cart_item_items[j].code == prepData.code) {
                    // check if it is the same rate ;
                    item_found = true
                    if (parseFloat(cart_item_items[j].selected_rate) == parseFloat(prepData.selected_rate)) {
                      // if it is continue ;
                      cart_item_items[j].selected_qty = parseInt(cart_item_items[j].selected_qty) + parseFloat(prepData.selected_qty)
                      }
                    else
                      {
                      // if not ask user if he/she will like to be replace the entry or cancel the entry ;
                      this.replaceItemsDialog.data.selected_price = parseFloat(prepData.selected_price);
                      this.replaceItemsDialog.data.selected_qty = parseFloat(prepData.selected_qty);
                      this.replaceItemsDialog.data.extra_request_inputs = prepData.extra_request_inputs;
                      this.replaceItemsDialog.data.j = j ;
                      this.replaceItemsDialog.data.i = i ;

                      this.replaceItemsDialog.model = true ;
                      /* new jBox('Confirm', {
                        content: `The selected item exists in your cart already, What will you like to do`,
                        addClass: 'blue-confirmButton',
                        zIndex: 10003,
                        confirmButton: 'Replace',
                        cancelButton: 'Cancel',
                        cancel: function () {
                          // this.
                        },
                        confirm: function () {
                          cart_item_items[j].selected_price = parseFloat(prepData.selected_price)
                          cart_item_items[j].selected_qty = parseFloat(prepData.selected_qty)
                          cart_item_items[j].extra_request_inputs = prepData.extra_request_inputs ;
                          // close this modal
                          // console.log('cart here', cart) ;
                          vm.overwrite_cart(cart)
                          vm.modal_comp_open = false
                        },
                        onInit: function () {
                          this.open()
                        },
                        onCloseComplete: function () {
                          this.destroy()
                        }
                      }) */
                    }
                    break
                  }
                }

                if (!item_found) {
                  let the_data = JSON.parse(JSON.stringify(Object.assign({}, prepData)) ) ;

                  let relevant_keys = ['selected_qty', 'selected_price', 'code', 'extra_request_inputs'] ;
                  Object.keys(the_data).forEach(function (v) {
                    if (relevant_keys.indexOf(v) == -1) {
                        delete the_data[v]
                    }
                  })

                  // console.log('the data', the_data) ;
                  cart_item_items.push(the_data)
                  vm.overwrite_cart(cart)
                  vm.modal_comp_open = false
                }
                break
              }
            }

            /* console.log('cart', cart)
            console.log('cart item', cart_item )
            console.log('cart item items',cart_item_items) */
          },
          overwrite_cart: function (cart) {
            return this.$store.dispatch('merchant/overwrite_cart', cart)
        },

    }
}
</script>

<style lang="scss">
.modal-header, .modal-footer{
    background: #fafafa
}

.modal-footer{
    border-radius: 0 0 4px 4px ;
}
.blue-confirmButton .jBox-Confirm-button-submit {
    background: var(--primary);
}
</style>
