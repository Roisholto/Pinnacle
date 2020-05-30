<template>
  <div>
    <div class="justify-center d-flex align-center" style="min-height:50px" v-if="fetching">
      <v-progress-circular color="primary" indeterminate/>
    </div>
    <!--<div v-elseif="slider.items"> -->
      <v-carousel

        v-bind="carousel"
        cycle
        continous
        hide-delimiter-background
        style="border-radius:8px"
        v-else-if="slider.items">
        <template v-for="(item,index) in slider.items">
          <v-carousel-item :src="item.image"  :href="item.href" v-if="item.href" :key="index" />
          <v-carousel-item :src="item.image" :to="item.to" :key="index" v-else/>
        </template>
      </v-carousel>

    <!--</div> -->
  </div>
</template>
<script>
import {mapGetters} from 'vuex' ;
import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;


export default {
  name:"ImageSlider",
  props:{
    name:{
      type:[String,Number],
      required:true
    },
    mid:{
      type:String,
      required:true
    },
    carousel:{
      type:Object,
      default(){
        return {}
      }
    }
  },

  data(){
    return {
      slider:{},
      fetching:false,
      carousel_default:{
        height:300
      }
    }
  },

  computed:{

  },

  mounted(){
    let slider = this.$store.getters["merchant/pageComponents/getImageSlider"](this.name) ;
    if(slider)
      {
      this.slider = slider
      }
    else
      {
      let mid = this.$route.params.storeid || this.mid   ;
      let url = `${API_ENDPOINT}/components/shopper/${mid}/image-sliders/${this.name}`;
      let vm = this
      vm.fetching = true
      fetch(url)
        .then(function(r){
          return r.json() ;
        })
        .then(function(r){
          if(r.succ){
            vm.$store.commit('merchant/pageComponents/add_slider', r.data.slider)
            vm.slider = r.data.slider ;
          }
        })
        .catch(function(e){
          console.log('error fetching slides', e)
        })
        .finally(function(){
          vm.fetching = false ;
        })
      }

  },

  methods:{
    resolveRoute(to){
      let t = this.$router.resolve(to) ;
      //console.log(t) ;
      if(t.route.matched.length)
        return t

    }
  }
}
</script>
