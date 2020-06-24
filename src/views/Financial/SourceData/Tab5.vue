<template>
  <!-- 财务管理 => 交广科技对账结果 => 中信对账源数据表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="威富通订单号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="会计日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期">
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
          <el-table-column prop="name1" label="威富通订单号" min-width="150"></el-table-column>
          <el-table-column prop="name2" label="交易类型" min-width="180"></el-table-column>
          <el-table-column prop="name3" label="交易状态" min-width="130"></el-table-column>
          <el-table-column prop="name4" label="货币种类" width="100"></el-table-column>
          <el-table-column prop="name5" label="金额" width="80"></el-table-column>
          <el-table-column prop="name6" label="用户标识" width="150"></el-table-column>
          <el-table-column prop="name7" label="商户号" min-width="80"></el-table-column>
          <el-table-column prop="name8" label="会计日期" width="100"></el-table-column>
          <el-table-column prop="name9" label="交易时间" width="160"></el-table-column>
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
  name1: '102510065801201707232122861282',
  name2: 'pay.alipay.micropayv3',
  name3: '支付成功',
  name4: 'CNY',
  name5: '1.00',
  name6: '2088812107859487',
  name7: '',
  name8: '20170723',
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