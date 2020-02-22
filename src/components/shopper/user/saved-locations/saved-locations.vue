<template>
    <userLayout>
        <v-data-iterator class="w-100"
            style="margin-bottom:72px"
            :items="main_locations"
            :page="gridOptions.page"
            :items-per-page="gridOptions.itemsPerPage"
            :server-items-length="isSessionActive ? fetched_total : -1"
            :loading="gridOptions.loading"
            hide-default-footer
            @pagination="gridPaginationEvent"
            >

            <template v-slot:header>
                <!--<div class="mt-2 d-flex justify-space-between white" dark>
                    <div class="">

                    </div>
                    <div class="">
                        <span  class="mr-4 caption grey--text ">
                            Page {{ gridOptions.page }} of {{ numberOfPages }}
                        </span>
                        <v-btn
                            light
                            icon
                            class="mr-1"
                            :disabled="gridOptions.page == 1"
                            @click="formerPage">
                            <v-icon color="">mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                            light
                            icon
                            class="ml-1"
                            :disabled="gridOptions.page == numberOfPages"
                            @click="nextPage">
                            <v-icon color="">mdi-chevron-right</v-icon>
                        </v-btn>
                    </div>
                </div>-->
            </template>

            <v-skeleton-loader slot="loading" :type="grid_skeleton_type"></v-skeleton-loader>

            <template v-slot:default="props">
                <v-list dense class="remove-last-border" two-line>
                    <template v-for="(single_location, index) in props.items">
                        <singleLocation
                            :single_location="single_location"
                            :showActionMenu="true"
                            :key="single_location.id"
                            @location-deleted="locationDeletedEvent"
                            />
                        <v-divider inset style=""/>
                    </template>
                </v-list>
            </template>
        </v-data-iterator>

        <v-btn fab color="red"
            ref="addButton"
            :to="{name:'add-saved-locations'}"
            fixed
            right
            bottom
            dark>
            <v-icon color="">mdi-plus</v-icon>
        </v-btn>
    </userLayout>

</template>

<script>
import userLayout from '@/layouts/userLayout.vue' ;
import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;
import {mapGetters} from 'vuex' ;
import {remove} from 'lodash'
import singleLocation from './single-location.vue'

export default {
    name:"savedLocations",
    data(){
        return {
            fetch_resp:{},
            gridOptions:{
                page:1,
                itemsPerPage:100,
                loading:false
            }
        }
    },

    computed:{
        ...mapGetters({
                getOutlet:'outlets/getOutlet',
                isSessionActive:'user/isSessionActive'
            }),

        main_locations(){
                return this.isSessionActive ? this.fetched_locs : this.orders ;
            },

        fetched_locs(){
            return this.fetch_resp.succ ? this.fetch_resp.data.locations : [] ;
        },

        fetched_total(){
            return (this.fetch_resp.succ && this.fetch_resp.data.record)  ? this.fetch_resp.data.record.total : this.fetched_locs.length ;
        },

        local_locs(){
            return []
        },

        numberOfPages(){
            return !this.isSessionActive ?
                Math.ceil(this.local_locs.length / this.gridOptions.itemsPerPage)
                :
                Math.ceil(this.fetched_total/this.gridOptions.itemsPerPage)
        },

        grid_skeleton_type(){
            let text = 'list-item-avatar-two-line';
            let count = this.gridOptions.itemsPerPage
            let arr = new Array(count)
            arr.fill(text, 0, count)
            return arr.join(',') ;

        },
    },

    components:{
        userLayout,
        singleLocation
    },

    mounted(){
        this.fetch_locations() ;
    },

    methods:{
        //api
        fetch_locations(start=0, display=100){
            let url = `${API_ENDPOINT}/shopper/saved-locations` ;
            let options = Core.set_fetch_headers() ;
            let vm = this ;

            fetch(url, options)
                .then(resp=>resp.json())
                .then((json)=>{
                    vm.fetch_resp = json ;
                    if(json.succ)
                        vm.$store.commit('user/add_saved_locations', json.data)
                })
        },
        //indexdb
        load_locations(){

        },
        nextPage() {
            if (this.gridOptions.page + 1 <= this.numberOfPages)
                this.gridOptions.page += 1
        },
        formerPage () {
            if (this.gridOptions.page - 1 >= 1)
                this.gridOptions.page -= 1
        },
        gridPaginationEvent(ev){
            if(this.isSessionActive)
                {

                let start = ev.itemsPerPage*(ev.page-1) ;
                let display = ev.itemsPerPage ;
                //if(start < ev.itemsLength)
                this.fetch_locations(start, display)
                }
            else
                {

                }
        },
        locationDeletedEvent(arr){
            let vm = this ;

            if(vm.isSessionActive)
                {
                let v ;
                arr.forEach(function(u){
                    for(let i=0; i<vm.fetch_resp.data.locations.length ; i++)
                        {
                        v = vm.fetch_resp.data.locations[i] ;
                        if(u == v.id)
                            {
                            vm.fetch_resp.data.locations.splice(i,1) ;
                            break ;
                            }
                        }
                    })
                }
        }
    }
}
</script>
