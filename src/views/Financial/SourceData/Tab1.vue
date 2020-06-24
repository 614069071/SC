<template>
  <!-- 财务管理 => 交广科技对账结果 => 结果统计报表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="120px" :inline="true" ref="controlQueryForm">
          <el-form-item label="七分钱流水号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="七分钱会计日期" prop="name1">
            <el-date-picker v-model="examine.name1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="业务类型" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <!-- <el-option label="有效" value="1"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns" v-if="false">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner" v-if="false">
        <el-table :data="tableData" border>
          <el-table-column v-for="(item,index) in tabForData" :key="index" :prop='`name${index}`' :label='item'></el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination" v-if="false">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>
  </div>
</template>

<script>
const testData = {
  name0: '2018-02-18',
  name1: '20180217',
  name2: '交广科技',
  name3: '成功',
  name4: '转账',
  name5: '交广科技',
  name6: '1',
  name7: '0.05',
  name8: '1',
  name9: '0.05',
  name10: '0',
  name11: '0.00',
  name12: '0',
  name13: '0.00',
  name14: '0',
  name15: '0.00',
  name16: '有效'
};

const tabForData = [
  '对账日期',
  '会计日期',
  '渠道',
  '交易结果',
  '业务类型',
  '数据平台',
  '总笔数',
  '总金额',
  '一致笔数',
  '一致总额',
  '存疑笔数',
  '存疑总额',
  '差错笔数',
  '差错总额',
  '自身存疑笔数',
  '自身存疑总额',
  '状态'
];

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      tabForData: tabForData,
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