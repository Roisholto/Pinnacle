<template>

  <v-card v-show="show">
    <v-card-title class="headline primary--text font-weight-light text-center">
      <div class="flex-grow-1">
        Welcome to &nbsp;<span class="font-weight-bold">{{appName}}</span>&nbsp; online
      </div>
      <slot name="close">
        <div class="pl-4">
          <v-btn small icon @click="act">
            <v-icon small>
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </slot>
    </v-card-title>

    <v-card-text>
      <div class="pb-3 text-center body-2"> Get the <span class="font-weight-medium primary--text">best prices</span> on foods, drinks and more, all delivered to your doorstep.</div>
      <v-btn color="primary" block>
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
