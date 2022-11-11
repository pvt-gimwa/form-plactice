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
      // console.log(event.target.value)
    },
    handleBlur(event: Event) {
      const target = event.target as HTMLInputElement
      const _thisVal = target.value
      const _thislabel= this.label
      // console.log(event.target)
      this.$emit("input", _thisVal)
      this.errorMsg = new Array
      const validation = this.validationProp
      const keys = Object.keys(validation)

      keys.forEach((key) => {
        const msg = this.checkString(_thisVal, key, validation[key], _thislabel)
        msg.length > 0 ? this.errorMsg.push(msg) : null
      })

    },
    clear() {
      this.$emit("input","")
    },
    checkString: function(
      inputdata: string,
      key: string,
      rule: string | object,
      label: string
    ){
      let errormsg = ""
      const length = {
        max: function(val: string, setVal: string){
          const intsetVal = (parseInt(setVal)+1)/10000
          const textsetVal = parseInt(setVal)>=99999999 ? intsetVal.toFixed(4).replace(".0000","")+"億円" : setVal+"万円"
          const msg = parseInt(val) <= parseInt(setVal) ? ""
                      :"が"+textsetVal+"を超える場合は、"+setVal+"万円でご入力ください"
          return msg
        },
        min: function(val: string, setVal: string){
          const msg = parseInt(val) > parseInt(setVal) ? ""
                      :"が"+setVal+"万円未満の方は、本サービスをお取り扱いできません"
          return msg
        },
        textMax: function(val: string, setVal: string){
          const msg = val.length <= parseInt(setVal) ? ""
                      :"は"+setVal+"文字以内にしてください"
          return msg
        },
        textMin: function(val: string, setVal: string){
          const msg = val.length > parseInt(setVal) ? ""
                      :"は"+setVal+"文字以上でなければなりません"
          return msg
        }
      }

      const pattern = {
        matches: "は半角数字で入力してください",
        email: "有効なメールアドレスの形式ではないようです",
      }

      const pattern2 = {
        noHyphen: "にハイフンは不要です",
        headZero: "に冒頭の0は不要です",
      }

      if(key === "required"){

        rule === "true" && !inputdata ? errormsg=label+"は必須項目です" : ""

      }else if(Object.keys(length).includes(key)){

        const re = this.isString(rule)? rule : ""
        const msg = length[key as keyof typeof length](inputdata,re)
        errormsg = msg ? label+msg : ""

      }else{

        const re = this.isString(rule)? new RegExp(rule) : null
        if(Object.keys(pattern2).includes(key)){
          if(re?.test(inputdata)){
            errormsg = label + pattern[key as keyof typeof pattern]
          }else{
            errormsg=""
          }
        }else{
          if(!re?.test(inputdata)){
            errormsg = key === "email"? pattern[key as keyof typeof pattern] : label + pattern[key as keyof typeof pattern]
          }else{
            errormsg=""
          }
        }
      }
      return errormsg;
    },
    isString:(text: unknown): text is string => {
      return typeof text === "string"
    }
  },
})
</script>