<template>
  <!-- 财务管理 => 交广科技对账结果 => 交广科技对账源数据表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="七分钱-交广清算流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="会计日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="交广平台流水号" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="银联查询流水号" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop="name1" label="七分钱-交广清算流水号" min-width="180"></el-table-column>
          <el-table-column prop="name2" label="交广平台流水号" width="120"></el-table-column>
          <el-table-column prop="name3" label="银联查询流水号" min-width="100"></el-table-column>
          <el-table-column prop="name4" label="主账号" min-width="100"></el-table-column>
          <el-table-column prop="name5" label="交易金额" min-width="80"></el-table-column>
          <el-table-column prop="name6" label="交易类型" width="80"></el-table-column>
          <el-table-column prop="name7" label="交易状态" width="80"></el-table-column>
          <el-table-column prop="name8" label="会计日期" width="100"></el-table-column>
          <el-table-column prop="name9" label="写入时间" width="160"></el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>
  </div>
</template>

<script>
const testData = {
  name1: 'TBTRANSFER0012018021715360008600638542',
  name2: '77682',
  name3: '',
  name4: '9999990000103388',
  name5: '0.05',
  name6: '转账',
  name7: '成功',
  name8: '20180217',
  name9: '2018-02-18 04:30:00'
};
export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      tableData: new Array(10).fill(testData),
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
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    iquireGoToSearch() {
      window.console.log(this.iquireExamine, '查询');
    },
    download() {
      this.$message('导出报表');
    },
    iquireDownload() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss' scoped></style>