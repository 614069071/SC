<template>
  <!-- 财务管理 => 交广科技对账结果 => 一致报表 -->
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
          <el-table-column prop="name2" label="会计日期" width="120"></el-table-column>
          <el-table-column prop="name3" label="渠道交易时间" width="140"></el-table-column>
          <el-table-column prop="name4" label="支付平台交易时间" width="140"></el-table-column>
          <el-table-column prop="name5" label="渠道名称" width="90"></el-table-column>
          <el-table-column prop="name6" label="交广平台流水号" width="120"></el-table-column>
          <el-table-column prop="name7" label="七分钱-交广清算流水号" min-width="120"></el-table-column>
          <el-table-column prop="name8" label="渠道交易金额" width="130"></el-table-column>
          <el-table-column prop="name9" label="支付平台交易金额" width="130"></el-table-column>

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
// 2018-02-18	20180217	20180217153409	20180217153600	JGKJ	77682	TBTRANSFER0012018021715360008600638542	0.05	0.05
const testData = {
  name1: '2016-12-11',
  name2: '20161210',
  name3: '20180217153409',
  name4: '20180217153600',
  name5: 'JGKJ',
  name6: '77682',
  name7: 'TBTRANSFER0012018021715360008600638542',
  name8: '0.05',
  name9: '0.05'
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