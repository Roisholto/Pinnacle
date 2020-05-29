<template>
  <storeLayout>
    <v-sheet class="d-flex justify-center flex-column py-3">
      <div class="pb-3 text-center">
        <v-icon color="primary" class="animate__animated animate__tada" size="62">
          mdi-emoticon-sad-outline
        </v-icon>
      </div>
      <div class="body-1 text-center">
        Oops! No offers available, Check out later.
      </div>
    </v-sheet>
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue' ;

export default {
  name:"Offers",

  data(){
    return {}
  },

  components:{
    storeLayout
  }
}
</script>
