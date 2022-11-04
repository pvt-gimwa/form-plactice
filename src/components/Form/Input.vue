<template>
  <div :class="className">
    <template v-if="type !== 'textarea'">
      <input
        v-if="$route.meta?.isForm"
        v-model="inputval"
        type="text" 
        class="form__group__item__wrap_input"
        @input="handleinput"
      />
    </template>
    <template v-else>
      <textarea
        v-if="$route.meta?.isForm"
        class="form__group__item__wrap_textarea"
        @input="handleinput"
      >{{inputval}}</textarea>
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
import Vue, {PropType} from 'vue'

export default Vue.extend({
  name: 'InputIndex',
  data(){
    console.log("this.type:"+this.type)
    return {
      inputtype: this.type,
      className: this.classProp,
      inputval: this.value,
    }
  },
  props:{
    value:{
      type:String,
      required: true
    },
    type:{
      required: true
    },
    classProp:{
      required: true
    }
  },
  created(){
    // console.log(this.type)
  },
  methods: {
    log(item: any) {
      console.log(item)
    },
    handleinput(event:any) {
      this.$emit("input", event.target.value)
    },
    clear() {
      this.$emit("input","")
    },
    // handlepwd() {
    //   this.pwVisiable = !this.pwVisiable   
    // }
  },
})
</script>