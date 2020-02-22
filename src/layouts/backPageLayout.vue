<template>
    <v-app id="">
        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="primary darken-2"
            dark
            >

            <v-app-bar-nav-icon @click.stop="back" class="mr-5">
                <v-icon>
                    mdi-arrow-left
                </v-icon>
            </v-app-bar-nav-icon>

            <slot name="header">

            </slot>

        </v-app-bar>
        <v-content>
            <v-container
                class="align-start"
                :class="containerClass"
                fluid
                >
                <slot />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import userNav from '@/components/shopper/user-nav1.vue' ;
import {APP_NAME} from '@/constants.js' ;
  export default {
    name:"backPageLayout",
    props: {
        inputOpts:{
            type:Object,
            default:function(){
                return {

                }
            }
        },
        containerClass:{
            type:[Array, Object],
            default:()=>['align-start']
        },
        to:Object,
        backCallback:Function,
        prioritizeTo:Boolean,
        appName:APP_NAME
    },
    data: () => ({
     drawer: null,

    }),
    computed:{
    the_binds:function(){
        let x= {
            autofocus:true,
            flat:true,
            "solo-inverted":true,
            "hide-deatails":true,
            "prepend-inner-icon":"mdi-magnify",
            "label":"Search",
            "@input":"$emit('input', $event)"
        } ;

        return Object.assign({},x, this.inputOpts);
    }
    },
    components:{
        userNav
    },
    methods:{
        back:function(){
            this.$emit('back') ;
            if(this.backCallback && typeof this.backCallback =='function')
                {
                if(this.backCallback())
                    {
                    // probably sitch to the :to para
                    }
                }
            else
                {
                let numberOfEntries = window.history.length;
                if(this.prioritizeTo && this.to)
                    {
                    this.$router.replace(this.to)
                    }
                else
                    {
                    let numberOfEntries = window.history;
                    if(numberOfEntries.length > 2)
                        {
                        this.$router.back()
                        }
                    else
                        {
                        if(this.to)
                            {
                            console.log('to ') ;
                            this.$router.replace(this.to)  ;
                            }
                        else
                            {
                            console.log('will go home') ;
                            this.$router.replace({path:'/'})
                            }
                        }
                    }
                }

            /*

            */


        }
    }
  }
</script>
