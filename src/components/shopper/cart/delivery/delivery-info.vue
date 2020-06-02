<template>
    <storeLayout>
        <transition>
            <div class="" v-if="!show_address_selector">
                <div class="d-flex py-2" ref="addressMenu">
                    <router-link :to="{name:'cart'}" class="d-block">
                        <v-icon color="primary ">
                            mdi-arrow-left
                        </v-icon>
                    </router-link>
                </div>
                <v-card class="mx-auto" style="max-width:35rem">
                    <v-card-title>
                        Delivery info
                    </v-card-title>
                    <form class="pa-4"  v-on:submit.prevent="submitForm" >
                        <div class="my-2">
                            <v-text-field
                                v-model="contactPhone"
                                placeholder="mobile number"
                                required
                                type="tel"
                                inputmode="tel"
                                label="Phone number"
                                hint="This is where we will contact you for delivery updates"
                                />
                        </div>
                        <div class="my-2">
                            <v-text-field
                                v-model="contactName"
                                placeholder="Your name"
                                required
                                label="Full name"
                                hint="This is how we will address you"
                                />
                        </div>
                        <div class="my-2">
                            <v-text-field
                                type="address"
                                name="address"
                                placeholder="Street address"
                                v-model="locationInfo.full_address"
                                v-on:click="shouldShowAddress()"
                                readonly
                                required
                                label="Full address"
                                hint="This is where we will deliver to"
                                >
                                <v-icon v-on:click="shouldShowAddress()" slot="append" color="red">
                                    mdi-map-marker
                                </v-icon>
                            </v-text-field>
                        </div>
                        <div class="">
                            <!-- Display quotation info here -->
                            <quotationInfo />
                        </div>
                        <div class="my-3">
                            <v-btn type="submit" color="primary" block>
                                Done
                            </v-btn>
                        </div>
                    </form>
            </v-card>
            <!--TODO
            handle case where the saved_locations returns an error
            -->
            <v-dialog
                max-width="30em"
                v-model="show_address_options_picker"
                :persistent="requesting_quotation_from_saved_locations"
                >
                <v-card :color="requesting_quotation_from_saved_locations ? 'primary' : ''">
                    <v-card-title v-if="!requesting_quotation_from_saved_locations">
                        Address
                    </v-card-title>
                    <v-card-text v-if="!requesting_quotation_from_saved_locations">
                        <div class="mb-4">
                            <v-btn
                                block
                                color="red"
                                class="white--text"
                                @click="[show_address_selector=true, show_address_options_picker=false]"
                                >
                                mark location
                            </v-btn>
                        </div>
                        <div class="">Saved locations</div>
                        <v-list dense style="overflow:auto; max-height:240px">
                            <singleLocation
                                v-for="location in saved_locations.locations"
                                :single_location="location"
                                :key="location.id"
                                :showActionMenu="false"
                                @click="savedLocationClicked(location)"
                                />
                        </v-list>
                    </v-card-text>
                    <v-card-text class="text-center" v-else>
                        <span class="white--text">requesting quotation</span>
                        <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                          ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>

        </div>
        </transition>
        <transition>
            <addressPicker v-if="show_address_selector" :sent_coords="locationInfo.coords" v-on:back-button-clicked="addressPickerBackButtonEvent"/>
        </transition>

        <v-dialog v-model="show_save_address_suggestion_dialog" max-width="30em">
            <v-card>
                <v-card-title>
                    Save Address
                </v-card-title>
                <v-card-text style="color:rgba(0, 0, 0, 0.8);">
                    Why don't you save the address for reuse.
                </v-card-text>
                <v-card-actions>
                     <v-spacer></v-spacer>
                    <v-btn color="primary" text @click.stop="show_save_address_suggestion_dialog = false">
                        Ignore
                    </v-btn>
                    <v-btn color="primary" text :to="{name:'add-saved-locations', params:save_address}">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </storeLayout>
</template>
<script>
// module handles selecting address for delivery
//

import done from '@/components/common/more-radius-button.js'
import { mapState, mapGetters } from 'vuex'
import addressPicker from './address-picker.vue'
import quotationInfo from './quotation-info'
import storeLayout from '@/layouts/storeLayout.vue' ;
import singleLocation from '@/components/shopper/user/saved-locations/single-location.vue'
import {getQuotation} from '@/api/shopper.quotation.js' ;
import haversine_distance from '@/functions/haversine_distance.js' ;


