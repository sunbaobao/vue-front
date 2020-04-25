<template>
  <el-container style="height:100vh;">
    <el-header class="header" height="61px">
      <div class="w-1200">
        <h1 class="logo">你好!</h1>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :router="isRouter"
        >
          <el-menu-item index="1">游戏</el-menu-item>
          <el-submenu index="2">
            <template slot="title">小案例</template>
            <el-menu-item index="/router1">router1</el-menu-item>
            <el-menu-item index="/router2">router2</el-menu-item>
            <el-menu-item index="/">main</el-menu-item>
            <el-menu-item index="/store">store</el-menu-item>
            <el-menu-item index="/user">系统用户</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
          <!-- <el-menu-item>
            <el-dropdown @command="handleCommand">
              <el-avatar v-if="user">{{user.username}}</el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="signOut">签出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item> -->
        </el-menu>
      </div>
    </el-header>
    <el-main style="padding: 0; height:100%">
      <el-scrollbar style="height:100%">
        <div class="w-1200">
          <router-view></router-view>
        </div>
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
      activeIndex2: "1",
      isRouter: true
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
.el-menu-demo {
  float: right;
}
.header {
  border-bottom: 1px solid #dcdfe6;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  min-height: 100%;
}
.logo {
  color: #409eff;
  font-weight: normal;
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
