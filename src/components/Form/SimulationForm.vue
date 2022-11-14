<template>
  <div class="simulation">
    <form class="simulation__form" name="simulation__form" @submit.prevent="handleSubmit">
      <div v-for="(item, idx1) in formdata">
        <div class="simulation__form__group">
          <h2 class="simulation__form__group__title">
           {{ item.block }}
          </h2>
          <div class="simulation__form__group__item" v-for='(cell, idx2) in item.data'>
            <!-- タイトル -->
            <div class="simulation__form__group__item__title" >
              <label class="simulation__form__group__item__title__text" :for="cell.name">
               {{cell.label}}
              </label>
              <span class="simulation__form__group__item__title__tag simulation__form__group__item__title__tag--reg"
               v-if='cell.validation.required == "true"'
              >
              必須
              </span>
              <span class="simulation__form__group__item__title__tag"
               v-else='cell.validation.required == "true"'
              >
              任意
              </span>
            </div>
            <!-- 値 -->
            <div class="simulation__form__group__item__wrap">
              <InputVue
               v-if="cell.type === 'text' || cell.type === 'textarea'"
               :type="cell.type"
               :name="cell.name"
               :classProp="'simulation__form__group__item__wrap_input'"
               :validationProp="cell.validation"
               :label="cell.label"
               :option="cell.option"
               ref="child"
               v-model="formdata[idx1].data[idx2].value"
              />
              <SelectVue
               v-if="cell.type === 'select'"
               :type="cell.type"
               :name="cell.name"
               :classProp="'simulation__form__group__item__wrap_select'"
               :validationProp="cell.validation"
               :label="cell.label"
               :option="cell.option"
               ref="child"
               v-model="formdata[idx1].data[idx2].value"
              />
              <DateVue
               v-if="cell.type === 'date'"
               :type="cell.type"
               :name="cell.name"
               :classProp="'simulation__form__group__item__wrap_select'"
               :validationProp="cell.validation"
               :label="cell.label"
               :option="cell.option"
               ref="child"
               v-model="formdata[idx1].data[idx2].value"
              />
            </div>
          </div>
        </div>
        <hr>
      </div>
      <button 
       v-if="$route.meta?.isForm === true"
      >確定</button>
      <button
       v-if="$route.meta?.isConfirm === true"
       @click = "$router.push('/')"
      >戻る</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue,{PropType} from 'vue'
import InputVue from '@/components/Form/Input.vue'; // @ is an alias to /src
import SelectVue from '@/components/Form/Select.vue'; // @ is an alias to /src
import DateVue from './Date.vue';
import checkValue from './valdator'

interface Val{
  required: string
  min: string
  max: string
  headZero: string
  matches: string
  textMin: string
  textMax: string
  noHyphen: string
  email: string
}

interface Option {
  mode: string
  data: DataList2[]
}

interface DataList2{
  [index: number]: string
}
interface DataList {
  name: string
  label: string
  value: string
  type: string
  validation: Val
  option: Option

}

interface FormDataItem {
  block: String
  data: DataList[]
}

interface FormDataType {
  formdata: FormDataItem
}

export default Vue.extend({
  name: 'SimulationForm',
  data(){
    return {
      formdata:this.data,
    }
  },
  props:{
    data:{
      type: Array as unknown as PropType<FormDataType>,
      required: true
    }
  },
  mounted(){

    if(this.$route.meta?.isConfirm === true){
      const allErrorMsg: any[] = [];
      this.check(allErrorMsg)
      if(allErrorMsg.length > 0){
        this.$router.push({name: 'form'})
      }
    }

  },
  methods: {
    log(item: any){
      console.log(item)
    },
    handleSubmit() {

      // console.log(this.data)

      const allErrorMsg: any[] = [];

      this.check(allErrorMsg)

      if(allErrorMsg.length === 0){
        this.$router.push({name: 'confirm'})
      }

    }, 
    check(allErrorMsg:any) {
      (this.$refs.child as any).forEach((input: {
        [x: string]: any
        checkString: Function 
      })=> {
        input.errorMsg = new Array
        const _thisVal = input.inputval
        const _thislabel= input.labeltext
        const _thisvalidation = input.validatior
        const _thiskeys = Object.keys(_thisvalidation)

        _thiskeys.forEach((key) => {
          const msg = checkValue(_thisVal, key, _thisvalidation[key], _thislabel)
          msg.length > 0 ? input.errorMsg.push(msg) : null
        })

        if(input.errorMsg.length > 0){
          console.log(`_thisVal:${_thisVal} ,_thislabel:${_thislabel} ,_thisvalidation:${_thisvalidation} ,_thiskeys:${_thiskeys}`)
          allErrorMsg.push(input.errorMsg)
        } 

      })
    },
  },
  components:{
    InputVue,
    SelectVue,
    DateVue,
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
