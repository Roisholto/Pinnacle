<template>
  <v-dialog
     v-model="dialog"
     persistent
     width="300"
   >
     <v-card
       color="primary"
       dark
     >
       <v-card-text class="text-center">
         Please stand by
         <v-progress-linear
           indeterminate
           color="white"
           class="mb-0"
         ></v-progress-linear>
       </v-card-text>
     </v-card>
   </v-dialog>
 </template>
 <script>

 export default{
   name:"RouteLoadingOverlay",

   computed:{
     dialog:{
       get(){
         return this.$store.state.ui.loadingRoute ;
       },

       set(x){
         this.$store.commit('ui/setLoadingRoute', x)
       }
     }
   }
 }
 </script>
