import singleItem from './single-item.vue'
import { naija_currency } from '@/functions/to_currency.js'
export const orderItem = {
  props: ['item'],
  components: {
    singleItem
  },
  template: `<div class="d-flex align-center">
                <div class="col-7 px-0 pr-2">
                    <single-item v-bind:item="item" v-bind:mode="'invoice'"></single-item>
                </div>
                <div class="col-3 px-0 pr-2 text-right">
                    <div class="small">{{naija_currency(item.price * item.qty)}}</div>
                </div>
                <div class="col-2 px-0 pr-2 text-right">
                    <div class="small">{{item.qty}}</div>
                </div>
            </div>`,
  methods: {
    naija_currency: function (v) {
      return naija_currency(v)
    }
  }
}

export default orderItem
