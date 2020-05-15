<template>
  <storeLayout>
    <template v-if="!page">
      <Default />
    </template>
    <template v-else>
      <PageRenderer :template="page.content"></PageRenderer>
    </template>
  </storeLayout>
</template>
<script>
import Default from './default' ;
import {mapGetters} from 'vuex' ;
import storeLayout from '@/layouts/storeLayout.vue' ;
import PageRenderer from '@/components/shopper/Pages/PageRenderer.js' ;

export default {
  name:"ContactUs",

  data(){
    return {}
  },

  computed:{
    page(){
       return this.$store.state.merchant.pages.pages.contact ;
    }
  },

  components:{
    Default,
    storeLayout,
    PageTemplate
  },

  methods:{

  }
}
</script>
