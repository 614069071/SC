<template>
  <!-- 财务管理 => 中信对账结果查询 => 结果统计报表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="对账日期" prop="name1">
            <el-date-picker v-model="examine.name1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="会计日期" prop="name2">
            <el-date-picker v-model="examine.name2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
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
          <el-table-column v-for="(item,index) in tabForData" :key="index" :prop='`name${index}`' :label='item'></el-table-column>
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
  name0: '2018-02-18',
  name1: '20180217',
  name2: '中信',
  name3: '支付成功',
  name4: '中信',
  name5: 'pay.alipay.micropayv3',
  name6: '6',
  name7: '337.00',
  name8: '6',
  name9: '337.00',
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
  '数据平台',
  '统计类型',
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