<template>
  <!-- 聚合支付 => 商户交易管理 => 商户退款 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="140px" :inline="true" ref="controlQueryForm">
          <el-form-item label="原订单号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="商户号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="退款状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="退款成功" value="0"></el-option>
              <el-option label="退款申请" value="1"></el-option>
              <el-option label="退款失败" value="2"></el-option>
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
        <el-table :data="tableData" border class="nofix">
          <el-table-column prop='name1' label='退款编号' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='原订单号' min-width="80"></el-table-column>
          <el-table-column prop='name3' label='商户号' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='原订单总金额' width="110"></el-table-column>
          <el-table-column prop='name5' label='退款金额' width="80"></el-table-column>
          <el-table-column prop='name6' label='退款渠道' width="90"></el-table-column>
          <el-table-column prop='name7' label='退款时间' width="150"></el-table-column>
          <el-table-column prop='name8' label='退款状态' width="90"></el-table-column>
          <el-table-column prop='name9' label='退款人编号' min-width="80"></el-table-column>
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
  name1: 'RF20191104214002528vvXnRLtdQq',
  name2: 'QR20191028111805229qBGmZvmjAG',
  name3: '1ff0a8a9febb4b2fb6589a7beaf1a883',
  name4: '0.01',
  name5: '0.01',
  name6: 'weixin',
  name7: '2019-11-05 11:40:06',
  name8: '退款成功',
  name9: '1ff0a8a9febb4b2fb6589a7beaf1a883'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      tableData: new Array(5).fill(testData),
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
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    download() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss'></style>