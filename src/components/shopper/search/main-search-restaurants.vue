<template>
    <div>
        <store class="mb-2" v-for="(rest,index) in restaurants" v-bind:store="rest" v-bind:mode="'list'" v-bind:key="index">
            <div class="py-2 small" slot="action-footer">
                The top food comes here
            </div>
        </store>
    </div>
</template>
<script>
export default {
  name: 'mainSearchRestaurants',
  props: ['mode'],
  computed: {
    restaurants: function () {
      return this.$store.state.search.rests
    }
  },
  beforeRouteEnter: function (to, from, next) {
    console.log('before route enter')
    next()
  }
}

</script>
