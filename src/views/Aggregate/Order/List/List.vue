<template>
  <!-- 聚合支付 => 订单信息 => 订单列表 -->
  <div class="aggregate-order-list-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm">
          <el-form-item label="支付产品" prop="payProd">
            <el-select v-model="examine.payProd" placeholder="请选择">
              <el-option v-for="(item,index) in payprodlList" :key="index" :label="item.prodName" :value="item.prodCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付渠道" prop="payChannel">
            <el-select v-model="examine.payChannel" placeholder="请选择">
              <el-option v-for="(item,index) in paychannelList" :key="index" :label="item.payChannelName" :value="item.payChannelCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态" prop="orderState">
            <el-select v-model="examine.orderState" placeholder="请选择">
              <el-option label="等待支付" value="01"></el-option>
              <el-option label="支付处理中" value="02"></el-option>
              <el-option label="支付成功" value="00"></el-option>
              <el-option label="支付失败" value="09"></el-option>
              <!-- <el-option value="90" label="已退款"></el-option>
              <el-option value="91" label="部分非退款"></el-option> -->
              <el-option label="取消" value="99"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道" prop="channel">
            <el-select v-model="examine.channel" placeholder="请选择">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="七分钱" value="sevenpay"></el-option>
              <el-option label="支付宝" value="alipay"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode"></el-input>
          </el-form-item>
          <el-form-item label="订单号" prop="orderId">
            <el-input v-model="examine.orderId"></el-input>
          </el-form-item>
          <el-form-item label="中信订单号" prop="zxOrderId">
            <el-input v-model="examine.zxOrderId"></el-input>
          </el-form-item>
          <el-form-item label="渠道订单号" prop="channelOrderId">
            <el-input v-model="examine.channelOrderId"></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
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
          <el-form-item label="账期时间">
            <el-col :span="11">
              <el-form-item prop="finishTimeB">
                <el-date-picker v-model="examine.finishTimeB" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" />
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="finishTimeE">
                <el-date-picker v-model="examine.finishTimeE" type="date" value-format="yyyy-MM-dd" placeholder="终止日期" />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="restFormFiles">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info"><a href="/aggregatepayment/orderinfo/orderInfoExport">导出报表<i class="el-icon-download"></i></a></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="dataTable" border class="nofix">
          <el-table-column prop='orderId' label='订单号' min-width="140"></el-table-column>
          <el-table-column prop='merchantCode' label='商户编号' min-width="100"></el-table-column>
          <el-table-column prop='mchName' label='商户名称' min-width="100"></el-table-column>
          <el-table-column prop='channel' label='渠道编号' width="50"></el-table-column>
          <el-table-column prop='channelSubName' label='下级渠道' width="50"></el-table-column>
          <el-table-column prop='zxOrderId' label='中信订单号' min-width="150"></el-table-column>
          <el-table-column prop='channelOrderId' label='渠道订单号' min-width="140"></el-table-column>
          <el-table-column prop='orderAmt' label='订单金额' width="100"></el-table-column>
          <el-table-column prop='tradeAmt' label='付款金额' width="100"></el-table-column>
          <el-table-column prop='settleAmt' label='结算金额' width="100"></el-table-column>
          <el-table-column prop='prodDesc' label='商品描述' min-width="100"></el-table-column>
          <el-table-column prop='prodName' label='支付产品' min-width="100"></el-table-column>
          <el-table-column prop='orderState' label='订单状态' width="100">
            <template slot-scope="scoped">{{{'01':'等待支付','02':'支付处理中','00':'支付成功','09':'支付失败','90':'已退款'}[scoped.row.orderState]}}</template>
          </el-table-column>
          <el-table-column prop='payType' label='付款方式' width="80">
            <template slot-scope="spcoed">{{spcoed.row.payType | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='createTime' label='创建时间' min-width="100"></el-table-column>
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
        payProd: '',
        payChannel: '',
        orderState: '',
        channel: '',
        merchantCode: '',
        orderId: '',
        zxOrderId: '',
        channelOrderId: '',
        createTimeB: '',
        createTimeE: '',
        finishTimeB: '',
        finishTimeE: ''
      },
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      paychannelList: [], //支付渠道列表
      payprodlList: [] //支付产品列表
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getOrderList();
    this.getComPaychannelList();
    this.getComPayprodlList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getOrderList(data, 1);
    },
    getOrderList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.agOrderList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getOrderList(data, v);
    },
    restFormFiles() {
      this.$refs['controlQueryForm'].resetFields();
    },
    // 支付渠道列表
    getComPaychannelList() {
      fetch.comPaychannelList().then(({ data = [] }) => {
        this.paychannelList = data;
      });
    },
    // 支付产品列表
    getComPayprodlList() {
      fetch.comPayprodlList().then(({ data = [] }) => {
        this.payprodlList = data;
      });
    }
  }
};
</script>

<style lang='scss'>
.aggregate-order-list-page {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }
}
</style>