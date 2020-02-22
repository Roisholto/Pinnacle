<template>
    <div class="d-flex flex-column align-center">
        <v-avatar class="mx-auto" size="72">
            <v-img :src="storeIcon" />
        </v-avatar>
        <div class="title ">
            {{store.name}}
        </div>
        <div class="grey--text body-2">
            {{store.address}}
        </div>
    </div>
</template>
<script>
export default {
    name:"storeStyleCentered",
    props:{
        store:{
            required:true,
            type:Object
        }
    },
    data:function(){
        return {
            publicPath: process.env.BASE_URL,
        }
    },
    computed:{
        storeIcon: function () {
          let icon = this.store.icon != '' ? this.store.icon : this.publicPath + 'svg/store.svg'
          return icon
        },
    }
}
</script>
