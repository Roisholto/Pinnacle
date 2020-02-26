<template>
  <Slick :options="slickOptions">
      <div class="pa-4" v-for="(entry, i) in entries" :key="i">
        <v-card
        max-width="400">
          <v-img
          class="white--text align-end"
          height="160px"
          :src="entry.image">
          </v-img>

          <v-card-title>
            {{entry.title}}
          </v-card-title>

          <v-card-text>
            {{entry.content}}
          </v-card-text>

          <v-card-actions class="justify-end">
            <v-btn text color="primary">
              Browse
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

  </Slick>
</template>
<script>
import Slick from 'vue-slick'

export default {
 name:"QuickBlog",
 data:function(){
   return {
     slickOptions:{
       infinite: true,
       slidesToShow: 3,
       slidesToScroll: 3,
       arrows: true,
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
     entries:[
       {
         image:'/img/904053.jpg',
         link:"#",
         title:"A whole big world",
         content:`Whether you're planning a birthday celebration, a business lunch
          or you simply want to take the hosting pressure off your next gathering,
          take a look at our Food To Order range.`
        },
       {
         image:'/img/904053.jpg',
         link:"#",
         title:"A whole big world",
         content:`Whether you're planning a birthday celebration, a business lunch
          or you simply want to take the hosting pressure off your next gathering,
          take a look at our Food To Order range.`
        },
       {
         image:'/img/904053.jpg',
         link:"#",
         title:"A whole big world",
         content:`Whether you're planning a birthday celebration, a business lunch
          or you simply want to take the hosting pressure off your next gathering,
          take a look at our Food To Order range.`
        }
     ]
   }
 },

 components:{
   Slick
 }
}
</script>
