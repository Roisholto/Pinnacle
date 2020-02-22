<template>
    <div class=""
        <div v-if="quotationOkay" class=" text-center">
            {{naija_currency(quotationOkay.charge)}}
        </div>
        <div class="text-danger text-center" v-else>
            <div class="text-danger text-center" v-if="quotation.error">
                {{quotation.description}}
            </div>
        </div>
    </div>
</template>
<script>
import { naija_currency } from '@/functions/to_currency.js'
import { mapGetters } from 'vuex'

export default {
  name: 'quotationInfo',
  data: function () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      'quotationOkay': 'merchant/cartExtras/isDeliveryQuotationOkay',
      quotation: 'merchant/cartExtras/getQuotation'
    })

  },
  methods: {
    naija_currency: naija_currency
  }
}
</script>
