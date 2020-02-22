<template>
    <homeLayout>
        <template v-if="loading">
            <!--<div>-->
            <div class="w-100 d-flex flex-column white" style="height:100%">
                <v-skeleton-loader class="mx-auto mb-1" type="avatar"></v-skeleton-loader>
                <v-skeleton-loader class="mx-auto mb-1 no-margin" width="200" type="heading"></v-skeleton-loader>
                <v-skeleton-loader class="mx-auto " width="200" type="text"></v-skeleton-loader>
                <div class="mb-8"></div>
                <div class="d-flex justify-center flex-column w-75 mb-8 px-4">
                    <v-skeleton-loader class="" type="text@5"></v-skeleton-loader>
                </div>
                <v-skeleton-loader type="list-item-avatar@5" />
            </div>
        </template>
        <template v-else>
            <orderDetail style="width:100%;height:100%" :order="response" v-if="response.order_detail"></orderDetail>
            <template v-else>
                <div>{{response.error}}</div>
            </template>
        </template>
    </homeLayout>
</template>
<script>
import {API_ENDPOINT} from '@/constants.js' ;
import Core from '@/class.core.js' ;
import orderDetail from '@/components/shopper/user/order-detail.vue'
import homeLayout from '@/layouts/homeLayout' ;

export default {
    name:"orderTracking",
    data:function(){
        return {
            ref:'',
            loading:true,
            response:{
            }
        }
    },
    mounted:function(){
    let query = this.$route.query ;
    if(query.id)
        {
        this.ref = query.id;
        }

    this.fetch_invoice() ;
    },

    components:{
        orderDetail,
        homeLayout
    },

    methods:{
        fetch_invoice(){
        let url = `${API_ENDPOINT}/invoice/tracking?token=${encodeURIComponent(this.ref)}` ; // ${encodeURIComponent(this.ref)}
        this.loading = true ;
        let vm = this ;
        fetch(url)
            .then(function(resp){return resp.json()})
            .then(function(response){
                if(response.invoice)
                    {
                    vm.response= response.invoice ;
                    vm.response.merchant = response.merchantInfo ;
                    vm.response.order_detail = response.order_items.order[0].items ;
                    }
                else
                    {
                    // should contain an error key
                    vm.response = response ;
                    }
            })
        .catch(function(e){
            console.log('error fetching tracking id', e)
        })
        .finally(function(){

            vm.loading = false ;
        })

        }
    }
}
</script>
