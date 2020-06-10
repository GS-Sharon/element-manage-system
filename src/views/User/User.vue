<template>
  <el-container id="user">
    <el-header>
      <el-button type="primary" class="addBtn" @click="handleAdd"
        >新增</el-button
      >
      <common-form
        :form="form"
        :formLabels="formLabels"
        inline
        class="searchBox"
      >
        <el-button type="primary" class="searchBtn">搜索</el-button>
      </common-form>
    </el-header>
    <el-main
      ><common-table
        :tableData="tableData"
        :tableLabels="tableLabels"
        :config="config"
      >
        <!-- 思路：通过插槽进行控制添加 -->
        <el-table-column label="序号" slot="tableHeader">
          <template slot-scope="scope">
            <span>{{ (page - 1) * 10 + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" slot="tableFooter">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </common-table></el-main
    >
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-count="pages"
      :current-page="page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 对话提示框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      v-if="dialogType == 'add' || dialogType == 'edit'"
    >
      <common-form
        :form="dialogForm"
        :formLabels="dialogLabel"
        inline
      ></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";
export default {
  components: {
    CommonTable,
    CommonForm
  },
  data() {
    return {
      form: {
        search: ""
      },
      formLabels: [
        {
          type: "input",
          prop: "search",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            {
              min: 3,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ],
          style: {
            width: "180px"
          },
          class: "searchInput"
        }
      ],
      tableData: [],
      tableLabels: [
        {
          labelName: "姓名",
          prop: "name"
        },
        {
          labelName: "性别",
          prop: "sex"
        },
        {
          labelName: "年龄",
          prop: "age"
        },
        {
          labelName: "出生日期",
          prop: "bornDate"
        },
        {
          labelName: "地址",
          prop: "address"
        }
      ],
      config: {
        loading: false
      },
      page: 1,
      pages: 0,
      dialogVisible: false,
      dialogTitle: "",
      dialogType: "add",
      dialogForm: {
        name: "",
        age: "",
        sex: "",
        bornDate: "",
        address: ""
      },
      dialogLabel: [
        {
          label: "姓名",
          type: "input",
          prop: "name"
        },
        {
          label: "年龄",
          type: "input",
          prop: "age"
        },
        {
          label: "性别",
          type: "radio",
          prop: "sex",
          childs: [
            {
              label: "男",
              value: "男"
            },
            {
              label: "女",
              value: "女"
            }
          ]
        },
        {
          label: "出生日期",
          type: "date",
          prop: "bornDate"
        },
        {
          label: "地址",
          type: "input",
          prop: "address"
        }
      ]
    };
  },
  watch: {
    form: {
      handler() {
        console.log(this.form.search);
      },
      deep: true
    },
    dialogType(newVal) {
      switch (newVal) {
        case "add":
          this.dialogTitle = "新增用户";
          break;
        case "delete":
          this.dialogTitle = "删除用户";
          break;
        case "edit":
          this.dialogTitle = "编辑用户";
          break;
      }
    }
  },
  created() {
    this.getTableData({ page: 1 });
  },
  methods: {
    getTableData(params) {
      this.config.loading = true;
      this.$http.post("/user/userData", params).then(res => {
        if (res.code == 1) {
          this.tableData = res.result.map(item => {
            item.sex = item.sex == 1 ? "男" : "女";
            return item;
          });
          this.pages = res.pages;
          this.config.loading = false;
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData({ page: val });
    },
    // 增加用户
    handleAdd() {
      this.dialogVisible = true;
      this.dialogType = "add";
      // 清空对话框
      this.dialogForm = {
        name: "",
        age: "",
        sex: "",
        bornDate: "",
        address: ""
      };
    },
    // 删除用户
    handleDelete(row) {
      this.dialogType = "delete";
      this.$confirm("此操作将永久删除该用户，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post("/user/deleteUser", row).then(res => {
            if (res.code == 20000) {
              this.getTableData({ page: this.page });
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑用户
    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogType = "edit";
      this.dialogForm = row;
    },
    // 对话框取消
    handleCancel() {
      this.dialogVisible = false;
    },
    // 对话框确认
    handleConfirm() {
      this.dialogVisible = false;
      // 编辑用户
      if (this.dialogType == "edit") {
        this.$http.post("/user/editUser", this.dialogForm).then(res => {
          if (res.code == 20000) {
            this.getTableData({ page: this.page });
          }
        });
      }
      // 新增用户
      if (this.dialogType == "add") {
        this.$http.post("/user/addUser", this.dialogForm).then(res => {
          if (res.code == 20000) {
            this.getTableData({ page: this.page });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user.scss";
</style>
