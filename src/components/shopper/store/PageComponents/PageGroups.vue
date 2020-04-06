<template>
  <Slick class="" :options="slickOptions" v-if="group.pages">
    <div class="pa-4" v-for="(page, i) in group.pages" :key="i">
      <v-card
      max-width="400">
        <v-img
        class="white--text align-end"
        height="160px"
        :src="page.featured_image">
        </v-img>

        <v-card-title>
          {{page.title}}
        </v-card-title>

        <v-card-text>
          {{page.excerpt}}
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text :to="{name:'merchant-pages', params:{id:page.id, data:page}} " color="primary">
            Browse
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </Slick>
  <div class="" v-else>
    <div class="justify-center d-flex align-center" style="min-height:50px" v-if="fetching">
      <v-progress-circular color="primary" indeterminate/>
    </div>
  </div>
</template>
<script>
import Slick from 'vue-slick'
import {API_ENDPOINT} from '@/constants.js' ;

export default {
 name:"PageGroups",

 props:{
   name:String
 },

 data:function(){
   return {
     slickOptions:{
       infinite: true,
       slidesToShow: 3,
       slidesToScroll: 3,
       arrows: true,
       autoplay:true,
       autoplaySpeed:4000,
       responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              centermode:true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
     },

     group:{},
     fetching:false,
   }
 },

 components:{
   Slick
 },

 mounted(){
   let group = this.$store.getters["merchant/pageComponents/getPageGroup"](this.name) ;
   if(group)
     {
     this.group = group
     }
   else
     {
     console.log(this.$route)
     let mid = this.$route.params.storeid || this.mid   ;
     let url = `${API_ENDPOINT}/components/shopper/${mid}/page-groups/${this.name}`;
     let vm = this
     vm.fetching = true
     fetch(url)
       .then(function(r){
         return r.json() ;
       })
       .then(function(r){
         if(r.succ){
           vm.$store.commit('merchant/pageComponents/add_page_group', r.data.pagegroup)
           vm.group = r.data.pagegroup ;
         }
       })
       .catch(function(e){
         console.log('error fetching page', e)
       })
       .finally(function(){
         vm.fetching = false ;
       })
     }
   },

}
</script>
