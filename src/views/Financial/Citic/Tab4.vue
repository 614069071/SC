<template>
  <!-- 财务管理 => 交广科技对账结果 => 差错报表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="160px" :inline="true" ref="controlQueryForm">
          <el-form-item label="清算编号" prop="name1">
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
          <el-table-column prop="name2" label="聚合会计日期" width="110"></el-table-column>
          <el-table-column prop="name3" label="渠道编号" width="80"></el-table-column>
          <el-table-column prop="name4" label="清算編号" min-width="150"></el-table-column>
          <el-table-column prop="name5" label="差错信息" min-width="200"></el-table-column>
          <el-table-column prop="name6" label="异常处理状态" width="100"></el-table-column>
          <el-table-column prop="name7" label="异常处理备注" min-width="100"></el-table-column>
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
  name1: '2017-07-22	',
  name2: '20170721',
  name3: '1',
  name4: '102510065801201707213290321386',
  name5: '数据差错:,,外部栏位:交易状态|商城栏位:订单状态不一致',
  name6: 'INIT',
  name7: ''
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