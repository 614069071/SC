<template>
  <!-- 财务管理 => 交广科技对账结果 => 七分钱存疑报表 -->
  <div class="financial-unionpay-tab3">
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
          <el-form-item label="七分钱订单号" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="清算流水号" prop="name6">
            <el-input v-model="examine.name6"></el-input>
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
          <el-table-column prop="name1" label="清算流水号" min-width="155"></el-table-column>
          <el-table-column prop="name2" label="会计日期" width="85"></el-table-column>
          <el-table-column prop="name3" label="客户号" min-width="160"></el-table-column>
          <el-table-column prop="name4" label="账号" min-width="80"></el-table-column>
          <el-table-column prop="name5" label="批次编号" min-width="140"></el-table-column>
          <el-table-column prop="name6" label="查询流水号" min-width="90"></el-table-column>
          <el-table-column prop="name7" label="七分钱订单号" min-width="150"></el-table-column>
          <el-table-column prop="name8" label="响应码" width="85"></el-table-column>
          <el-table-column prop="name9" label="交易金额" width="90"></el-table-column>
          <el-table-column prop="name10" label="清算金额" min-width="90"></el-table-column>
          <el-table-column prop="name11" label="订单发送时间" min-width="90"></el-table-column>
          <el-table-column prop="name12" label="对账处理备注" min-width="120"></el-table-column>
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
  name1: '855487ed96204f6aae34729db83b920d',
  name2: '20170821',
  name3: 'd90fc568f4654b8b8b3d16bd08b949cd',
  name4: '',
  name5: 'BAL-UNIONPAY-20170822101000',
  name6: '',
  name7: '855487ed96204f6aae34729db83b920d',
  name8: '',
  name9: '49.80',
  name10: '',
  name11: '20170821102815',
  name12: '数据存疑：七分钱有，银联无'
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
    download() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss'>
.financial-unionpay-tab3 {
  .el-input__inner {
    width: 220px;
  }
}
</style>