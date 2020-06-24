<template>
  <!-- 工作流管理 => 工作流用户分组 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="用户组名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>
      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='用户组编号'></el-table-column>
          <el-table-column prop='name2' label='用户组名称'></el-table-column>
          <el-table-column prop='name3' label='用户组类型'></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="name1" label="用户组名称" required>
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除商户详情 -->
    <el-dialog title="删除商户详情" :visible.sync="deleteDisplay" width="600px">
      <div class="dialog-deleted-content">您确定要删除该任务调度配置<span>[8338]</span>吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '7580',
  name2: '【七分钱支付】商户审核已通过',
  name3: '短信',
  name4: '13268253637',
  name5: '2019-12-02 21:52:22',
  name6: 'ERROR',
  name7: '0151912022152222990150',
  name8: '注册验证',
  name9: 'ssssssssss'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {},
      deleteDisplay: false,
      tableData: new Array(5).fill(testData),
      paginationOps: {
        pageSizes: [5, 10, 15, 20],
        total: 100
      }
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {},
  methods: {
    addModelSubmit() {
      this.$refs['alertAddModelForm'].validate((files, object) => {
        if (files) {
          // 验证通过 发送请求添加数据到数据库
          this.addDisplay = false;
        } else {
          const keys = Object.keys(object);
          this.$message.error(`${keys[0]}不可为空`);
        }
      });
    },
    addModelCancel() {
      this.resetFormFields('alertAddModelForm');
      this.addDisplay = false;
    },
    deleteClick(row) {
      this.deleteDisplay = true;
      window.console.log(row);
    },
    deleteModelSubmit() {
      this.deleteDisplay = false;
    },
    deleteModelCancel() {
      this.deleteDisplay = false;
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss' scoped></style>