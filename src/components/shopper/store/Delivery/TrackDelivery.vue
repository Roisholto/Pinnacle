<template lang="html">
  <StoreLayout>
    <div>
      <div class="mx-auto" style="max-width:300px">
        <v-text-field
          name="ref"
          label="InvoiceID"
          placeholder=""
          hint="Please input your Invoice-ID"
          v-model="search_text"
          solo
          hide-details
          dense
          :loading="requesting"
          >
          <v-btn slot="append" icon @click="search">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-text-field>
      </div>

      <div class="py-2"></div>

      <v-skeleton-loader
        class="mx-auto my-2"
        width="400" elevation="2"
        type="list-item-two-line"
        v-if="requesting">
      </v-skeleton-loader>
      <v-card class="mx-auto my-2" width="400" v-else>
        <v-card-text class="" v-if="resultValid" > <!--searchResult.succ-->
          <div class="text-uppercase">{{searchResult.inv_id}}</div>
          <DeliveryStatus :data="searchResult" />
        </v-card-text>
      </v-card>

      <v-snackbar v-model="snackbar.show" color="error">
        {{snackbar.message}}
      </v-snackbar>
    </div>
  </StoreLayout>
</template>
<script>
import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;
import StoreLayout from '@/layouts/storeLayout.vue' ;
import DeliveryStatus from './DeliveryStatus.vue' ;

export default {
  name:"TrackDelivery",

  data(){
    return {
      search_text:null,
      requesting:false,
      searchResult:{},
      snackbar:{
        show:false,
        message:''
      }
    }
  },

  computed:{
    resultValid(){
      let rt = false ;
      if(Object.keys(this.searchResult).length){
        console.log('here') ;
        if(this.searchResult.ref){
          rt= true
          console.log('made it here') ;
        }
      }
      return rt ;
    }
  },

  components:{
    StoreLayout,
    DeliveryStatus
  },

  methods:{
    search(){
      let url = `${API_ENDPOINT}/delivery/status/shopper/${Core.merchant}?text=${this.search_text}` ;
      let options = Core.set_fetch_headers() ;
      let vm = this ;
      this.searchResult = {}
      this.requesting = true ;
      fetch(url, options)
        .then(r=>r.json())
        .then(json=>{
          // vm.searchResult = j
          if(json.succ){
            vm.searchResult=json.data
          }
          else{
            vm.snackbar.message = json.description ;
            vm.snackbar.show = true ;
          }
        })
        .catch(e=>{
          console.log('error  fetching status', e)
        })
        .finally(()=>{
          vm.requesting = false ;
        })
    }
  }
}
</script>
