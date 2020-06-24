<template>
  <!-- 财务管理 => 交广科技对账结果 => 差错报表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="七分钱-交广清算流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="对账日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="会计日期" prop="name3">
            <el-date-picker v-model="examine.name3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
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
          <el-table-column prop="name1" label="对账日期" width="100"></el-table-column>
          <el-table-column prop="name2" label="七分钱会计日期" width="120"></el-table-column>
          <el-table-column prop="name3" label="渠道名称" min-width="100"></el-table-column>
          <el-table-column prop="name4" label="七分钱-交广清算流水号" min-width="180"></el-table-column>
          <el-table-column prop="name5" label="交广平台流水号" min-width="120"></el-table-column>
          <el-table-column prop="name6" label="交易类型" width="90"></el-table-column>
          <el-table-column prop="name7" label="七分钱交易金额" min-width="120"></el-table-column>
          <el-table-column prop="name8" label="交广交易金额" min-width="120"></el-table-column>
          <el-table-column prop="name9" label="交易发送时间" min-width="130"></el-table-column>
          <el-table-column prop="name10" label="交易返回时间" min-width="130"></el-table-column>
          <el-table-column prop="name11" label="差错信息" min-width="120"></el-table-column>

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
  name1: '2016-12-11',
  name2: '20161210',
  name3: '交广科技',
  name4: 'TBTRANSFER0012016120923435228500022161',
  name5: '',
  name6: '转账',
  name7: '1.43',
  name8: '',
  name9: '20161209234352',
  name10: '20161209234351',
  name11: '数据差错,,,,,,',
  name12: ''
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