<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>{{data}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data:function(){
    return {
      data:'data'
    }
  },

  components: {
    HelloWorld
  },
  methods:{
    myClick:()=>{

    }
  }
}
</script>
