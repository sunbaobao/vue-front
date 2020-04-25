<template>
  <el-container style="height:100vh;width:1140px;margin:0 auto" >
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="https://www.ele.me" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="padding: 0; height:100%">
      <el-scrollbar style="height:100%">
          <router-view></router-view>
      </el-scrollbar>
    </el-main>
    <login-dialog></login-dialog>
  </el-container>
</template>

<script>
import Nav from "../components/Nav";
import loginDialog from "../components/loginDialog";
import store from "../store";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { Nav, loginDialog },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  computed: {
    // user() {
    //   return this.$store.state.user
    // },
    ...mapState({
      user: state => state.user,
      token: state => state.Authorization
    })
  },
  methods: {
    handleCommand(command) {
      if (command === "signOut") {
        this.axios.post("/server/user/sign/out").then(res => {
          localStorage.removeItem("Authorization");
          this.$store.commit("updateUser", null);
          this.$message(res.data.meta.message);
          this.$router.go("/");
        });
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    console.log(1);
    if (!this.user && this.token) {
      console.log(this.token);
      this.axios
        .get("/server/user/info")
        .then(res => {
          console.log(res.data.data);
          store.commit("updateUser", res.data.data);
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
h1 {
  float: left;
  font-size: 30px;
  color: #ffffff;
  line-height: 60px;
}
/* .el-menu-demo{
  flex-di
} */
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  min-height: 100%;
}

body {
  min-height: 100vh;
}

body,
h1 {
  padding: 0;
  margin: 0;
}

.el-aside {
  color: #333;
}

.el-dropdown {
  color: #ffffff;
}

.el-container {
  height: calc(100% - 60px);
}
</style>
