<template lang="html">

</template>

<script>
import flattenWithChild from '@/functions/flattenWithChild.js' ;

export default {
  name:"CategoryStats",

  props: {
    category:Object,
    required: true
  },

  data(){
    return {
    }
  },

  computed:{
    route(){
      let names = this.getQualifyingCategorys(this.category) ;
      return {name:'product-category', params:{category:names}} ;
    },

    count(){
      return 0
    }
  },

  methods:{
    getQualifyingCategorys(x){
      let cats = flattenWithChild(x.children, 'children') ;
      let b = cats.map( cat=> cat.name )

      return [x.name].concat(b) ;
    }
  }
}
</script>
