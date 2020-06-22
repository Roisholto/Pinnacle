<template>
  <storeLayout>
    <div v-if="requesting" class="d-flex align-center flex-column">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="body-2">Fetching content</span>
    </div>
    <template v-else>
      <div class="text-center text-capitalize display-1" v-if="error.message">
        {{error.message}}
      </div>
      <div v-else>
        <PageRenderer :template="page.content" v-if="page.content"></PageRenderer>
        <div v-else></div>
      </div>
    </template>
  </storeLayout>
</template>
<script>
import storeLayout from '@/layouts/storeLayout.vue'
import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;
import QuickBlog from '@/components/shopper/store/quick-blog.vue' ;
import '@/components/globals.js' ;
import Vue from 'vue' ;
import PageRenderer from './PageRenderer.js' ;

export default {
  name:"Page",

  props:{
    id:{
      type: Number | String,
      required: true
    },

    html:Boolean,

    data: {
      type: Object
    }
  },

  beforeRouteUpdate(to, from, next){
    this.requesting = false ;
    this.page = {
      title:'',
      content:''
    }
    this.error = {}
    next()
  },


  data(){
    return {
      requesting:false,
      page:{
        title:'',
        content:''
      },
      error:{}
    }
  },

  computed:{
    merchantId(){
      return this.$store.state.merchant.info.mid
    }
  },

  components:{
    storeLayout,
  },

  watch:{
    id(nv){
      let vm = this ;
      this.$nextTick(function(){
        vm.fetchPage()
      })
    }
  },

  mounted(){
  let vm = this ;
  if(this.data)
    {
    this.page = Object.assign({}, this.data) ;
    }
  else
    {
    this.$nextTick(function(){
      vm.fetchPage()
    })
    }
  },

  methods:{
    fetchPage(){
      console.log(localStorage.getItem('merchantId')) ;
      let url = `${API_ENDPOINT}/pages/shopper/${this.$route.params.storeid}/${this.id}` ;
      let vm = this ;
      vm.requesting = true ;
      return fetch(url)
        .then(function(r){
          return r.json()
        })
        .then(function(r){
          if(r.succ)
            {
            vm.page = Object.assign({}, r.data, {content:'<div class="page-content">'+r.data.content+'</div>'})
            }
          else
            {
            vm.error.message =  r.description
            }
        })
        .catch(function(e){
          console.log('error retrieving page', e)
        })
        .finally(function(){
          vm.requesting = false
        })
    }
  }
}
</script>
