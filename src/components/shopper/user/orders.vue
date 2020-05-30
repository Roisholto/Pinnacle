<template>
    <userLayout>

            <v-data-iterator class="w-100"
                :items="main_orders"
                :page="gridOptions.page"
                :items-per-page="gridOptions.itemsPerPage"
                :server-items-length="isSessionActive ? fetched_orders.record.total : -1"
                :footer-props="{'disable-items-per-page':true}"
                :loading="gridOptions.loading"
                hide-default-footer
                @pagination="gridPaginationEvent"
                >

                <template v-slot:header>
                    <div class="mt-2 d-flex justify-space-between white" dark>
                        <div class="">

                        </div>
                        <div class="">
                            <span  class="mr-4 caption grey--text ">
                                Page {{ gridOptions.page }} of {{ numberOfPages }}
                            </span>
                            <v-btn
                                light
                                icon
                                class="mr-1"
                                :disabled="gridOptions.page == 1"
                                @click="formerPage">
                                <v-icon color="">mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn
                                light
                                icon
                                class="ml-1"
                                :disabled="gridOptions.page == numberOfPages"
                                @click="nextPage">
                                <v-icon color="">mdi-chevron-right</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </template>

                <v-skeleton-loader slot="loading" :type="grid_skeleton_type"></v-skeleton-loader>

                <template v-slot:default="props">
                    <v-list dense class="remove-last-border" :two-line="$vuetify.breakpoint.smAndUp" :three-line="$vuetify.breakpoint.xs">
                        <template v-for="(single_order, index) in props.items">
                            <v-list-item :key="single_order.inv_id" @click="show_detail(single_order)">
                                <v-list-item-avatar style="margin-right:12px">
                                    <template v-if="single_order.merchant">
                                        <v-img :src="single_order.merchant.icon"></v-img>
                                    </template>
                                    <template v-else>
                                        <v-skeleton-loader
                                            type="avatar"
                                            class="mx-auto"
                                          ></v-skeleton-loader>
                                    </template>
                                 </v-list-item-avatar>

                                <v-list-item-content>
                                    <div class="d-flex flex-column flex-sm-row">
                                        <v-list-item-title class="align-self-start text-uppercase">{{single_order.inv_id }}</v-list-item-title>
                                        <div class="d-none d-sm-block">
                                            <v-list-item-title class="text-uppercase ">{{naija_currency(single_order.amount)}}</v-list-item-title>
                                        </div>
                                    </div>
                                    <v-list-item-title class="text-uppercase d-sm-none">{{naija_currency(single_order.amount)}}</v-list-item-title>
                                    <div class="d-flex">
                                        <template v-if="single_order.merchant">
                                            <v-list-item-subtitle >{{single_order.merchant.name}}</v-list-item-subtitle>
                                        </template>
                                        <template v-else>
                                            <v-skeleton-loader
                                                type="text"
                                                class="mx-auto"
                                              ></v-skeleton-loader>
                                        </template>
                                        <v-list-item-subtitle class="text-right pl-2-sm">{{get_date(single_order.created)}}</v-list-item-subtitle>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider inset style=""/>
                        </template>
                    </v-list>
                </template>


            </v-data-iterator>

            <v-dialog v-model="showModal" ref="detailModal" fullscreen scrollable>
                <v-card tile>
                    <v-card-title class="pa-0">
                        <v-toolbar dark color="primary">
                          <v-btn icon dark @click="showModal = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title class="text-uppercase">{{modal_title}}</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                    </v-card-title>
                    <v-card-text style="height:calc(100vh - 56px);">
                        <v-sheet>
                            <component :is="modalComp" v-bind="modalCompProps"/>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-dialog>
    </userLayout>
</template>
<script>
// holds users orders> a superset of transactions
import '../../common/item/order-item.js'
import orderDetail from './order-detail.vue'
import moment from 'moment'
import { mapState } from 'vuex'
import { naija_currency } from '@/functions/to_currency.js'
import singleOrder from './single-order.vue'
import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;
import {mapGetters} from 'vuex' ;
import userLayout from '@/layouts/userLayout.vue' ;

