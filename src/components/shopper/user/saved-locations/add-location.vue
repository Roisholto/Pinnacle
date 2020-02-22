<template>
    <backPageLayout :containerClass="['height-100']" :to="{name:'saved-locations'}">
        <div slot="header"> {{pageTitle}}</div>
        <v-card class="height-100">
            <v-card-title ref="cardTitle">
                {{windowTitle}}
            </v-card-title>

            <v-window v-model="current_window" class="window-height-100" style="height:calc(100% - 64px - 52px)">
                <v-window-item :key="0" >
                    <v-card-text>
                        <v-text-field
                            ref="label"
                            v-model="inputs.label"
                            placeholder="Label"
                            :persistent-hint="true"
                            hint="Add a name describing the location e.g home, office"
                            @keyup.enter.native="beforeNext"
                            :rules="[rules.required]">
                        </v-text-field>
                    </v-card-text>
                </v-window-item>
                <v-window-item style="height:100%" :key="1">
                    <v-card-text style="height:100%" v-if="current_window==1">
                        <LPicker @input="locationInputChanged" :value="inputs.place.coords" @geocoding="locationGeocodingChanged"/>
                    </v-card-text>
                </v-window-item>

                <v-window-item :key="2">
                    <v-card-text>
                        <div class="row py-3">
                            <div class="col-4 font-weight-medium">label</div>
                            <div class="col-8">{{inputs.label}}</div>
                        </div>
                        <div class="row py-3">
                            <div class="col-4 font-weight-medium">address</div>
                            <div class="col-8">{{inputs.place.address}}</div>
                        </div>
                    </v-card-text>
                </v-window-item>

                <v-window-item :key="3">
                    <v-card-text class="d-flex align-center justify-center" style="height:inherit">
                        <div class="d-flex flex-column ">
                            <v-icon color="red" size="8.5em">
                                mdi-map-marker
                            </v-icon>

                            <div class="mt-5 title text-center font-weight-light text-capitalize">{{notification_message}}</div>
                        </div>
                    </v-card-text>
                </v-window-item>
            </v-window>

            <v-card-actions v-show="current_window != 3">
                <v-btn
                    :disabled="current_window == 0"
                    :text="current_window ? true : false"
                    @click="current_window--"
                    >
                    Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    :disabled="((current_window == 1 && !inputs.place.address) || geocoding) ? true : false"
                    depressed
                    @click="beforeNext"
                    v-show="current_window != 2"
                    >
                    Next
                </v-btn>

                <v-btn
                    color="primary"
                    :loading="adding"
                    depressed
                    @click="addLocation"
                    v-show="current_window==2"
                    >
                    Finish
                </v-btn>
            </v-card-actions>

            <v-snackbar v-model="show_notification">
                <span class="text-capitalize">{{notification_message}}</span>
                <v-btn
                   color="red"
                   text
                   @click="show_notification = false">
                   Close
                 </v-btn>
            </v-snackbar>
        </v-card>
    </backPageLayout>
</template>
<script>
import backPageLayout from '@/layouts/backPageLayout.vue' ;
import LPicker from '@/components/common/location-picker/LPicker.vue' ;
import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;

export default {
    name:"addLocation",
    props:{
        type:{
            type:String,
            default:()=>'add'
        },
        closeOnComplete:{
            type:Boolean,
            default:()=>false
        },

        value:Object,
    },
    data(){
        return {
            current_window:0,
            inputs:{
                label:'',
                place:{
                    coords:{
                        lat:0,
                        lng:0
                    },
                    address:''
                }
            },
            rules: {
                required: value => !!value || 'Required.',
                // min: v => v.length >= 8 || 'Min 8 characters',
            },
            card_title_height:'64px',
            geocoding:false,
            adding:false,
            show_notification:false,
            notification_message:'',

        }
    },

    computed:{
        pageTitle(){
        return this.type == 'edit' ? 'Edit Location' : 'Add Location' ;
        },

        windowTitle(){
            let t = '' ;
            if(this.current_window==0)
                t = 'Add a label' ;
            else if(this.current_window == 1)
                t = 'Add map location' ;
            else if(this.current_window == 2)
                t = 'Save location'

            this.card_title_height = this.getCardTitleHeight();

            return t ;
        },
        windowStyle(){
            let h = this.getCardTitleHeight() ;
            return {height:`calc (100% - ${this.card_title_height})`}
        }
    },

    components:{
        backPageLayout,
        LPicker
    },

    mounted(){
        let vm = this ;
        if(this.value)
            {
            this.inputs = Object.assign(this.inputs, this.value) ;
            }

        this.$nextTick(function(){
            vm.getCardTitleHeight();
            // vm.getCardActionHeight() ;
        })

    },

    methods:{
        getCardTitleHeight(){
            let h =  $(this.$refs.cardTitle).innerHeight()+'px' ;
            this.card_title_height = h ;
            return h;
        },

        labelKeyEnter(e){
            console.log(e) ;
        },

        beforeNext(){
            let c_w = this.current_window ;
            console.log('titlehright', this.getCardTitleHeight()) ;

            if(c_w==0)
                {
                if(this.$refs.label.validate())
                    {
                    this.current_window++
                    }
                }
            else if(c_w == 1)
                {
                // ensure the address is valid ;
                if(this.inputs.place.address)
                    this.current_window++
                }
        },

        locationInputChanged (e){
            this.inputs.place.coords= e.coords ;
            this.inputs.place.address= e.full_address ;
        },

        locationGeocodingChanged(e){
            this.geocoding = e ;
        },

        addLocation(){
            let vm = this ;
            let url = `${API_ENDPOINT}/shopper/saved-locations`;
            let options = Core.set_fetch_headers(this.inputs, {method: this.type == 'edit' ? 'PUT' : 'POST'})


            this.adding = true ;
            fetch(url, options)
                .then(function(resp){
                    return resp.json() ;
                })
                .then(function(json){
                    if(json.succ)
                        {
                        console.log('json', json);
                        vm.notification_message = vm.type == 'edit' ? 'location update complete' : 'location added' ;
                        if(vm.closeOnComplete)
                            setTimeout(function(){vm.$router.replace({name:'saved-locations'}) }, 2000)
                        else
                            {
                            // on last window show success message ;
                            // and expect the user to click the back button ;
                            // hide the action bar ;
                            // vm.toLastWindow = true ;
                            vm.current_window = 3
                            vm.$store.commit('user/push_saved_locations', json.data)
                            }
                        }
                    else
                        {
                        vm.notification_message = json.description ;
                        }
                    vm.show_notification = true ;
                })
                .catch(function(e){
                    console.log('error adding location', e)
                })
                .finally(function(){
                    vm.adding = false ;
                })
        }
    }

}
</script>
