<template>
  <div class="form">
    <div class="form__title">
      <h1>送信完了</h1>
    </div>
    <SimulationForm 
      :data="formdata"
      :formstate="formstate"
      :router="router"
    />
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import SimulationForm from '@/components/Form/SimulationForm.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'CompletedView',
  data(){
    return{
      data: this.formdata,
      meta: this.$route.meta,
      router: this.$router,
      formstate: {
        isCompleted: true,​
        isConfirm: false,
​        isForm: false
      }
    }
  },
  props:{
    formdata:{
      required: true
    }
  },
  components: {
    SimulationForm,
  },
});
  
</script>


<style lang="scss" scoped>
.form{
  &__title{
    text-align: center;
    padding: 10px 30px;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin: 0 0 15px 0;
      padding: 0;
    }
    p {
      font-size: 18px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
