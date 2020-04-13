<template>
  <v-sheet class="pa-4" light>
    <h1 class="display-2 mb-2">Reach us</h1>
    <h3 class="headline mb-4">Got some complaints, request or enquiry? We are here for you.</h3>

    <div class="">
      <AlternateContact />
    </div>
  </v-sheet>

</template>
<script>
import AlternateContact from './AlternateContact.vue' ;
export default {
  name:"Default",

  props:{
    contact:Object
  },

  components:{
    AlternateContact
  },

  mounted(){
    //fetch alternatevcontact
  },




}
</script>
