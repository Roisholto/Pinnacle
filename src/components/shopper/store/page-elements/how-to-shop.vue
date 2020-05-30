<template>
  <v-timeline :dense="dense" class="mx-auto" style="max-width:700px" v-if="breakpoint.width < 800">
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
  <div class="timeline d-flex justify-space-between mx-auto py-4" style="max-width:960px" v-else>
    <v-card

      class="timeline-item"
      :key="index"
      v-for="(item, index) in items">
      <v-card-title
        class="d-flex flex-column"
        >
        <v-icon color="primary">{{item.icon}}</v-icon>
        <span style="font-size:1.2rem !important">{{item.header}}</span>
      </v-card-title>
      <v-card-text>

        {{item.text}}
      </v-card-text>
    </v-card>
  </div>
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
      return this.$vuetify.breakpoint.xs ;
    },

    breakpoint(){
      return this.$vuetify.breakpoint
    }
  },

  methods:{

  }
}
</script>

<style scoped="true" lang="scss">

.timeline-item {
  max-width:230px ;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    bottom: 0;
    width: 100%;
    height: 4px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background: #e91e63;
    border: 1px solid #fff;
  }
}
</style>
