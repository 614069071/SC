<template>
  <!-- 商户管理 > 商户账户管理 -->
  <div class="merchants-rate-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="90px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>

          <el-form-item label="商户名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>

          <el-form-item label="七分钱账号" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="可用" value="1"></el-option>
              <el-option label="冻结" value="2"></el-option>
              <el-option label="注销" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <!-- 商户编号 七分钱账号 商户名称 科目编号 余额方向 余额 冻结金额 在途金额 可用余额 状态 创建时间 -->
        <el-table :data="tableData" border class="tableInner-content">
          <el-table-column prop='name1' label='商户编号' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='七分钱账号' min-width="160"></el-table-column>
          <el-table-column prop='name3' label='商户名称' width="80"></el-table-column>
          <el-table-column prop='name4' label='科目编号' width="80"></el-table-column>
          <el-table-column prop='name5' label='余额方向' width="80"></el-table-column>
          <el-table-column prop='name6' label='余额' width="80"></el-table-column>
          <el-table-column prop='name7' label='冻结金额' width="80"></el-table-column>
          <el-table-column prop='name8' label='在途金额' width="80"></el-table-column>
          <el-table-column prop='name3' label='可用余额' width="80"></el-table-column>
          <el-table-column prop='name10' label='状态' width="60"></el-table-column>
          <el-table-column prop='name11' label='创建时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
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

    <!-- 协议修改 -->
    <el-dialog title="协议修改" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" class="editor-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="name1" label="商户编号">
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="商户名称">
          <el-input disabled v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="七分钱账号">
          <el-input disabled v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="name4">
          <el-select v-model="editorModelData.name4" placeholder="请选择">
            <el-option label="可用" value="1"></el-option>
            <el-option label="冻结" value="2"></el-option>
            <el-option label="注销" value="3"></el-option>
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
  name1: 'P20191129001',
  name2: 'SEVENBUSS0012019112817503152500256',
  name3: '唐均素',
  name4: '8',
  name5: '贷',
  name6: '0.00',
  name7: '0.00',
  name8: '0.00',
  name9: '0.00',
  name10: '可用',
  name11: '2019-11-28 17:50:31'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      restaurants: [],
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
    editorClick(row) {
      this.editorDisplay = true;
      this.editorModelData = row;
      window.console.log(row);
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    }
  }
};
</script>

<style lang='scss'>
.merchants-rate-page {
  .add-form-rate {
    .el-form-item__content {
      .el-input {
        margin: 0 4px;
        &:first-child {
          margin-left: 0;
        }
      }

      display: flex;
      i {
        display: inline-block;
        width: 230px;
      }
    }
  }
}
</style>