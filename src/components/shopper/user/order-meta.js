import moment from 'moment'
import singleOrderMeta from './single-order-meta.vue'
const publicPath = process.env.BASE_URL

export const orderMeta = {
  props: ['meta'],
  components: {
    'single-order-meta': singleOrderMeta
  },
  computed: {
    meta_pair: function () {
      const arr = []

      const vm = this
      Object.keys(this.meta).forEach(function (key) {
        let data = {}
        data.name = key
        data.value = vm.meta[key]
        data.display = vm.meta[key]
        data.key = key

        if (key == 'home_delivery') {
          data.name = 'home delivery'
        } else if (key == 'preordered') {
          data.display = moment.unix(vm.meta[key]).format('lll')
        }

        arr.push(data)
      })

      return arr
    }
  },
  template: `<div class="d-flex order-metas">
                <single-order-meta class="" v-bind="item" v-for="item in meta_pair" v-bind:key="item.key">
                    <div slot="footer" class="meta-display small">{{item.display}}</div>
                </single-order-meta>
            </div>`
}

export default orderMeta
