/* eslint-disable */
import Core from '@/class.core.js' ;
import {API_ENDPOINT} from '@/constants.js' ;
import qrComp from '@/components/common/qr-comp.js' ;
const loading = {
    template:`<div class="w-100">
        Loading . . .
    </div>`
}

export const Reprint = {
    props:{
        reprintid:{
            type:String,
            required:true
            }
        },
    data: function(){
        return {
            loaded:0,
            response:{},
            }
        },
    components:{
        loading,
        qrComp
        },
    template:`<div>
                <div>
                    <h3>Reprint</h3>
                </div>
                <div v-if="!loaded">
                    <loading />
                </div>
                <div v-else>
                    <template v-if="response.error">
                        <div class="alert alert-warning text-capitalize" role="alert">
                            {{response.description}}
                        </div>
                    </template>
                    <template v-else>
                        <qrComp v-bind:data="reprintid" style="" />
                        <div class="text-center">
                            <span>{{reprintid}}</span>
                        </div>
                    </template>
                </div>
            </div>`,
    mounted:function()
        {
        // get the code ;
        // ensure the code is correct ;
        const vm = this ;
        let url = `${API_ENDPOINT}/reprints/validate/${vm.reprintid}` ;
        let options = Core.set_fetch_headers({},{method:'get'});

        fetch(url,options)
            .then(resp=>{return resp.json()})
            .then(json=>{
                //
                vm.loaded = 1 ;
                vm.response = json ;
                /*
                if(json.succ)
                    {
                    // show qrcode ;
                    }
                else
                    {
                    // display the error ;
                }*/
            })
        .catch(e=>{
            // do something about the error
        })
        }
}

export default Reprint ;
