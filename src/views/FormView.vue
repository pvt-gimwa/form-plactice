<template>
  <div class="about">
    <h1>FormView.vue</h1>
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