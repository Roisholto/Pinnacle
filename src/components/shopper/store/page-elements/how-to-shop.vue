<template>
  <v-timeline :dense="dense" class="mx-auto" style="max-width:700px">
    <v-timeline-item
      :icon="item.icon"
      v-for="(item, index) in items"
      :key="index"
      fill-dot>
      <span slot="opposite">Step {{index+1}}</span>
      <v-card>
        <v-card-title class="headline" style="font-size:1.2rem !important">{{item.header}}</v-card-title>
        <v-card-text>
          {{item.text}}
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default{
  name:"HowToShop",
  data(){
    return {
      items:[
        {
          icon:'mdi-cart',
          text:'Select from our variety of groceries, offered to you at unbeatable prices.',
          header:'Add groceries'
        },
        {
        icon:'mdi-map-marker',
        text:`Want us to deliver to your doorstep ? We can help with that. Add your preferred location. `,
        header:'Add delivery address'
        },
        {
          icon:'mdi-lock',
          text:'Complete your payment online through our safe payment points',
          header:'Checkout securely'
        }
      ]
    }
  },

  computed:{
    dense(){
      console.log('vuetify',this.$vuetify)
      return this.$vuetify.breakpoint.xs ;
    },
  },

  methods:{

  }
}
</script>

<style>
</style>
