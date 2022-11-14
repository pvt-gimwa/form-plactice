<template>
  <div :class="className">
    <template v-if="type === 'text'">
      <input
        v-if="$route.meta?.isForm"
        v-model="inputval"
        :id="nametext"
        :type="inputtype"
        class="form__group__item__wrap_input"
        @input="handleinput"
        @blur="handleBlur"
      />
      <div v-if="errorMsg[0].length !== null" v-for="item in errorMsg" class="form__group__item__wrap_input_error">
        <p>{{item}}</p>
      </div>
    </template>
    <template v-else>
      <textarea
        v-if="$route.meta?.isForm"
        class="form__group__item__wrap_textarea"
        @input="handleinput"
        @blur="handleBlur"
      >{{inputval}}</textarea>
      <div v-if="errorMsg[0].length !== null" v-for="item in errorMsg" class="form__group__item__wrap_input_error">
        <p>{{item}}</p>
      </div>
    </template>
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
import checkValue from './valdator'

export default Vue.extend({
  name: 'InputVue',
  data(){
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
  mounted(){
  },
  methods: {
    log(item: any) {
      console.log(item)
    },
    handleinput(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit("input", target.value)
    },
    handleBlur(event: Event) {
      const target = event.target as HTMLInputElement
      const _thisVal = target.value
      const _thislabel= this.label
      this.$emit("input", _thisVal)
      this.errorMsg = new Array
      const validation = this.validationProp
      const keys = Object.keys(validation)

      keys.forEach((key) => {
        const msg = checkValue(_thisVal, key, validation[key], _thislabel)
        msg.length > 0 ? this.errorMsg.push(msg) : null
      })

    },
  },
})
</script>