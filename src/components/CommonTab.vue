<template>
  <div id="commonTab">
    <el-tag
      v-for="tab of tabs"
      :key="tab.title"
      size="small"
      :closable="tab.title != '首页'"
      @close="handleClose(tab)"
      @click="selectTab(tab)"
      >{{ tab.title }}</el-tag
    >
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTab",
  computed: {
    ...mapState({
      tabs: state => state.tab.tabs
    })
  },
  methods: {
    ...mapMutations({
      closeTab: "CLOSETAB",
      selectMenu: "SETCURRENTMENU"
    }),
    handleClose(tab) {
      this.closeTab(tab);
    },
    selectTab(tab) {
      this.$router.push({ name: tab.name });
      this.selectMenu(tab);
    }
  }
};
</script>
<style lang="scss" scoped>
#commonTab {
  display: flex;
  justify-content: flex-start;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
