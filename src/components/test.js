/* eslint-disable */
const hello = {
    template:`<div ref="h">Hello world</div>`,
    mounted:function()
        {
        console.log('the ref jquery', jQuery(this.$refs.h))
        console.log('the ref $', $(this.$refs.h))
        }
}

export default hello ;
