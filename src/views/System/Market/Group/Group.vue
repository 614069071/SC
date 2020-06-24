<template>
  <!-- 系统管理 => 市场部管理 => 市场部分组管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="客户经理账号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="客户经理名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="团队负责人" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="收件时间" prop="name4">
            <el-date-picker v-model="examine.name4" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
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
          <el-table-column prop='name1' min-width="140" label='客户经理账号'></el-table-column>
          <el-table-column prop='name2' min-width="120" label='客户经理名称'></el-table-column>
          <el-table-column prop='name3' min-width="120" label='团队负责人'></el-table-column>
          <el-table-column prop='name4' min-width="180" label='创建时间'></el-table-column>
          <el-table-column prop='name5' min-width="120" label='更新人'></el-table-column>
          <el-table-column prop='name6' min-width="200" label='更新时间'></el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 新增用户 待修改 -->
    <el-dialog title="新增用户" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="80px" :show-message="false">
        <el-form-item prop="name1" label="用户账号" required>
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="用户姓名" required>
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="用户组" required>
          <el-select v-model="addModelData.name3" placeholder="选择用户组">
            <el-option label="总裁组" value="1"></el-option>
            <el-option label="副总裁组" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户修改 -->
    <el-dialog title="分组修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertModelForm" :model="editorModelData" class="alert-model-form" label-width="110px" :show-message="false">
        <el-form-item prop="name1" label="客户经理账号" required>
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="客户经理名称" required>
          <el-input v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="创建时间" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="团队负责人" required>
          <el-select v-model="editorModelData.name3" placeholder="选择">
            <el-option label="总裁组" value="1"></el-option>
            <el-option label="副总裁组" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
const testData = {
  name1: 'GYZB-0395',
  name2: '伍龄童',
  name3: '伍龄童',
  name4: '2016-09-21 16:34:54',
  name5: '市场部总裁',
  name6: '2018-02-28 15:10:30'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {},
      editorDisplay: false,
      editorModelData: {},
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
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorClick(row) {
      this.editorDisplay = true;
      this.editorModelData = row;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    insertItem() {
      this.$message('内容待写');
      // 新增
      // this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss' scoped>