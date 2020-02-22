<template>
    <div class="text-center" style="padding: 3.5rem 0 ">
        
        <v-icon color="red" size="6.5rem">
            {{info.icon}}
        </v-icon>
        <div class="">
            {{info.text}},
            <router-link :to="{name:'store'}">add</router-link>
            .
        </div>
    </div>
</template>
<script>
export default {
  name: 'emptyCartPlaceholder',
  props: ['type'],
  data: function () {
    return {

    }
  },
  computed: {
    'info': function () {
      let ic = { 'icon': '', text: '' }
      if (this.type == 'restaurant') {
        ic.icon = 'mdi-silverware'
        ic.text = 'Nothing on your plate'
      } else if (this.type == 'store') {
        ic.icon = 'mdi-basket'
        ic.text = 'Nothing in your basket'
      } else {
        ic.icon = 'mdi-shopping'
        ic.text = 'Oops, nothing yet'
      }

      return ic
    }
  }
}
</script>
