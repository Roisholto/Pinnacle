<template>
    <v-form ref="form" v-model="formValid" v-on:submit.prevent="validate_email">
        <div class="mb-2">
            <v-text-field
                v-model="input"
                label="Your email"
                placeholder="hello@example.com"
                :rules="[rules.email]"
                required>
            </v-text-field>
        </div>

        <div class="d-flex justify-content-end ">
            <v-btn type="submit" block color="primary">
                Continue
            </v-btn>
        </div>
    </v-form>
</template>
<script>
export default {
    name:"Email",
  props: {
    amount:Number,
    value:{
        type:String,
        default:()=>''
    }
  },
  data: function () {
    return {
        formValid:false,
        input: null,
        rules:{
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
                }
            }
        }
    },

mounted: function(){
    this.input = this.value ;
},

methods: {
    validate_email: function () {
        if (this.$refs.form.validate()) {
          this.$emit('email-valid', this.input)
        }

    }
  }

}

</script>
