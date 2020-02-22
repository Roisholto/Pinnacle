<template>
    <v-list-item @click="$emit('click', $event)">
        <v-list-item-avatar :color="avatar_color">
            <span class="white--text text-capitalize font-weight-medium">{{avatar_(single_location.label)}}</span>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title class="align-self-start text-uppercase">
                {{single_location.label}}
            </v-list-item-title>
            <v-list-item-subtitle class="text-capitalize">
                {{single_location.place.address}}
            </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action v-if="showActionMenu">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        icon
                        v-on="on">
                        <v-icon>
                            mdi-dots-vertical
                        </v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item
                        :key="'edit'"
                        @click=""
                        >
                        <v-list-item-title @click="edit_location(single_location)">Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        :key="'delete'"
                        @click="delete_location([single_location.id])"
                        >
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list-item-action>
    </v-list-item>
</template>

<script>

import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;
import random from 'lodash' ;

export default {
    name:"singleLocation",
    props:{
        single_location:{
            type:Object,
            required:true
        },
        showActionMenu:{
            type:Boolean,
            default:()=>true
        }
    },
    computed:{
    avatar_color(){
        let c =  this.rand_avatar_color() ;
        return c
    }
    },

    methods:{
        rand_avatar_color(){
            let colors = ['red', 'green', 'blue',
                'purple', 'light-blue', 'cyan',
                'orange', 'indigo']

            let r = _.random(0, colors.length-1) ;
            return colors[r] ;
        },
        avatar_(n){
        return n.toString()[0] ;
        },

        edit_location(info){
            this.$router.push({'name':'add-saved-locations', params:{type:'edit', value:info} })
        },

        delete_location(arr){
            let url =  `${API_ENDPOINT}/shopper/saved-locations` ;
            let options = Core.set_fetch_headers({id:arr},{method:'DELETE'})
            let vm = this ;

            fetch(url, options)
                .then(function(resp){
                    return resp.json() ;
                })
                .then(function(resp){
                    if(resp.succ){
                    // remove items from list
                        vm.$emit('location-deleted',arr) ;
                    }
                })
                .catch(function(e){
                    console.log('e', e) ;
                })
        }
    }
}
</script>
