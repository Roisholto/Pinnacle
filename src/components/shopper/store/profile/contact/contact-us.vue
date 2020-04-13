<template>
  <storeLayout>
    <template v-if="!page">
      <Default />
    </template>
    <template v-else>
      <PageTemplate :content="page.content"/>
    </template>
  </storeLayout>
</template>
<script>
import Default from './default' ;
import {mapGetters} from 'vuex' ;
import storeLayout from '@/layouts/storeLayout.vue' ;
import PageTemplate from '@/components/shopper/Pages/PageTemplate.vue' ;

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
