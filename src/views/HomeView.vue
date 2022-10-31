<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MyForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MyForm from '@/components/SimulationForm.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'HomeView',
  components: {
    MyForm,
  },
});
</script>
