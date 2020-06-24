<template>
  <!-- 财务管理 => 交广科技对账结果 => 交广科技存疑报表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="会计开始日期" prop="name1">
            <el-date-picker v-model="examine.name1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="会计结束日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="批次号" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="查询流水号" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
          <el-form-item label="商户订单号" prop="name5">
            <el-input v-model="examine.name5"></el-input>
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
          <el-table-column prop="name1" label="文件编号" min-width="170"></el-table-column>
          <el-table-column prop="name2" label="序号" width="60"></el-table-column>
          <el-table-column prop="name3" label="会计日期" width="90"></el-table-column>
          <el-table-column prop="name4" label="批次编号" min-width="140"></el-table-column>
          <el-table-column prop="name5" label="查询流水号" min-width="120"></el-table-column>
          <el-table-column prop="name6" label="商户订单号" min-width="160"></el-table-column>
          <el-table-column prop="name7" label="交易金额" width="85"></el-table-column>
          <el-table-column prop="name8" label="结算金额" width="85"></el-table-column>
          <el-table-column prop="name9" label="交易传输时间" width="100"></el-table-column>
          <el-table-column prop="name10" label="对账处理备注" min-width="120"></el-table-column>
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
  name1: 'UNIONPAY-BALANCE-FILE-20170822100000',
  name2: '1',
  name3: '20170821',
  name4: 'BAL-UNIONPAY-20170822101000',
  name5: '201708202310304072508',
  name6: 'a2e7bcdda03d45c6b2a612d9a082eb9a',
  name7: '99.80',
  name8: '99.80',
  name9: '0820231030',
  name10: '数据存疑：银联有，七分钱无'
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