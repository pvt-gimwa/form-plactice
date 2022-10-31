<template>
  <div class="simulation">
    <form class="simulation__form">
      <input type="text" placeholder="test">
      <button type="submit" @click="confirm">確定</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Form',
  methods: {
    confirm: function() {
      alert("submit!")
    }
  }
  // props: {
  //   msg: String,
  // },
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
