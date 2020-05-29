<template>
  <storeLayout>
    <v-card max-width="600" class="mx-auto" elevation="3">
      <v-card-text>
        <openingHours />
      </v-card-text>
    </v-card>
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue'
import openingHours from '@/components/shopper/store/profile/opening-hours.vue' ;

export default {
  name:"Page",

  data(){
    return {}
  },

  components:{
    storeLayout,
    openingHours
  },


  methods:{

  }
}
</script>
