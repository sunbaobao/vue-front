<template>
  <div>
    router2
    <h2>s</h2>
    <div class="post">
      <div class="loading" v-if="loading">
        Loading...
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="post" class="content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "router2",
    data() {
      return {
        loading: false,
        post: null,
        error: null
      }
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
        this.error = this.post = null;
        this.loading = true;
        // replace getPost with your data fetching util / API wrapper
        var vm=this;
        setTimeout(function () {
          vm.loading = false;
          vm.post = {
            title: "title",
            body: "内容"
          }
        }, 1000)
        // getPost(this.$route.params.id, (err, post) => {
        //   this.loading = false;
        //   if (err) {
        //     this.error = err.toString()
        //   } else {
        //     this.post = post
        //   }
        // })
      }
    }
  }
</script>

<style scoped>

</style>
