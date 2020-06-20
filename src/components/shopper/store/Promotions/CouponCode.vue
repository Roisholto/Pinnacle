<template>
  <v-chip color="red lighten-2" class="text-uppercase" dark small @click="$emit('click')">{{code}}</v-chip>
</template>
<script>
export default {
  name:"CouponCode",

  props:{
    code:String
  }
}
</script>
