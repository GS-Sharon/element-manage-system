<template>
  <div id="commonAside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollpase"
    >
      <el-menu-item
        v-for="item of items"
        :key="item.title"
        :index="item.path"
        @click="setCurrentMenu(item)"
      >
        <i :class="['menuIcon', item.icon]"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item of childItems"
        :key="item.title"
        :index="item.path"
      >
        <template slot="title">
          <i :class="['menuIcon', item.icon]"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="child of item.children"
          :key="child.title"
          :index="child.path"
          @click="setCurrentMenu(child)"
        >
          <i :class="['menuIcon', child.icon]"></i>
          <span>{{ child.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonAside",
  computed: {
    ...mapState({
      isCollpase: state => state.tab.isCollpase,
      nav: state => state.user.menu
    }),
    items() {
      return this.nav.filter(item => !item.children);
    },
    childItems() {
      return this.nav.filter(item => !!item.children);
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      addTab: "ADDTAB",
      selectMenu: "SETCURRENTMENU"
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    setCurrentMenu(item) {
      this.addTab(item);
      this.$router.push({ name: item.name });
      this.selectMenu(item);
    }
  }
};
</script>
<style lang="scss" scoped>
#commonAside {
  height: 100%;
  .el-menu {
    height: 100%;
    .menuIcon {
      color: #fff;
      margin-right: 5px;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
<style lang="scss">
#commonAside {
  .el-submenu__icon-arrow {
    color: #fff !important;
  }
  ul {
    border-right: 0;
  }
}
</style>
