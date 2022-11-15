<template ref="dateValue">
  <div :class="className">

    <div class="form__group">
      <div
        v-if="$route.meta?.isForm"
        class="form__group__item__wrap"
      >
        <select
          class="form__group__item__wrap__date form__group__item__wrap__date-year"
          @change="changeYear"
          v-model="datedate.year"
        >
          <option disabled selected value="">例）1990</option>
          <template v-for=" item in selectoption.data" >
            <option :value="item">
              {{item}}
            </option>
          </template>
        </select>
        <span class="form__group__item__wrap__unit" v-if=" inputunit.year !== '' ">{{inputunit.year}}</span>
        <span class="form__group__item__wrap__icon">▼</span>
      </div>

      <div
        v-if="$route.meta?.isForm && (selectoption.mode === 'ym' || selectoption.mode == 'ymd')"
        class="form__group__item__wrap"
      >
        <select
          class="form__group__item__wrap__date form__group__item__wrap__date-month"
          disabled
          v-model="datedate.month"
          @change="changeMonth"
        >
          <option disabled selected value="">例）01</option>
        </select>
        <span class="form__group__item__wrap__unit" v-if=" inputunit.month !== '' ">{{inputunit.month}}</span>
        <span class="form__group__item__wrap__icon">▼</span>
      </div>

      <div
        v-if="$route.meta?.isForm && selectoption.mode == 'ymd'"
        class="form__group__item__wrap"
      >
        <select
          class="form__group__item__wrap__date form__group__item__wrap__date-day"
          disabled
          v-model="datedate.day"
          @change="changeDay"
        >
          <option disabled selected value="">例）01</option>
        </select>
        <span class="form__group__item__wrap__unit" v-if=" inputunit.day !== '' ">{{inputunit.day}}</span>
        <span class="form__group__item__wrap__icon">▼</span>
      </div>
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
  name: 'DateVue',
  data(){

    const year      = this.value.split("-")[0] || ""
    const month     = this.value.split("-")[1] || ""
    const day       = this.value.split("-")[2] || ""
    const unitYear  = this.unit.split("-")[0] || ""
    const unitMonth = this.unit.split("-")[1] || ""
    const unitDay   = this.unit.split("-")[2] || ""
    return {
      datedate: {year: year, month: month, day: day},
      inputtype: this.type,
      className: this.classProp,
      inputval: this.value,
      errorMsg:  new Array,
      validatior: this.validationProp,
      labeltext: this.label,
      nametext: this.name,
      selectoption: this.option,
      inputunit: {year: unitYear, month: unitMonth, day: unitDay},
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
  methods: {
    handleChange: function(event: Event) {
      const target     = event.target as HTMLSelectElement      
      const _thisVal   = target.value
      const _thislabel = this.label

      this.$emit("input", target.value)

      this.errorMsg    = new Array
      const validation = this.validationProp
      const keys       = Object.keys(validation)

      keys.forEach((key) => {
        const msg = checkValue(_thisVal, key, validation[key], _thislabel)
        msg.length > 0 ? this.errorMsg.push(msg) : null
      })
    },
    changeYear: function(event: Event){
      const target  = event.target as HTMLSelectElement     
      const mode    = this.option.mode === "ym" || this.option.mode === "ymd"
      this.inputval = ""

      if(target.disabled === true || mode === false){
        return false
      }
 
      this.datedate.year    = target.value
      const monthSelectWrap = target.parentElement?.nextSibling
      const monthSelect     = (<Element>monthSelectWrap).querySelector(".form__group__item__wrap__date-month") as HTMLSelectElement
      const month           = Array.from({length:12}, (v,k) => k).map(x => x + 1)
      const monthOptions    = monthSelect.querySelectorAll('option')

      if(this.option.mode === "ymd"){
        const daySelectWrap   = target.parentElement?.nextSibling?.nextSibling
        const daySelect       = (<Element>daySelectWrap).querySelector(".form__group__item__wrap__date-day") as HTMLSelectElement
        const dayOptions      = daySelect.querySelectorAll('option')
        dayOptions.length > 1 ? Array.from(dayOptions).forEach( (x)=> x.value !== "" ? x.remove() : x.selected = true ) : null
        daySelect.disabled = true
      }

      monthOptions.length > 1 ? Array.from(monthOptions).forEach((x)=> x.value !== "" ? x.remove() : x.selected = true ) : null

      month.map(x => {
        const option    = document.createElement("option")
        option.text     = x.toString()
        option.value    = x.toString()
        option.selected = false
        monthSelect?.appendChild(option)
      })
      monthSelect.disabled = false 
      
    },
    changeMonth: function(event: Event){
      const target        = event.target as HTMLSelectElement      
      this.datedate.month = target.value
      const _thislabel    = this.label
      this.errorMsg       = new Array
      const validation    = this.validationProp
      const keys          = Object.keys(validation)

      if(this.option.mode === "ym"){

        const _thisVal = `${this.datedate.year}-${this.datedate.month}`
        this.inputval  = _thisVal
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
      const nextMonth     = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()+1, 1)
      const daysMax       = Math.round( ( nextMonth.valueOf() - selectedMonth.valueOf() ) / (1000 * 60 * 60 * 24) )
      const daySelectWrap = target.parentElement?.nextSibling
      const daySelect     = (<Element>daySelectWrap).querySelector(".form__group__item__wrap__date-day") as HTMLSelectElement
      const days          = Array.from({length:daysMax}, (v,k) => k).map(x => x + 1)
      const dayOptions    = daySelect.querySelectorAll('option')
      dayOptions.length > 1 ? Array.from(dayOptions).forEach((x)=> x.value !== "" ? x.remove() : x.selected = true ) : null

      days.map(x => {
        const option    = document.createElement("option")
        option.text     = x.toString()
        option.value    = x.toString()
        option.selected = false
        daySelect?.appendChild(option)
      })
      daySelect.disabled = false 

    },
    changeDay: function(event: Event){
      const target      = event.target as HTMLSelectElement      
      this.datedate.day = target.value
      const _thisVal    = `${this.datedate.year}-${this.datedate.month}-${this.datedate.day}`
      const _thislabel  = this.label
      this.errorMsg     = new Array
      const validation  = this.validationProp
      const keys        = Object.keys(validation)
      this.inputval     = _thisVal
      this.$emit("input", _thisVal)

      keys.forEach((key) => {
        const msg = checkValue(_thisVal, key, validation[key], _thislabel)
        msg.length > 0 ? this.errorMsg.push(msg) : null
      })
    },
  },

})
</script>

<style lang="scss" scoped>
.form__group{
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
  &__item{
    &__wrap{
      width: 100%;
      border-bottom: 1px solid #E8E8E8;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      &__date{
        width: 100%;
        font-size: 20px;
        padding: 5px 0;
      }
      &__text{
        font-size: 20px;
        padding: 5px 0;
        text-align: left;
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
      &__unit{
        display: flex;
        justify-content: center;
        align-content: center;
        height: 35px;
        line-height: 35px;
        min-width: 3em;
        font-size: 13px;
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
}

</style>