<template lang="html">
  <div>
    <v-progress-circular indeterminate color="primary" size="18" width="2" v-if="requesting"/>
    <DeliveryStatus :data="data" v-else />
  </div>
</template>

<script>
import DeliveryStatus from './DeliveryStatus.vue' ;
import {getStatus} from '@/api/delivery.js' ;

export default {
  name:"GetDeliveryStatus",

  props:{
    text:{
      type:String,
      required:true
    }
  },

  data(){
    return {
      data:{},
      requesting:false
    }
  },

  computed:{

  },

  components:{
    DeliveryStatus
  },

  mounted(){
    this.search_() ;
  },

  methods:{
    search_(){
      let vm = this ;
      this.requesting = true ;
      getStatus(this.text)
        .then(r=>r.json())
        .then(json=>{
          // vm.searchResult = j
          if(json.succ){
            vm.data=json.data
          }
          else{
            // vm.snackbar.message = json.description ;
            // vm.snackbar.show = true ;
          }
        })
        .catch(e=>{
          console.log('error fetching delivery status', e)
        })
        .finally(()=>{
          vm.requesting = false ;
        })
    }
  }

}
</script>

<style lang="css" scoped>
</style>
>
