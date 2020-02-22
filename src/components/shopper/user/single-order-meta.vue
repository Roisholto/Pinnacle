<template>
    <div class="col d-flex flex-column align-center single-order-meta">
          <div class="meta-header small text-capitalize"><slot name="header-icon"></slot> {{name}}</div>
          <div class="meta-status">
              <slot name="status-icon">
                  <v-icon
                    :color="value ? 'success' : 'grey' "
                    class=""
                    style>
                    {{icon}}
                    </v-icon>
              </slot>
          </div>
          <slot name="footer"></slot>
      </div>
</template>
<script>
import moment from 'moment'
const publicPath = process.env.BASE_URL
// Check single meta behaiour with truncate ;
export default {
name:"singleOrderMeta",
  props: ['name', 'value', 'display'], // name, value-> 0|1
  computed: {
    icon: function () {
      let icon = !this.value ? `mdi-check-outline`
            :
            'mdi-check-bold'
      return icon
    }
  },
  template: ``
}
</script>
