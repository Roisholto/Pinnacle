<template>
    <div id="app">
        <div class="loader-wrapper">
            <!---->
            <div class="loader">
              <div class="loader__bar"></div>
              <div class="loader__bar"></div>
              <div class="loader__bar"></div>
              <div class="loader__bar"></div>
              <div class="loader__bar"></div>
              <div class="loader__ball"></div>
            </div>
            <div class="brand-name">{{appName}}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Vue from 'vue' ;
import {fetch_stores, fetch_locations} from './api/shopper.saved-stores.js' ;
import {mapGetters} from 'vuex' ;
import {APP_NAME, INSTALL_MODE, API_ENDPOINT} from './constants.js' ;
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

window.addEventListener('load', function preloader(){
    $('.loader-wrapper').remove()
})

// if user is signedon get the saved stores
export default {
    name:'App',
    data:function(){
        return {
            appName:APP_NAME
        }
    },
    computed:{
        ...mapGetters({
            isSessionActive:'user/isSessionActive'
        })
    },
    mounted:function(){
        let vm = this ;
        // get first store from stores if deployment mode is standalone ;

        fetch_stores()
            .then(function(resp){
                return resp.json() ;
                })
            .then(function(json){
                if(!('error' in json))
                    {
                    console.log('no error found') ;
                    vm.$store.commit('user/add_saved_stores', json.data)
                    }
                })
        .catch(function(e){
            console.log('could not fetch saved stores', e) ;
            })

        fetch_locations()
            .then(resp=>resp.json())
            .then(json=>{
                if(!('error' in json))
                    {
                    vm.$store.commit('user/add_saved_locations', json.data)
                    }
            })

        // navigator ;
        if ("geolocation" in navigator)
            {
            /* geolocation is available */
            let geo_success = function(position){
                // do_something(position.coords.latitude, position.coords.longitude);
                vm.$store.commit('user/update_current_location_coords',
                    {lat:position.coords.latitude, lng:position.coords.longitude}) ;
            } ;

            let geo_error = function(){

            }

            let geo_options = {
                enableHighAccuracy: true,
                maximumAge        : 30000,
                timeout           : 27000
                };

            let watchID = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
            this.$store.commit('user/update_current_location_id', watchID) ;
            }
        else
            {
            /* geolocation IS NOT available */
            }
    }
}
</script>
