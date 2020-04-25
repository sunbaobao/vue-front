<template>
  <div id="app">
    <router-view />

    <login-dialog></login-dialog>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import loginDialog from "./components/loginDialog";
import store from "./store";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { Nav, loginDialog },
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
    }
  },
  mounted() {
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

.el-header {
  background-color: #545c64;
  color: #ffffff;
  line-height: 60px;
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
