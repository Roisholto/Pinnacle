/* eslint-disable */
<template>
    <HomeLayout>
        <router-view></router-view>
    </HomeLayout>
</template>
<script>
import HomeLayout from '@/layouts/homeLayout.vue' ;

export default {
  name: 'MainScreen',
  template: ``,
  components: {
    
  },
  mounted: function () {

  },
  components:{
      HomeLayout
  }
}
</script>
