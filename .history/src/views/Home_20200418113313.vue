<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h1 @click='myClick'>{{data}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      data: "data",
      cont: 0
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    myClick:function() {
      this.cont++;
      this.$data.data = "data" + this.$data.cont;
    }
  }
};
</script>
