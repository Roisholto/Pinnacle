<template>
  <div class="">
    <div v-if="quotationOkay" class=" text-center">
      {{naija_currency(quotationOkay.charge)}}
    </div>
    <div class="text-danger text-left" v-else>
      <div class="text-danger text-center pb-2" v-if="quotation.error">
        {{quotation.description}}
      </div>
      <div class="black--text">
        Check out the
        <a href="javascript:;"
          class="primary--text"
          @click="show_dialog=true">
          places
        </a>
        we deliver to.
      </div>
    </div>
    <v-dialog v-model="show_dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Delivery Areas</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="px-0" style="height:300px">
          <LocationsList/>
        </v-card-text>
        <v-card-actions class="justify-end" @click="show_dialog=false">
          <v-btn text color="primary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { naija_currency } from '@/functions/to_currency.js'
import { mapGetters } from 'vuex'
import LocationsList from '@/components/shopper/store/DeliveryLocations/LocationsList' ;

export default {
  name: 'quotationInfo',
  data: function () {
    return {
      show_dialog:false
    }
  },
  computed: {
    ...mapGetters({
      'quotationOkay': 'merchant/cartExtras/isDeliveryQuotationOkay',
      quotation: 'merchant/cartExtras/getQuotation'
    })
  },

  components:{
    LocationsList
  },

  methods: {
    naija_currency: naija_currency
  }
}
</script>
