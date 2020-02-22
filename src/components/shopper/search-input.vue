<template >
    <div class="input-group">
        <input type="text" class="form-control"
            v-on:focusin="$emit('focusin', $event)"
            v-on:input="$emit('input', $event.target.value)"
            v-model="main_search_text"
            v-bind:placeholder="placeholder"
            style="font-size:14px"
            >
    </div>
</template>
<script>

export default {
  name: 'searchInput',
  props: {
    where: String, // main|store ;
    defValue: String
  },
  data: function () {
    return {
      main_search_text: ''
    }
  },
  computed: {
    placeholder: function () {
      return this.where == 'store' ? 'Search store items' : 'Search store, restaurants, items . . .'
    }
  },
  mounted: function () {
    let vm = this
    this.$nextTick()
      .then(function () {
        if (vm.defValue) {
          vm.main_search_text = vm.defValue
        }
      })
  },
  methods: {
    searchInputEvent: function () {

    },
    searchFocusedEvent: function () {

    }
  }
}
</script>
