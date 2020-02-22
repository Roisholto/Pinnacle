<template>
    <div class="d-flex text-right align-self-center">
       <div class="col-4 pl-0 pr-2">
           <v-select
                v-model="selected_price"
                @change="emit_change"
                :items="the_rate_select"
                label="price"
                :rules="[v => !!v || 'Name is required']"
                required>

           </v-select>
          <!-- <select class="form-control form-control-sm" v-model="selected_price" v-on:change="emit_change" required>
               <option disabled="disabled" value="">price</option>
               <template v-for="single_rate in rate">
                   <option v-bind:value="single_rate.price">{{single_rate.price}}</option>
               </template>
           </select>-->
       </div>
       <div class="col-4 px-2">
           <v-text-field
                v-model="selected_qty"
                v-bind:step="qty_step"
                v-bind:min="qty_step"
                type="number"
                v-on:input="emit_change"
                placeholder="Qty"
                label="Quantity"
                required
                :rules="[v => v>0 || 'quantity is required']"
            />
        </div>
       <div class="col-4 px-2 align-self-center">
           {{to_currency(total)}}
       </div>
   </div>
</template>
<script>
import { naija_currency } from '@/functions/to_currency.js'

export default {
  name: 'priceSelector',
  props: {
    rate: Array,
    defaults: Object // set for default selections say default to a price, to qty, et al
  },
  data: function () {
    return {
      selected_qty: 0,
      selected_price: ''
      // qty_step: '',
    }
  },
  computed: {
     // create data for v-select
    the_rate_select:function(){
        let z = [{value:'',text:'price', 'disabled':true}] ;
        let y
        this.rate.forEach(function(v){
             y = Object.assign({},v);
             y.text= v.price ;
             y.value = v.price ;
             z.push(y) ;
         })

         return z ;
        },
    total: function () {
      return this.selected_price * this.selected_qty
    },
    qty_step: function () {
      let rt = ''
      if (this.selected_price) {
        for (let i = 0; i < this.rate.length; i++) {
          if (this.rate[i].price == this.selected_price) {
            rt = this.rate[i].count
            break
          }
        }
      }

      return rt
    }
  },
  watch: {
    /* selected_price: function(nv,ov){
            for(let i= 0; i< this.rate.length ; i++)
                {
                if(this.rate[i].price ==nv)
                    {
                    this.qty_step = this.rate[i].count ;
                    break ;
                    }
                }
            }, */
    total: function (nv) {
      this.$emit('total-change', nv)
    }
  },
  mounted: function () {
    if (this.defaults) {
      this.selected_price = this.defaults.selected_price ? this.defaults.selected_price : ''
      this.selected_qty = this.defaults.selected_qty ? this.defaults.selected_qty : 0
      // this.qty_step = this.defaults.selected_qty  ? this.defaults.selected_qty : 0 ;
    } else {
      // set the default price there is only one price on the list;
      if (this.rate.length == 1) {
        this.selected_price = this.rate[0].price
        this.selected_qty = this.qty_step
      }
      this.emit_change()
    }
  },
  methods: {
    emit_change: function () {
      this.$emit('selection-change', { price: this.selected_price, qty: this.selected_qty })
    },
    to_currency: function (c) {
      return naija_currency(c)
    }
  }
}
</script>
