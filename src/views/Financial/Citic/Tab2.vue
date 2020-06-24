<template>
  <!-- 财务管理 => 交广科技对账结果 => 中信存疑报表 -->
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
          <el-table-column prop="name1" label="对账批次号" min-width="120"></el-table-column>
          <el-table-column prop="name2" label="渠道编号" width="80"></el-table-column>
          <el-table-column prop="name3" label="文件编号" min-width="170"></el-table-column>
          <el-table-column prop="name4" label="清算编号" min-width="150"></el-table-column>
          <el-table-column prop="name5" label="对账日期" width="100"></el-table-column>
          <el-table-column prop="name6" label="会计日期" width="100"></el-table-column>
          <el-table-column prop="name7" label="写入日期" width="100"></el-table-column>
          <el-table-column prop="name8" label="差错类型" width="100"></el-table-column>
          <el-table-column prop="name9" label="差错信息" min-width="100"></el-table-column>
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
  name1: 'BAL-CNCB-20170715083000	',
  name2: '1',
  name3: 'BANK_CNCB-BALANCE-20170715081001863	',
  name4: '102510065801201707144179990844',
  name5: '2017-03-29',
  name6: '20170328',
  name7: '2017-07-15',
  name8: 'BAL_DOUBT',
  name9: '数据存疑：外部渠道有，七分钱无'
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