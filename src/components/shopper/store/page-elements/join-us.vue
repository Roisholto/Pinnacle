<template>
  <v-sheet light class="px-4 py-6">
    <h3 class="display-2 text-center primary--text">Take the Pinnacle advantage</h3>
    <div class="headline text-center my-3 ">Join thousands of customers already enjoying great prices.</div>
    <v-btn large block color="primary" class="mt-2" :to="{name:'store-category', params:{category:'all'} }">Shop now</v-btn>
  </v-sheet>
</template>
<script>
export default {
  name:"JoinUs"
}
</script>
