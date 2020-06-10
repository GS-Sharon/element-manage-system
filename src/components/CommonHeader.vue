<template>
  <div id="commonHeader">
    <div class="left-content">
      <el-button
        type="primary"
        icon="el-icon-menu"
        size="mini"
        @click="collpaseMenu"
        :class="['collpaseBtn', isCollpase ? 'collpased' : 'opened']"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'Main' }">首页 </el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentMenu" :to="{ path: currentMenu.path }"
          >{{ currentMenu.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-plus" @click.native="loginOut"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonHeader",
  computed: {
    ...mapState({
      currentMenu: state => state.tab.currentMenu,
      isCollpase: state => state.tab.isCollpase
    })
  },
  data() {
    return {
      userImg: require("@/assets/images/headPhoto.jpeg")
    };
  },
  methods: {
    ...mapMutations({
      clearToken: "CLEARTOKEN",
      changeCollpase: "CHANGECOLLPASE",
      clearUserInfo: "CLEARUSERINFO",
      clearMenu: "CLEARMENU",
      clearCurrentMenu: "CLEARCURRENTMENU"
    }),
    collpaseMenu() {
      this.changeCollpase();
    },
    loginOut() {
      this.clearToken();
      this.clearUserInfo();
      this.clearMenu();
      this.clearCurrentMenu();
      this.$router.push({ name: "Login" });
      location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
#commonHeader {
  height: 100%;
  background-color: #343434;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left-content {
    display: flex;
    align-items: center;
    .collpaseBtn {
      margin-right: 10px;
      &.collpased {
        color: #000;
        background-color: #fff;
        border-color: #fff;
      }
    }
  }
  .right-content {
    float: right;
    .el-dropdown-link {
      display: block;
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        border-radius: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
#commonHeader {
  .left-content {
    .el-breadcrumb {
      .el-breadcrumb__item:last-child {
        .is-link {
          color: #fff !important;
        }
      }
    }
  }
}
</style>
