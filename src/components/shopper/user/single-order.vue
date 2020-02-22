<template>
    <div class="single-order d-flex flex flex-column py-2">
        <div class="d-flex py-1 align-center cursor-pointer " v-on:click="$emit('detail-clicked')">
            <div class="d-block text-truncate col pl-0 pr-2 text-uppercase">{{order.inv_id}}</div>
            <div class="col pl-0 pr-2 text-right">{{naija_currency(order.amount)}}</div>
            <div class="col pl-0 pr-2 text-right small text-truncate">{{get_date()}}</div>
            <slot name="right"></slot>
        </div>
        <div class="footer small font-weight-light py-1">
            <div class="pr-2 mr-1 text-truncate font-weight-bold">{{order.merchant.name}}</div>
            <div class="flex-grow-1 text-truncate text-capitalize">
                <v-icon color="red">
                    mdi-map-marker
                </v-icon>
                {{order.merchant.address}}
            </div>
        </div>
        <slot name="footer"></slot>
    </div>
</template>
<script>
// holds users orders> a superset of transactions
import moment from 'moment'
import { naija_currency } from '@/functions/to_currency.js'

export default {
    name:"singleOrder",
  props: ['order'],
  methods: {
    get_date: function () {
      return moment.unix(this.order.created).format('DD/MM/YYYY HH:mm')
    },
    naija_currency: naija_currency
  }
}
</script>
