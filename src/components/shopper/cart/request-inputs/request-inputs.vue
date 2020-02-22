<template>

    <v-expansion-panels  v-model="expState" class="no-padding" light>
        <v-expansion-panel>
            <v-expansion-panel-header>
                <span class="font-weight-bold">Extra inputs</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="">
                <template  v-if="inputs.length">
                    <div class="" v-for="(input,index) in inputs" :key="index">
                        <template v-if="input.input_type == 'list'">
                            <v-select :label="input.input_label"
                                :placeholder="input.input_label"
                                :hint="input.input_hint"
                                :required="input.input_required"
                                :rules="[(v,x)=>{return input.input_required ? !!v || 'input is required' : true }]"
                                :items="input.input_list_options"
                                v-model="input_model[input.input_label]"
                                @input="input_changed"
                              >
                            </v-select>
                        </template>
                        <template v-else>
                            <v-text-field
                                :placeholder="input.input_label"
                                :hint="input.input_hint"
                                :required="input.input_required"
                                :rules="[(v,x)=>{return input.input_required ? !!v || 'input is required' : true }]"
                                v-model="input_model[input.input_label]"
                                @input="input_changed"
                                >
                            </v-text-field>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div>
                        Extra inputs not set
                    </div>
                </template>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>

</template>
<script>
export default {
    name:"requestInputs",
    props:{
        inputs:{
            type:Array,
            default:()=>[],
            required:true
        },
        currentInputs:Object
    },
    data:function(){
        return {
            input_model:{},
            expState:0
        }
    },
    watch:{

    },
    mounted:function(){
        let vm = this ;
        if(this.inputs)
            {
            this.inputs.forEach(function(v){
                vm.input_model[v.input_label]= ''
            });
            }


        this.$nextTick()
            .then(function(){
                if(vm.currentInputs)
                    {
                    vm.input_model=  Object.assign({}, vm.input_model, vm.currentInputs) ;
                    }

            })

    },
    methods:{
        to_list_model:function(list)
            {
            let opts = []
            list.forEach(function(v){
                opts.push({"item-text":v,"item-value":v})
            })
            return opts ;
            },
        input_changed:function(ev){
            this.$emit('input', this.input_model);
        }
    }
}
</script>
