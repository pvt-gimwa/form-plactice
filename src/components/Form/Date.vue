<template ref="dateValue">
  <div :class="className">
    <div v-if="$route.meta?.isForm">
      <select
       class="form__group__item__wrap_date form__group__item__wrap_date-year"
       @change="changeYear"
       v-model="datedate.year"
      >
        <option disabled selected value="">「年」選択してください</option>
        <template v-for=" item in selectoption.data" >
          <option :value="item">
            {{item}}年
          </option>
        </template>
      </select>
    </div>

    <div
     v-if="$route.meta?.isForm && (selectoption.mode === 'ym' || selectoption.mode == 'ymd')"
    >
      <select
       class="form__group__item__wrap_date form__group__item__wrap_date-month"
       disabled
       v-model="datedate.month"
       @change="changeMonth"
      >
        <option disabled selected value="">「月」選択してください</option>
      </select>
    </div>

    <div v-if="$route.meta?.isForm && selectoption.mode == 'ymd'">
      <select
       class="form__group__item__wrap_date form__group__item__wrap_date-day"
       disabled
       v-model="datedate.day"
       @change="changeDay"
      >
        <option disabled selected value="">「日」選択してください</option>
      </select>
    </div>


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
import checkValue from './valdator'

export default Vue.extend({
  name: 'DateVue',
  data(){

    const year = this.value.split("-")[0] || ""
    const month = this.value.split("-")[1] || ""
    const day = this.value.split("-")[2] || ""

    return {
      datedate: {year: year, month: month, day: day},
      inputtype: this.type,
      className: this.classProp,
      inputval: this.value,
      errorMsg:  new Array,
      validatior: this.validationProp,
      labeltext : this.label,
      nametext : this.name,
      selectoption : this.option
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
    changeYear: function(event: Event){
      const target = event.target as HTMLSelectElement     
      const mode   = this.option.mode === "ym" || this.option.mode === "ymd"

      if(target.disabled === true || mode === false){
        return false
      }
 
      this.datedate.year = target.value
      const monthSelectWrap = target.parentElement?.nextSibling
      const monthSelect = (<Element>monthSelectWrap).querySelector(".form__group__item__wrap_date-month") as HTMLSelectElement
      const month = Array.from({length:12}, (v,k) => k).map(x => x + 1)
      month.map(x => {
        const option = document.createElement("option")
        option.text = x+"月"
        option.value = x.toString()
        monthSelect?.appendChild(option)
        monthSelect.disabled = false 
      })
      
    },
    changeMonth: function(event: Event){
      const target = event.target as HTMLSelectElement      
      this.datedate.month = target.value
      const _thislabel= this.label
      this.errorMsg = new Array
      const validation = this.validationProp
      const keys = Object.keys(validation)

      if(this.option.mode === "ym"){

        const _thisVal = `${this.datedate.year}-${this.datedate.month}`
        this.inputval = _thisVal
        this.$emit("input", _thisVal)

        keys.forEach((key) => {
          const msg = checkValue(_thisVal, key, validation[key], _thislabel)
          msg.length > 0 ? this.errorMsg.push(msg) : null
        })


      }

      const mode   = this.option.mode === "ymd"
      if(target.disabled === true || mode === false){
        return false
      }

      const selectedMonth = new Date(`${this.datedate.year}-${this.datedate.month}-1`)
      const nextMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()+1, 1)
      const daysMax = Math.round( ( nextMonth.valueOf() - selectedMonth.valueOf() ) / (1000 * 60 * 60 * 24) )
      const daySelectWrap = target.parentElement?.nextSibling
      const daySelect = (<Element>daySelectWrap).querySelector(".form__group__item__wrap_date-day") as HTMLSelectElement
      const days = Array.from({length:daysMax}, (v,k) => k).map(x => x + 1)

      days.map(x => {
        const option = document.createElement("option")
        option.text = x+"日"
        option.value = x.toString()
        daySelect?.appendChild(option)
        daySelect.disabled = false 
      })

    },
    changeDay: function(event: Event){
      const target = event.target as HTMLSelectElement      
      this.datedate.day = target.value
      const _thisVal = `${this.datedate.year}-${this.datedate.month}-${this.datedate.day}`
      const _thislabel= this.label
      this.errorMsg = new Array
      const validation = this.validationProp
      const keys = Object.keys(validation)
      this.inputval = _thisVal
      this.$emit("input", _thisVal)

      keys.forEach((key) => {
        const msg = checkValue(_thisVal, key, validation[key], _thislabel)
        msg.length > 0 ? this.errorMsg.push(msg) : null
      })
    },
  },

})
</script>