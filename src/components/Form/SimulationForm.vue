<template>
  <div class="simulation">
    <form class="simulation__form" v-on:submit="$router.push('/confirm')">
      <div v-for="(item, idx1) in formdata">
        <div class="simulation__form__group">
          <h2 class="simulation__form__group__title">
           {{ item.block }}
          </h2>
          <div class="simulation__form__group__item" v-for='(cell, idx2) in item.data'>
            <!-- タイトル -->
            <div class="simulation__form__group__item__title" >
              <label class="simulation__form__group__item__title__text">
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
               :type="cell.type"
               :classProp="'simulation__form__group__item__wrap_input'"
               :validationProp="cell.validation"
               :value="formdata[idx1].data[idx2].value"
               v-model="formdata[idx1].data[idx2].value"
               v-on:inputevent='watchInputevent'
              />
              <!-- <input class="simulation__form__group__item__wrap_input"
                type="text"
                v-model="formdata[idx1].data[idx2].value"
                :name="cell.name"
                v-if="$route.meta?.isForm"
              >
              <p class="simulation__form__group__item__wrap_text"
               v-if="$route.meta?.isConfirm === true"
              >
               {{formdata[idx1].data[idx2].value}}
              </p> -->
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
        v-on:click="$router.push('/')"
      >戻る</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue,{PropType} from 'vue'
import InputVue from '@/components/Form/Input.vue'; // @ is an alias to /src

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
  type: string
}

interface DataList {
  name: string
  label: string
  value: string
  type: string
  validation: Val
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
    console.log(this.data)
    return {
      formdata:this.data,
      msg:""
    }
  },
  props:{
    data:{
      type: Array as unknown as PropType<FormDataType>,
      required: true
    }
  },
  mounted(){
    // console.log(this)
    // console.log(typeof this.data)
  },
  methods: {
    log(item: any){
      console.log(item)
    },
    watchInputevent:function(vals:any){ //直接监听 又子组件触发的事件，参数为子组件的传来的数据
      console.log("msg:"+this.msg) //结果：这是子组件的数据，将有子组件操作触发传给父组件
      this.msg = vals
    } 
  },
  components:{
    InputVue
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
