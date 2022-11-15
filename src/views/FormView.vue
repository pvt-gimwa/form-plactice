<template>
  <div class="form">
    <div class="form__title">
      <h1>融資可能額シミュレーション</h1>
      <p>お客様のご属性情報をもとに、フルローンで融資可能額を試算します</p>
    </div>
    <hr>
    <SimulationForm 
      :data="formdata"
    />
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import SimulationForm from '@/components/Form/SimulationForm.vue'; // @ is an alias to /src

  export default Vue.extend({
    name: 'FormView',
    data(){
      return{
        data: this.formdata
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
    text-align: left;
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
