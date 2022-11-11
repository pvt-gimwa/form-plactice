<template>
  <div :class="className">
    <select
     v-if="$route.meta?.isForm"
     @change="handleChange"
     class="form__group__item__wrap_select"
     v-model="inputval"
    >
      <option disabled selected value="">選択してください</option>
      <template
        v-for=" item in formoption.data"
      >
        <option :value="item">
          {{item}}
        </option>

      </template>
    </select>
    <div v-if="errorMsg[0].length !== null" v-for="item in errorMsg" class="form__group__item__wrap_input_error">
      <p>{{item}}</p>
    </div>
    <p
      v-if="$route.meta?.isConfirm === true"
      class="form__group__item__wrap_text"
    >
      {{inputval}}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SelectVue',
  data(){
    // console.log(this.value)
    return {
      inputtype: this.type,
      className: this.classProp,
      inputval: this.value,
      errorMsg:  new Array,
      validatior: this.validationProp,
      labeltext : this.label,
      nametext : this.name,
      formoption : this.option
    }
  },
  props:{
    label:{
      type:String,
      required: true
    },
    name:{
      type:String,
      required: true
    },
    option:{
      type:Object,
      required: true
    },
    value:{
      type:String,
      required: true
    },
    type:{
      type:String,
      required: true
    },
    classProp:{
      type:String,
      required: true
    },
    validationProp:{
      type:Object,
      required: true
    }
  },
  methods: {
    handleInput: function(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit("input", target.value)
      // console.log(target.value)
    },
    handleChange: function(event: Event) {
      const target = event.target as HTMLInputElement      
      const _thisVal = target.value
      const _thislabel= this.label

      this.$emit("input", target.value)

      // console.log(target.value)
      // console.log(target)

      this.errorMsg = new Array
      const validation = this.validationProp
      const keys = Object.keys(validation)

      keys.forEach((key) => {
        const msg = this.checkString(_thisVal, key, validation[key], _thislabel)
        msg.length > 0 ? this.errorMsg.push(msg) : null
      })

    },
    checkString: function(inputdata: string, key: string, rule: string | object, label:string){

      // console.log(inputdata)

      let errormsg = ""

      if(key === "required"){

        rule === "true" && !inputdata ? errormsg=label+"は必須項目です" : ""

      }
      return errormsg;
    },
  },
})
</script>