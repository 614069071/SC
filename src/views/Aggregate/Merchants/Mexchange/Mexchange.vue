<template>
  <!-- 聚合支付 => 商户交易管理 => 交易汇总 -->
  <div class="aggregate-merchants-mexchange-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="140px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户名称" prop="merchantName">
            <el-input v-model="examine.merchantName"></el-input>
          </el-form-item>
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode"></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="tradeType">
            <el-select v-model="examine.tradeType" placeholder="请选择">
              <el-option label="消费" value="consume"></el-option>
              <el-option label="退款" value="refund"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始账期" prop="createTimeB">
            <el-date-picker v-model="examine.createTimeB" type="date" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束账期" prop="createTimeE">
            <el-date-picker v-model="examine.createTimeE" type="date" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info"> <a href="">导出报表<i class="el-icon-download"></i></a></el-button>
      </template>

      <template slot="tableInner">
        <div class="table-caption">交易总笔数为{{tradeTotalSum}},交易总金额{{tradeTotalAmount}}元,总结算金额{{tradeTotalSettlement}}</div>
        <el-table :data="dataTable" border class="nofix">
          <el-table-column prop='createTimeB' label='开始账期' width="100"></el-table-column>
          <el-table-column prop='createTimeE' label='结束账期' width="100"></el-table-column>
          <el-table-column prop='merchantCode' label='商户编号' min-width="180"></el-table-column>
          <el-table-column prop='merchantName' label='商户名称' min-width="180"></el-table-column>
          <el-table-column prop='channel' label='交易渠道' width="80"></el-table-column>
          <el-table-column prop='countTrade' label='交易笔数' width="80"></el-table-column>
          <el-table-column prop='sumTrade' label='交易金额' width="100"></el-table-column>
          <el-table-column prop='tradeType' label='交易类型' width="90"></el-table-column>
          <el-table-column prop='settleAmt' label='商户结算金额' width="100"></el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>
  </div>
</template>

<script>
import fetch from '@/fetch';

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {
        merchantName: '',
        merchantCode: '',
        tradeType: '',
        createTimeB: '',
        createTimeE: ''
      },
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      tradeTotalSum: '0',
      tradeTotalAmount: '0',
      tradeTotalSettlement: '0'
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getTradeList();
    this.getAgMcTradeTotal();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getTradeList(data, 1);
    },
    getTradeList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.agMcTradeList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getTradeList(data, v);
    },
    getAgMcTradeTotal() {
      fetch.agMcTradeTotal(this.examine).then(res => {
        const { count = '0', settle = '0', sum = '0' } = res.data || {};
        this.tradeTotalSum = count;
        this.tradeTotalAmount = sum;
        this.tradeTotalSettlement = settle;
      });
    }
  }
};
</script>

<style lang='scss'>
.aggregate-merchants-mexchange-page {
  .table-caption {
    height: 36px;
    line-height: 36px;
    background-color: rgb(67, 142, 185, 0.8);
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
}
</style>