<template>
    <storeLayout>
        <div class="py-2">
            <v-breadcrumbs class="white py-4" v-bind:items="bread"/>
        </div>

        <template v-if="matched.length">
            <div class="grid-6-base-2">
                <single-item-card
                    v-for="(item) in matched"
                    v-bind:item="inventoryItems[item]"
                    v-bind:key="item.id"
                    v-on:click="open_modal(item)"
                    />
            </div>
            <template v-if="currentCode">
                <add-to-cart v-bind:productCode="currentCode" ref="theModal" />
            </template>
        </template>
        <template v-else>
            <div class="text-center">
                <div class="my-3">
                    <v-icon color="red" size="6.5rem">
                        mdi-basket-outline
                    </v-icon>
                </div>
                <h4>No items in this Category</h4>
            </div>
        </template>
    </storeLayout>
</template>
<script>
import * as siJs from '@/shopper.inventory.js'
import singleItemCard from '@/components/common/item/single-item-card.vue'
import { mapState } from 'vuex'
import addToCart from '../cart/add-to-cart.vue'
import storeLayout from '@/layouts/storeLayout.vue' ;

export default {
  name: 'Category',
  props: {
    category: {
      required: true,
      type: String
    }
  },
  components: {
    singleItemCard,
    addToCart,
    storeLayout
  },
  template: ``,
  data: function () {
    return {
      bread: [
        {
        text: 'Store',
        link:true,
        disabled: false,
        exact:true,
        // href:this.$router.resolve({name:'store', params: this.$route.params}).href,
        to: { name: 'store', params:this.$router.params  }
        },
        /* {
                    text: 'Category',
                    to: { name: 'store-category', params:this.$router.params}
                }, */
        {
          text: this.category,
          disabled: false,
          link:true,
           exact: true,
          // href:'wirld',
         to: { name: 'store-category', params: this.category }
        }
      ],
      currentCode: ''
    }
  },
  computed: {
    ...mapState({
      inventoryItems: function (state) {
        return state.merchant.inventory.items
      }
    }),
    capitalized_category () {
      return this.category.toUpperCase()
    },
    matched: function () {
      return this.get_matched()
    }
  },
  mounted: function () {
     console.log('full path',this.$router.resolve({name:'store', params: this.$route.params})) ;
    siJs.fetch_item_from_api(this.$route.params.storeid, [{ category: { data: [this.category], factor: 'equalto' } } ])
      .then(resp => {
        console.log('fetch ', resp)
      })
      .catch(e => { console.log(e) })
  },
  methods: {
    get_matched: function () {
      const vm = this
      let matched = []
      // load items that belong to the category ;
      Object.keys(vm.inventoryItems).forEach(function (v) {
        if (vm.inventoryItems[v].category.toString().toUpperCase() == vm.capitalized_category) {
          matched.push(v)
        }
      })
      // this.matched = matched ;
      // access the api for more data if there exists ;

      return matched
    },
    open_modal: function (code) {
      let vm = this
      this.currentCode = code ;
      this.$nextTick(function () {
        vm.$refs.theModal.modal_comp_open = true ;
      })
    }

  }
}

</script>
