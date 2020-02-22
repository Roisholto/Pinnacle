<template>
    <div class="d-flex position-relative single-store-level-1" :class="[displayMode=='grid' ? 'flex-column card' : 'py-1']">
        <div class="card-img-top avatar d-flex align-center justify-center" :class="[displayMode=='grid' ? '' : 'col-sm-3 col-lg-2 col-3 px-2 py-0']" style="/*max-width:100px*/">
            <!--<div style="width:100%">-->
                <div class="image-container--16-9 theme-background cursor-pointer" style="max-height:80px" v-on:click="part_clicked('image')" v-if="displayMode=='grid'" >
                    <img v-bind:src="storeIcon" class="">
                </div>
                <v-avatar :size="avatarSize" v-else>
                  <img
                    :src="storeIcon"
                    alt="John"
                  >
                </v-avatar>
            <!--</div>-->
        </div>
        <div class="" :class="[displayMode =='grid' ? 'card-body' : 'col-sm-9 col-lg-10 col-9 px-2 py-0']">
            <div class="d-flex ">
                <div class="flex-fill" style="overflow:hidden">
                    <span class="store-name pl-1 pb-0 resp-normal-text text-truncate
                        font-weight-bold text-capitalize text-dark
                        cursor-pointer"
                        v-on:click="part_clicked('name')"
                        v-bind:title="store.name">{{store.name}}
                    </span>

                    <store-attr
                    class="store-addr pt-1 text-dark  d-flex cursor-pointer"
                    v-bind:title="store.address" v-if="displayOptions.showAddress"
                    v-on:click.native="part_clicked('address')"
                    >
                        <v-icon slot="icon" color="red" size="">
                            mdi-map-marker
                        </v-icon>
                        <span class="" slot="value">
                            {{store.address}}
                        </span>
                    </store-attr>

                    <store-attr class="cursor-pointer"
                    v-if="displayOptions.showDistance"
                    v-on:click.native="part_clicked('distance')">
                        <v-icon slot="icon" color="orange" size="">
                            mdi-compass
                        </v-icon>
                        <span class="text-dark" slot="value">
                            <distance
                                :currentLocation="currentLocation"
                                :coords="store.location"
                                :storeDistance="storeDistance"
                                />
                        </span>
                    </store-attr>

                    <store-attr
                        class="store-addr pt-1 text-dark small text-truncate d-flex cursor-pointer fa-2x"
                        v-bind:title="store.type"
                        v-on:click.native="part_clicked('type')"
                        v-if="displayOptions.showType">
                        <v-icon slot="icon" color="green">
                            mdi-{{storeTypeIcon}}
                        </v-icon>
                        <span slot="value">{{store.type}}</span>
                    </store-attr>

                    <slot></slot>
                </div>
                <div>
                    <store-actions v-bind:mid="store.mid" :storeName="store.name" v-if="displayOptions.showMenu"/>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
import storeAttr from './store-attr.vue'
import storeActions from './store-actions/store-actions.vue'
import distance from './distance.vue'

let defaultOptions = {
  showDistance: true,
  showType: true,
  showAddress: true,
  showMenu: true
}

export default {
  name: 'storeLevel1',
  props: {
    store: {
      required: true,
      type: Object
    },
    options: {
      showDistance: true,
      showType: true,
      showAddress: true,
      showMenu: true
    },
    displayMode: {
      type: String,
      default: function () {
        return 'list'
      }
    },
    storeDistance:{
        type:Boolean,
        default:function(){
            return false
        }
    }
  },
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
      classes: {
        list: []
      }
    }
  },
  computed: {
    currentLocation: function () {
      return this.$store.state.user.currentLocation.coords
    },

    storeIcon: function () {
      let icon = this.store.icon != '' ? this.store.icon : this.publicPath + 'svg/store.svg'
      return icon
    },
    storeTypeIcon: function () {
      let icon = this.store.type == 'restaurant' ? 'silverware' : 'store'
      return icon
    },
    avatarSize:function(){
        console.log('vuetify', this.$vuetify) ;
        return !this.$vuetify.breakpoint.mdAndUp ? 70 : 80 ;
    },
    displayOptions: function () {
      return Object.assign({}, defaultOptions, this.options)
    }
  },
  components: {
    storeAttr,
    storeActions,
    distance
  },
  beforeDestroy: function () {
    // destroy the jbox modal if it exists
  },
  methods: {
    part_clicked: function (where = '') {
      this.$emit('body-clicked', { where: where })
    }
  }

}
</script>

<style lang="scss" media="screen" scoped>
.fa{
font-size:1.4em;
}
</style>
