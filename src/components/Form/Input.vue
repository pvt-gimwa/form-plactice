<template>
  <div :class="className">
    <template v-if="type === 'text'">
      <div class="form__group__item">
        <input
          v-if="$route.meta?.isForm"
          v-model="inputval"
          :id="nametext"
          :type="inputtype"
          class="form__group__item__wrap__input"
          @input="handleinput"
          @blur="handleBlur"
        />
        <span class="form__group__item__wrap__unit" v-if=" inputunit !== '' ">{{inputunit}}</span>
      </div>

      <div v-if="errorMsg[0].length !== null" v-for="item in errorMsg" class="form__group__item__wrap__input__error">
        <p>{{item}}</p>
      </div>
    </template>
    <template v-else>
      <div class="form__group__item">
        <textarea
          v-if="$route.meta?.isForm"
          class="form__group__item__wrap__textarea"
          @input="handleinput"
          @blur="handleBlur"
        >{{inputval}}</textarea>
      </div>
      <div v-if="errorMsg[0].length !== null" v-for="item in errorMsg" class="form__group__item__wrap__input__error">
        <p>{{item}}</p>
      </div>
    </template>
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
      formoption : this.option,
      inputunit : this.unit
    }
  },
  props:{
    unit:{
      type:String,
    },
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

<style lang="scss" scoped>
.form__group__item{
  width: 100%;
  border-bottom: 1px solid #E8E8E8;
  display: flex;
  justify-content: flex-start;
  align-content: center;

  &__wrap{
    &__input{
      font-size: 20px;
      padding: 5px 0;
      width: 100%;
      &__error{ 
        p {
          font-size: 15px;    
          color: red;
          text-align: left;
        }
        margin: 10px auto;
      }      
    }
    &__unit{
      display: flex;
      justify-content: center;
      align-content: center;
      height: 35px;
      line-height: 35px;
      min-width: 4em;
      font-size: 13px;
    }
    &__textarea{
      max-width: 100%;
      width: 100%;
      height: 300px;
      font-size: 18px;
      border: 1px solid #E8E8E8;
      border-radius: 5px;
      padding: 5px;
    }
  }
}

</style>