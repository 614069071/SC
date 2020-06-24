<template>
  <!-- 聚合支付 => 订单信息 => 退款列表 -->
  <div class="aggregate-order-refund-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm">
          <el-form-item label="退款编号" prop="refundId">
            <el-input v-model="examine.refundId"></el-input>
          </el-form-item>
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode"></el-input>
          </el-form-item>
          <el-form-item label="退款发起时间">
            <el-col :span="11">
              <el-form-item prop="createTimeB">
                <el-date-picker v-model="examine.createTimeB" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" />
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="createTimeE">
                <el-date-picker v-model="examine.createTimeE" type="date" value-format="yyyy-MM-dd" placeholder="终止日期" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="退款状态" prop="refundState">
            <el-select v-model="examine.refundState" placeholder="请选择">
              <el-option label="申请退款" value="1"></el-option>
              <el-option label="退款成功" value="0"></el-option>
              <el-option label="退款失败" value="9"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原订单渠道" prop="channel">
            <el-select v-model="examine.channel" placeholder="请选择">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="七分钱" value="sevenpay"></el-option>
              <el-option label="支付宝" value="alipay"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原订单号" prop="orderId">
            <el-input v-model="examine.orderId"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="restFormFiles">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info"><a href="/aggregatepayment/orderinfo/orderRefundExport">导出报表<i class="el-icon-download"></i></a></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="dataTable" border class="nofix">
          <el-table-column prop='refundId' label='退款编号' min-width="140"></el-table-column>
          <el-table-column prop='orderId' label='原订单编号' min-width="140"></el-table-column>
          <el-table-column prop='merchantCode' label='商户编号' min-width="100"></el-table-column>
          <el-table-column prop='totalAmt' label='原订单总金额' min-width="100"></el-table-column>
          <el-table-column prop='refundAmt' label='退款金额' min-width="100"></el-table-column>
          <el-table-column prop='settleAmt' label='手续费' min-width="100"></el-table-column>
          <el-table-column prop='refundTime' label='退款时间' min-width="100"></el-table-column>
          <el-table-column prop='refundState' label='退款状态' width="100">
            <template slot-scope="scoped">{{{'0':'退款成功','1':'申请退款','9':'退款失败'}[scoped.row.refundState]}}</template>
          </el-table-column>
          <el-table-column prop='refundChannel' label='退款渠道' width="100"></el-table-column>
          <el-table-column prop='prodName' label='产品名称' min-width="100"></el-table-column>
          <el-table-column prop='channel' label='原订单渠道' width="100"></el-table-column>
          <el-table-column prop='createTime' label='退款发起时间' min-width="100"></el-table-column>
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
        refundId: '',
        merchantCode: '',
        createTimeB: '',
        createTimeE: '',
        refundState: '',
        channel: '',
        orderId: ''
      },
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1
    };
  },
  watch: {
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getRefundList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getRefundList(data, 1);
    },
    getRefundList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.agRefundList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getRefundList(data, v);
    },
    restFormFiles() {
      this.$refs['controlQueryForm'].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.aggregate-order-refund-page {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }
}
</style>