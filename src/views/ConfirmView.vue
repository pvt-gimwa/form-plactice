<template>
  <div class="form__confirm">
    <h1>確認画面</h1>
    <SimulationForm 
      :data="formdata"
    />
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import SimulationForm from '@/components/Form/SimulationForm.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'ConfirmView',
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