import orderItem from './order-item.js'
import { naija_currency } from '@/functions/to_currency.js'

const orderItems = {
  props: ['items'],
  computed: {
    packed_items: function () {
      const n_items = {}
      this.items.forEach(function (v) {
        if (v.pack in n_items) {
          n_items[v.pack].push(v)
        } else {
          n_items[v.pack] = [v]
        }
      })

      console.log('packed items ', n_items)
      return n_items
    },
    grand_total: function () {
      let total = 0
      this.items.forEach(function (v) {
        total += (v.price * v.qty)
      })

      return total
    }
  },
  components: {
    orderItem
  },
  template: `<div>
                <div class="mb-2" v-for="(items, pack, m_index) in packed_items " v-bind:key="m_index">
                    <div class="border remove-last-border rounded pa-2">
                        <div class="d-flex justify-content-between mb-2">
                            <div class="">{{pack}}</div>
                        </div>

                        <div class="border-bottom py-3" v-for="(item,index) in items" v-bind:key="index">
                            <order-item v-bind:item="item"></order-item>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <div class="py-1">Grand Total : <span class="" style="font-weight:bold; font-size:17px">{{naija_currency(grand_total)}}</span> </div>
                </div>
            </div>`,
  methods: {
    naija_currency: function (v) {
      return naija_currency(v)
    }
  }
}

export default orderItems