export default {
  name: 'deliveryInfo',
  data: function () {
    return {
      show_address_selector: false,
      show_address_options_picker: false,
      requesting_quotation_from_saved_locations:false,
      show_save_address_suggestion_dialog:false,
      save_address:{},
      form: {
        name: '',
        phone: '',
        address: {
          coords: {},
          full_address: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
          isSessionActive:'user/isSessionActive'
      }),
    ...mapState({
        saved_locations:(state)=>state.user.saved_locations,
      deliverySettings: (state) => {
        return {
          handle_delivery: state.merchant.pref.handle_delivery,
          home_delivery: state.merchant.pref.home_delivery,
        }
      },
      currentDeliveryInfo: (state) => state.merchant.cartExtras.delivery.info
    }),

    contactName: {
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_delivery_info', { name: n })
        // this.$store.state.merchant.cartExtras.delivery.info.name ;
      },
      get: function () {
        return this.currentDeliveryInfo.name
      }
    },

    contactPhone: {
      set: function (n) {
        this.$store.commit('merchant/cartExtras/update_delivery_info', { phone: n })
      },
      get: function () {
        return this.currentDeliveryInfo.phone
      }
    },

    locationInfo: {
      get: function () {
        return this.currentDeliveryInfo.location
      }
    },

    stylizePhone: {
      set: function (v) {
        this.phone = v
      },
      get: function () {
        let s = this.phone.split()
      }
    },


  },
  components: {
    done,
    addressPicker,
    quotationInfo,
    storeLayout,
    singleLocation
  },
  mounted: function () {
    this.form = Object.assign({}, this.form, this.currentDeliveryInfo)
  },
  beforeDestroy: function () {

  },
  methods: {
    submitForm: function () {
      // ensure all fields are filled and valid ;
      // confirm if the merchant delivers to that area ;
      this.$router.push({ name: 'cart' })
    },

    addressPickerBackButtonEvent:function(){
        console.log('addr back btn')
        this.show_address_selector = false ;
        // now check if address is not in currently saved addresses ;
        if(this.isSessionActive)
            {
            console.log('session active in addrpicker')
            let locs = this.saved_locations.locations ;
            if(locs)
                {
                    console.log('locs valid')
                // show dialog to save the location ;
                let cl, dist ;
                let curr_dlv_loc = this.currentDeliveryInfo.location.coords ;
                let found = false ;
                for(let i=0; i < locs.length ; i++)
                    {
                    cl = locs[i].place.coords ;
                    console.log('looping locs', i , cl)
                    dist = haversine_distance(curr_dlv_loc.lat, curr_dlv_loc.lng, cl.lat, cl.lng, 'K')
                    console.log('distance', dist) ;
                    // if distance is over 100m
                    if(dist < 0.1)
                        {
                        found = true ;
                        break ;
                        }
                    }

                if(!found)
                    {
                    this.save_address = {
                        closeOnComplete:false,
                        value:{
                            label:'',
                            place:{
                                coords:this.currentDeliveryInfo.location.coords,
                                address:this.currentDeliveryInfo.location.full_address
                            }
                        }
                    }


                    this.show_save_address_suggestion_dialog = true ;
                    }
                else
                    {
                    console.log('found not found')
                    }
                }
            else
                {

                }
            }
        else
            {
            console.log('session not active',)
            }
    },

    shouldShowAddress:function(){
        if(this.isSessionActive && this.saved_locations.locations && this.saved_locations.locations.length){
            this.show_address_options_picker = true ;
            }
        else
            {
            this.show_address_selector = true ;
            }
    },
    savedLocationClicked:function($ev){
        let loc = {
            coords:$ev.place.coords,
            full_address:$ev.place.address
        }

        this.$store.commit('merchant/cartExtras/update_delivery_info', { location: loc })
        this.requesting_quotation_from_saved_locations = true
        let vm = this
        getQuotation(loc)
            .then(function(resp){return resp.json()})
            .then(function(json){
                vm.$store.commit('merchant/cartExtras/update_quotation', json)
            })
            .finally(function(){
                vm.requesting_quotation_from_saved_locations = false;
                vm.show_address_options_picker = false ;
            })
    }

  }

}
</script>
