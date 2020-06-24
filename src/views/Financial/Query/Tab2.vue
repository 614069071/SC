<template>
  <!-- 财务管理 => 财务查询 => 余额变动 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="对账日期" prop="name2">
            <el-date-picker v-model="examine.name1" type="date" placeholder="选择日期"></el-date-picker>
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
          <el-table-column prop='name1' label='会计科目' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='期初余额' min-width="80"></el-table-column>
          <el-table-column prop='name3' label='借' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='贷' min-width="80"></el-table-column>
          <el-table-column prop='name5' label='期末余额' min-width="80"></el-table-column>
          <el-table-column prop='name6' label='日期' min-width="80"></el-table-column>
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
  name1: '1001',
  name2: '资产类',
  name3: '0.00',
  name: '20150807'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      tableData: [] || new Array(10).fill(testData),
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

<style lang='scss' scoped></style>