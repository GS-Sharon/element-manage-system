<template>
  <el-row type="flex" justify="center" align="middle" class="loginBox">
    <el-col :span="8">
      <h1 class="title">用户登陆</h1>
      <common-form :form="loginForm" :formLabels="loginFormLabels">
        <el-button type="primary" class="logBtn" @click="login">登陆</el-button>
      </common-form>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import commonForm from "../../components/CommonForm";
export default {
  components: {
    commonForm
  },
  computed: {
    ...mapState({
      menu: state => state.user.menu
    })
  },
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      loginFormLabels: [
        {
          prop: "name",
          type: "input",
          label: "用户名"
        },
        {
          prop: "password",
          type: "password",
          label: "密码"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setToken: "SETTOKEN",
      setUserInfo: "SETUSERINFO",
      setMenu: "SETMENU",
      addRoute: "ADDROUTE"
    }),
    login() {
      this.$http.post("api/login", this.loginForm).then(res => {
        if (res.code == 20000) {
          this.setToken(res.token);
          this.setUserInfo(res.info);
          this.setMenu(res.menu);
          this.addRoute();
          this.$router.push("/main/home");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  margin-top: -100px;
  .title {
    font-size: 24px;
  }
  .logBtn {
    width: 60%;
    margin-top: 20px;
  }
}
</style>
