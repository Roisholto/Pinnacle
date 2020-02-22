/* eslint-disable */
<template>
    <backPageLayout @back="backEvent">
        <v-text-field slot="header"
            autofocus
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            :value="searchText"
            @input="searchInputEvent"
            placeholder="Search for outlets, restaurants, items . . ."
            >
        </v-text-field>

        <div class="search white groups position-sticky" style="top:56px;z-index:3">
            <ul class="nav py-2">
                <li class="nav-item float-left pr-1">
                    <router-link to="/search/stores" class="px-3 py-1 border more-radius-1" replace>Outlets</router-link>
                </li>
                <!--<li class="nav-item pr-1">
                    <router-link to="/search/restaurants" class="px-2 py-1 border more-radius-1" replace>Restaurants</router-link>
                </li>-->
                <li class="nav-item pr-1">
                    <router-link to="/search/items" class="px-3 py-1 border more-radius-1" replace>Items</router-link>
                </li>
            </ul>
        </div>
        <div class="search-comp">
            <router-view></router-view>
        </div>
    </backPageLayout>
</template>
<script>
import backPageLayout from '@/layouts/backPageLayout.vue' ;
import { mapState } from 'vuex' ;

export default {
    name: 'SearchScreen',
    data:function(){
        return {

        }
    },
    computed:{
        ...mapState({
            searchText: state => state.search.search_text
        })
    },
  components:{
      backPageLayout
    },
  methods:{
      searchInputEvent: function (nv) {
          console.log('search input event ', nv) ;
          this.$store.dispatch('search/update_search', nv)
        },
      backEvent:function(){
          // this.$router.push({path:'/'}) ;
        }
    }
}
</script>

<style lang="scss" scoped="true">
.nav-item{
    list-style-type: none;
}
a {
    color:#000 ;
    border-width:2px !important;
    font-size:small ;

    &:hover {
        text-decoration: none ;
    }
}

.router-link-active{
    color: var(--blue)  ;
    border-color: var(--blue) !important ;

}
</style>