export default {
    name:"Orders",
  data: function () {
    return {
      modalComp: 'none', // | order-detail
      modalCompProps: {},
      showModal:false,
      fetched_orders:{
          invoice:[],
          record:{start:0, total:0}
      },

      gridOptions:{
          page:1,
          itemsPerPage:50,
          loading:false
      }
     }
  },
  components: {
    'single-order': singleOrder,
    'order-detail': orderDetail,
    'none': { template: `<div></div>` },
    userLayout
  },
  computed: {
    ...mapGetters({
        getOutlet:'outlets/getOutlet',
        isSessionActive:'user/isSessionActive'
    }),
    vuetify(){
        return this.$vuetify;
    },
    //
    grid_skeleton_type(){
        let text = 'list-item-avatar-two-line';
        let count = this.gridOptions.itemsPerPage
        let arr = new Array(count)
        arr.fill(text, 0, count)
        return arr.join(',') ;

    },

    orders () {
      return this.$store.state.user.orders
    },

    orders_(){
        return this.fetched_orders.invoice ? this.fetched_orders.invoice : []
    },

    main_orders(){
        return this.isSessionActive ? this.orders_ : this.orders ;
    },

    modal_title () {
      let title = ''
      if (this.modalCompProps.order) { title = this.modalCompProps.order.inv_id }

      return title
    },

    numberOfPages () {
        return !this.isSessionActive ?
            Math.ceil(this.main_orders.length / this.gridOptions.itemsPerPage)
            :
            Math.ceil(this.fetched_orders.record.total/this.gridOptions.itemsPerPage)

      },
  },
  watch:{
      showModal:function(v){
          this.modalComp = v ? 'order-detail' : 'none' ;
          }
      },
  mounted:function(){
    
  },
  methods: {
      naija_currency,
      get_date:function(x){
          return moment.unix(x).format('DD/MM/YYYY HH:mm')
      },
      fetch_orders:function(start=0, display=1){

          let url = `${API_ENDPOINT}/invoice/shopper?start=${start}&display=${display}` ;
          let headers = Core.set_fetch_headers() ;
          let vm = this ;
          this.gridOptions.loading = true ;
          vm.fetched_orders.invoice = [] ;

          fetch(url, headers)
            .then(function(resp){
                return resp.json()
            })
            .then(function(resp){

                if(!('error' in resp))
                    {
                    vm.fetched_orders = resp ;
                    console.log('error not found') ;
                    if(resp.invoice.length)
                        {
                        let m_ids = [] ;
                        let outlet_exist ;
                        const invoices = resp.invoice ;

                        invoices.forEach(function(v){
                            v.ref = v.payment_ref ;
                            outlet_exist = vm.getOutlet(v.m_id) ;
                            if(!outlet_exist)
                                {
                                m_ids.push(v.m_id);
                                }
                            else
                                {
                                v.merchant = outlet_exist ;
                                }
                            }) ;

                        // fetch stores
                        if(m_ids.length)
                            {
                            console.log('m_ids is length') ;
                            let clause = JSON.stringify({
                                    mid:{
                                        data:m_ids,
                                        factor:'equalto'
                                    }
                                })

                            let url = `${API_ENDPOINT}/stores/shopper?clause=${clause}` ;
                            // let options = Core.set_fetch_headers() ;
                            fetch(url)
                                .then(function(resp){
                                    return resp.json()
                                    })
                                .then(function(json){
                                    if(!('error' in json))
                                        {
                                        let dt = {}
                                        json.forEach(function(v){
                                            dt[v.mid] = v ;
                                        })

                                        invoices.forEach(function(v){
                                            if(!('merchant' in v) || ! v.merchant)
                                                {
                                                v.merchant = dt[v.m_id] ;
                                                }
                                            })

                                        vm.$forceUpdate() ;
                                        vm.$store.commit('outlets/add_item', dt)
                                        }

                                    })
                                .catch(function(e){
                                    console.log('error fetching store', e)
                                })
                            }
                        }
                    }
                else
                    {
                    console.log('error found');
                    }
            })
        .catch(function(e){
            console.log('error fetching invoices', e) ;
        })
        .finally(function(){
            vm.gridOptions.loading = false ;
        })
      },
      show_detail (dt) {
          this.modalCompProps = { order: dt}
          if(dt.tracking)
            {
            console.log('tracking')
            if(! this.isSessionActive)
                {
                console.log('session inactive')
                let url = `${API_ENDPOINT}/invoice/tracking?token=${encodeURIComponent(dt.tracking)}` ;
                fetch(url)
                    .then((resp)=>resp.json())
                    .then(resp=>{
                        if(resp.invoice)
                            {
                            this.modalCompProps.order = Object.assign(this.modalCompProps.order, resp.invoice) ;
                            }
                        else
                            {
                            //could not fetch
                            }
                    })
                    .catch(e=>{
                        console.log('error fetchin track', e)
                    })
                }
            else
                {
                console.log('session active')
                }
            }
        else
            {
            console.log('no tracking')
            }
          this.showModal = true ;

      },
      nextPage () {
        if (this.gridOptions.page + 1 <= this.numberOfPages) this.gridOptions.page += 1
      },
      formerPage () {
        if (this.gridOptions.page - 1 >= 1) this.gridOptions.page -= 1
      },
      gridPaginationEvent(ev){
         if(this.isSessionActive)
            {

            let start = ev.itemsPerPage*(ev.page-1) ;
            let display = ev.itemsPerPage ;
            //if(start < ev.itemsLength)
            this.fetch_orders(start, display)
            }
        else
            {

            }
      }
    }
}


</script>
