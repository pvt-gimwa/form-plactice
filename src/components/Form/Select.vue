<template>
  <div :class="className">
    <div
     class="form__group__item"
     v-if="$route.meta?.isForm"
     >
      <select
        @change="handleChange"
        class="form__group__item__wrap__select"
        v-model="inputval"
        >
        <option disabled selected value="">{{labeltext}}を選択してください</option>
        <template
          v-for=" item in formoption.data"
        >
          <option :value="item">
            {{item}}
          </option>

        </template>
      </select>
      <span class="form__group__item__wrap__icon">▼</span>
    </div>
    <div v-if="errorMsg[0].length !== null" v-for="item in errorMsg" class="form__group__item__wrap__input__error">
      <p>{{item}}</p>
    </div>
    <p
      v-if="$route.meta?.isConfirm === true"
      class="form__group__item__wrap__text"
    >
      {{inputval}}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import checkValue from './valdator'

export default Vue.extend({
  name: 'SelectVue',
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
  methods: {
    handleChange: function(event: Event) {
      const target = event.target as HTMLSelectElement      
      const _thisVal = target.value
      const _thislabel= this.label

      this.$emit("input", target.value)

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

<style lang="scss" scoped>
.form__group__item{
  width: 100%;
  border-bottom: 1px solid #E8E8E8;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  &__wrap{
    &__text{
      font-size: 20px;
      padding: 5px 0;
      text-align: left;
    }
    &__select{
      width: 100%;
      font-size: 20px;
      padding: 5px 0;
    }
    &__input{
      &__error{ 
        p {
          font-size: 15px;    
          color: red;
          text-align: left;
        }
        margin: 10px auto;
      }
    }
    &__icon{
      display: flex;
      justify-content: center;
      align-content: center;
      height: 35px;
      line-height: 35px;
      min-width: 1em;
      font-size: 13px;
      color: #0D61D3;
    }
  }
}
</style>