<template>
  <div id="main">
    <el-container>
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header><common-header></common-header></el-header>
        <el-main>
          <common-tab></common-tab>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTab from "../components/CommonTab";
export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTab
  }
};
</script>
<style lang="scss" scoped>
#main {
  height: 100%;
  .el-container {
    height: 100%;
  }
  header {
    padding: 0;
  }
}
</style>
