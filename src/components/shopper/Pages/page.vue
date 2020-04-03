<template>
  <BlankPageLayout>
    <div id="page-template" v-html="page.content"></div>
    <div v-if="requesting" class="d-flex align-center flex-column">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <span class="body-2">Fetching content</span>
    </div>
    <template v-else>
      <div class="text-center text-capitalize display-1" v-if="error.message">
        {{error.message}}
      </div>
      <div v-else>
        <pageTemplate></pageTemplate>
      </div>
    </template>
  </BlankPageLayout>
</template>
<script>
import BlankPageLayout from '@/layouts/BlankPageLayout.vue'
import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;
import QuickBlog from '@/components/shopper/store/quick-blog.vue' ;
import '@/components/globals.js' ;

export default {
  name:"Page",

  props:{
    id:{
      type: Number | String,
      required: true
      }
  },


  data(){
    return {
      requesting:true,
      page:{
        title:'',
        content:''
      },
      error:{

      }
    }
  },

  computed:{
    merchantId(){
      return this.$store.state.merchant.info.mid
    }
  },

  components:{
    BlankPageLayout,
    pageTemplate:{
      components:{
        QuickBlog
      },
      template:'#page-template'
    }
  },

  mounted(){
  let vm = this ;
    this.$nextTick(function(){
      vm.fetchPage()
    })

  },

  methods:{
    fetchPage(){
      console.log(localStorage.getItem('merchantId')) ;
      let url = `${API_ENDPOINT}/pages/shopper/${this.$route.params.storeid}/${this.id}` ;
      let vm = this ;
      vm.requesting = true ;
      fetch(url)
        .then(function(r){
          return r.json()
        })
        .then(function(r){
          if(r.succ)
            {
            vm.page = r.data
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
