<template>

  <v-card v-show="show">
    <v-card-title class="headline primary--text font-weight-light text-center">
      <div class="col px-2">
        Welcome to&nbsp;<span class="font-weight-bold">{{appName}}</span>
      </div>
      <div class="pl-4 flex-shrink-1 ">
        <v-btn small icon @click="act">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      <div class="pb-3 text-center body-2"> Get the <span class="font-weight-medium primary--text">best prices</span> on foods, drinks and more, all delivered to your doorstep.</div>
      <v-btn color="primary" block large :to="{name:'store-category', params:{category:'all'}}">
        Shop now
      </v-btn>

    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name:"Opening",
  props:{
    isDialog:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
      appName:process.env.VUE_APP_APP_NAME,
      show:true
    }
  },
  methods:{
    act(){
      console.log('clicked modal-close');
      if(this.isDialog)
        {
        this.show = !this.show
        this.$emit('close-modal', this.show)
        }
      //. else

    }
  }
}
</script>
