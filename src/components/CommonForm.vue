<template>
  <el-form ref="form" :model="form" :inline="inline">
    <el-form-item
      v-for="item of formLabels"
      :label="item.label"
      :key="item.label"
      :prop="item.prop"
      :rules="item.rules"
      :style="item.style"
      :class="item.class"
    >
      <!-- 输入框 -->
      <el-input
        v-model="form[item.prop]"
        v-if="item.type == 'input'"
      ></el-input>
      <!-- 密码输入框 -->
      <el-input
        :type="pwdType"
        v-model="form[item.prop]"
        autocomplete="off"
        v-if="item.type == 'password'"
      >
        <i slot="suffix" class="el-icon-view" @click="showPwd"></i
      ></el-input>
      <!-- 复选框 -->
      <el-checkbox-group
        v-model="form[item.prop]"
        v-if="item.type == 'checkbox'"
      >
        <el-checkbox
          v-for="checkbox in group"
          :key="checkbox.label"
          :label="checkbox.label"
          :name="item.prop"
        ></el-checkbox>
      </el-checkbox-group>
      <!-- 单选按钮 -->
      <el-radio-group v-model="form[item.prop]" v-if="item.type == 'radio'">
        <el-radio
          v-for="radio in item.childs"
          :key="radio.label"
          :label="radio.label"
        ></el-radio>
      </el-radio-group>
      <!-- 下拉列表 -->
      <el-select
        v-model="form[item.prop]"
        :placeholder="item.placeholder"
        v-if="item.type == 'select'"
      >
        <el-option
          v-for="option in item.group"
          :label="option.label"
          :key="option.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 切换按钮 -->
      <el-switch
        v-model="form[item.prop]"
        v-if="item.type == 'switch'"
      ></el-switch>
      <!-- 时间选择器 -->
      <el-date-picker
        type="date"
        :placeholder="item.placeholder ? item.placeholder : '选择日期'"
        v-model="form[item.prop]"
        v-if="item.type == 'date'"
      ></el-date-picker>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
      require: true
    },
    formLabels: {
      type: Array,
      default() {
        return [];
      },
      require: true
    },
    // 是否为行内表单样式
    inline: {
      type: Boolean,
      default: false,
      require: false
    }
  },
  data() {
    return {
      pwdType: "password"
    };
  },
  methods: {
    showPwd() {
      this.pwdType == "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
      let e = document.getElementsByClassName("el-icon-view")[0];
      this.pwdType == ""
        ? e.setAttribute("style", "color: #409EFF")
        : e.setAttribute("style", "color: #c0c4cc");
    }
  }
};
</script>
<style lang="scss" scoped></style>
