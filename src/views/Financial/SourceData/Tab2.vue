<template>
  <!-- 财务管理 => 交广科技对账结果 => 交广科技存疑报表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="银联查询流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="商户订单号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="支付卡类型" prop="name3">
            <el-select v-model="examine.name3">
              <el-option value="01" label="(01)借记账户"></el-option>
              <el-option value="02" label="(02)贷记账户"></el-option>
              <el-option value="03" label="(03)准贷记账户"></el-option>
              <el-option value="04" label="(04)借贷合一账户"></el-option>
              <el-option value="05" label="(05)预付费账户"></el-option>
              <el-option value="06" label="(06)半开放预付费账户"></el-option>
              <el-option value="00" label="(00)未知"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">

          <el-form-item label="七分钱-交广清算流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="会计日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否七分钱平台" prop="name1">
            <el-select v-model="examine.name3">
              <el-option value="01" label="是"></el-option>
              <el-option value="02" label="否"></el-option>
            </el-select>
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
          <el-table-column prop="name1" label="银联查询流水号" min-width="130"></el-table-column>
          <el-table-column prop="name2" label="商户订单号" min-width="160"></el-table-column>
          <el-table-column prop="name3" label="七分钱-交广清算流水号" min-width="180"></el-table-column>
          <el-table-column prop="name4" label="系统跟踪号" width="100"></el-table-column>
          <el-table-column prop="name5" label="帐号" min-width="100"></el-table-column>
          <el-table-column prop="name6" label="支付卡类型" min-width="90"></el-table-column>
          <el-table-column prop="name7" label="交易金额" min-width="100"></el-table-column>
          <el-table-column prop="name8" label="交易代码" min-width="100"></el-table-column>
          <el-table-column prop="name9" label="会计日期" min-width="100"></el-table-column>
          <el-table-column prop="name10" label="写入时间" min-width="120"></el-table-column>
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
  name1: '201708202310304072508',
  name2: 'a2e7bcdda03d45c6b2a612d9a082eb9a',
  name3: 'TBRECHARGE0012017082023110365200129166',
  name4: '407250',
  name5: '621499******2288',
  name6: '借记账户',
  name7: '99.80',
  name8: 'S56',
  name9: '20170821',
  name10: '2017-08-22 10:05:00'
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