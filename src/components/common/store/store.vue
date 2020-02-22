<template>
    <div class="store" v-bind:class="classes.parent">
        <div class="pa-2 " v-bind:class="classes.next">
            <template v-if="mode=='list'">
                <a href="javascript:;" class="" style="text-decoration:none">
                    <store-level-1 v-bind:store="store" v-on:body-clicked="goto_store"></store-level-1>
                </a>
            </template>
            <template v-else>
                <div class="d-flex col-lg-4 col-md-5 py-2 position-relative">
                    <store-level-1 v-bind:store="store"></store-level-1>
                </div>
            </template>
            <slot name="action-footer"></slot>
        </div>
    </div>
</template>
<script>
import storeLevel1 from './store-level-1.vue'

export default {
  name: 'store',
  props: ['store', 'mode'],
  data: function () {
		 return {
		 		classes: { parent: '', next: '' }
		 	}
  },
  computed: {

	   },
  components: {
    storeLevel1
  },
  mounted: function () {
    if (this.mode == 'list') {
      this.classes.parent = ' card '
      this.classes.next = ' card-body '
    }
  },
  methods: {
    goto_store: function ($ev) {
      console.log('target', $ev.target)
      if (!$($ev.target).hasClass('is-pointer')) { this.$emit('goto-store', this.store.mid) }
    }
  }

}
</script>
