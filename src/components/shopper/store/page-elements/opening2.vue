<template>

  <v-card height="100%" max-width="350" v-show="show" class="d-flex justify-center flex-column">

    <v-card-text>
      <div class="headline primary--text font-weight-light text-center">
        Welcome to <span class="font-weight-bold">{{appName}}</span>
      </div>
      <v-spacer class="py-2"/>
      <div class="pb-3 text-center body-2">
        Get the <span class="font-weight-medium primary--text">best prices</span> on foods,
        drinks and more, all delivered to your doorstep.
      </div>
      <v-btn color="primary" block large :to="{name:'store-category', params:{category:'all'}}">
        Shop now
      </v-btn>
      <v-spacer class="py-2"/>
      <v-btn color="primary" outlined block large :href="authUrl+'signin'">
        Already a customer, Log in
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import {mapGetters} from 'vuex' ;

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

  computed:{
    ...mapGetters({
    isSessionActive: 'user/isSessionActive',
    authUrl: 'authUrl',
    }),
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
