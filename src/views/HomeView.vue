<template>
  <div class="form">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <router-view v-bind:formdata.sync="formdata"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import formdata from '@/data/formdata';

export default Vue.extend({
  name: 'HomeView',
  data(){
    return{
      formdata: formdata
    }
  },
});
</script>

<style lang="scss" scoped>
.form{
  > div{
    max-width: 980px;
    width: 100%;
    margin: auto;  
    padding: 60px 0;
  }
}
</style>
