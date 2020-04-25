<template>
  <div id="app">
    
        <router-view :key="routeKey" class="router"></router-view>
    
  </div>
</template>

<script>
export default {
  created() {},
  computed: {
    routeKey() {
      if (this.$route.name === "post") {
        return this.$route.path;
      } else if (this.$route.name === "pin") {
        return this.$route.path;
      } else if (this.$route.name === "book") {
        return this.$route.path;
      } else if (this.$route.name === "user") {
        return this.$route.path;
      }
    },
    keepAliveArr() {
      return this.$store.state.keepAliveArr;
    }
  },
  methods: {
    beforeEnter() {
      // this.$store.dispatch('setRouteTransition', false)
    },
    afterEnter() {
      // this.$store.dispatch('setRouteTransition', true)
    }
  }
};
</script>

<style lang='less'>
@gray-color: #f6f6f6;
#app {
  width: 100%;
  height: 100%;
  background: @gray-color;
  overflow: hidden;
}
.router {
  background: @gray-color;
  height: 100%;
  width: 100%;
}
</style>