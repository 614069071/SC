<template>
  <!-- 财务管理 => 交广科技对账结果 => 七分钱银联对账源数据表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="七分钱-交广清算编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="会计日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="交易编号" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="银联查询流水号" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option value="0" label="消费"></el-option>
              <el-option value="1" label="充值"></el-option>
              <el-option value="2" label="消费撤销"></el-option>
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
          <el-table-column prop="name1" label="银联交易流水号" min-width="150"></el-table-column>
          <el-table-column prop="name2" label="七分钱-交广清算流水号" min-width="180"></el-table-column>
          <el-table-column prop="name3" label="七分钱交易流水号" min-width="130"></el-table-column>
          <el-table-column prop="name4" label="会计日期" width="100"></el-table-column>
          <el-table-column prop="name5" label="交易类型" width="80"></el-table-column>
          <el-table-column prop="name6" label="账号" min-width="80"></el-table-column>
          <el-table-column prop="name7" label="交易金额" width="80"></el-table-column>
          <el-table-column prop="name8" label="清算金额" width="100"></el-table-column>
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
  name1: '8ffcb382ba7d401f805ec8ac306ac721',
  name2: 'TBRECHARGE0012017120609510121100346824',
  name3: '2017120609502300100000002',
  name4: '20171206',
  name5: '充值',
  name6: '',
  name7: '1.00',
  name8: '1.00',
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