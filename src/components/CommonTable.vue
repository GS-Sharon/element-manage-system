<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    v-loading="config.loading"
  >
    <slot name="tableHeader"></slot>

    <el-table-column
      v-for="item in tableLabels"
      :label="item.labelName"
      :key="item.labelName"
      show-overflow-tooltip
    >
      <template slot-scope="scope"
        ><span>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
    <slot name="tableFooter"></slot>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
      require: true
    },
    tableLabels: {
      type: Array,
      default() {
        return [];
      },
      require: true
    },
    config: {
      type: Object,
      default() {
        return {};
      },
      require: false
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style lang="scss" scoped></style>
