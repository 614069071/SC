<template>
  <!-- 聚合支付 => 订单异常列表 -->
  <div class="aggregate-exception-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="订单类型" prop="orderType">
            <el-select v-model="examine.orderType" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="全付订单" value="1"></el-option>
              <el-option label="退款订单" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="11">
              <el-form-item prop="createTimeB">
                <el-date-picker v-model="examine.createTimeB" type="date" value-format="yyyy-MM-dd" placeholder="请选择" />
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="createTimeE">
                <el-date-picker v-model="examine.createTimeE" type="date" value-format="yyyy-MM-dd" placeholder="请选择" />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="dataTable" border>
          <el-table-column prop='orderId' min-width="140" label='订单号'></el-table-column>
          <el-table-column prop='mchName' min-width="100" label='商户名称'></el-table-column>
          <el-table-column prop='mchId' min-width="150" label='商户号'></el-table-column>
          <el-table-column prop='tradeAmt' width="80" label='付款金额'></el-table-column>
          <el-table-column prop='orderType' width="80" label='订单状态'>
            <template slot-scope="scoped">{{mapStatus(scoped.row.orderType,scoped.row.orderState)}}</template>
          </el-table-column>
          <el-table-column prop='orderTimeStamp' min-width="100" label='订单创建时间'></el-table-column>
          <el-table-column prop='coreSn' min-width="100" label='核心流水号'></el-table-column>
          <el-table-column prop='coreSubmitstate' width="100" label='核心返回码'></el-table-column>
          <el-table-column prop='orderCoreReturnMsg' label='核心返回信息'></el-table-column>

          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" @click="performClick(scope.row)">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 处理 -->
    <el-dialog title="订单异常处理" :visible.sync="performDisplay" width="1050px">
      <template v-if="performModelData.orderType === '1'">
        <div class="alert-model-form-header">订单信息</div>
        <el-form :model="performModelData" :disabled="true" :inline="true" class="alert-model-form" label-width="120px">
          <el-form-item prop="refundId" label="退款编号">
            <el-input v-model="performModelData.refundId"></el-input>
          </el-form-item>
          <el-form-item prop="merRefundId" label="商户退款流水号">
            <el-input v-model="performModelData.merRefundId"></el-input>
          </el-form-item>
          <el-form-item prop="merchantCode" label="商户编号">
            <el-input v-model="performModelData.merchantCode"></el-input>
          </el-form-item>
          <el-form-item prop="orderId" label="原订单编号">
            <el-input v-model="performModelData.orderId"></el-input>
          </el-form-item>
          <el-form-item prop="totalAmt" label="原订单金额">
            <el-input v-model="performModelData.totalAmt"></el-input>
          </el-form-item>
          <el-form-item prop="refundAmt" label="退款金额">
            <el-input v-model="performModelData.refundAmt"></el-input>
          </el-form-item>
          <el-form-item prop="channelTransId" label="中信交易号">
            <el-input v-model="performModelData.channelTransId"></el-input>
          </el-form-item>
          <el-form-item prop="channelRefundId" label="中信退款ID">
            <el-input v-model="performModelData.channelRefundId"></el-input>
          </el-form-item>
          <el-form-item prop="refundChannel" label="退款渠道">
            <el-input v-model="performModelData.refundChannel"></el-input>
          </el-form-item>
          <el-form-item prop="refundTime" label="退款时间">
            <el-input v-model="performModelData.refundTime"></el-input>
          </el-form-item>
          <el-form-item prop="refundState" label="退款状态">
            <el-input v-model="performModelData.refundState"></el-input>
          </el-form-item>
        </el-form>
        <div class="alert-model-form-header">核心信息</div>
        <el-form :model="performModelData" :inline="true" :disabled="true" class="alert-model-form" label-width="120px">
          <el-form-item prop="coreSubmitstate" label="核心状态">
            <el-input v-model="performModelData.coreSubmitstate"></el-input>
          </el-form-item>
          <el-form-item prop="tempOrderId" label="核心流水号">
            <el-input v-model="performModelData.tempOrderId"></el-input>
          </el-form-item>
          <el-form-item prop="orderCoreReturnCode" label="核心返回码">
            <el-input v-model="performModelData.orderCoreReturnCode"></el-input>
          </el-form-item>
          <el-form-item prop="orderCoreReturnMsg" label="核心返回信息">
            <el-input v-model="performModelData.orderCoreReturnMsg"></el-input>
          </el-form-item>
          <el-form-item prop="orderCoreReturnTime" label="核心返回时间">
            <el-input v-model="performModelData.orderCoreReturnTime"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <el-form v-else :model="performModelData" :inline="true" :disabled="true" class="alert-model-form" label-width="120px">
        <el-form-item prop="refundId" label="退款编号">
          <el-input v-model="performModelData.refundId"></el-input>
        </el-form-item>
        <el-form-item prop="merRefundId" label="商户退款流水号">
          <el-input v-model="performModelData.merRefundId"></el-input>
        </el-form-item>
        <el-form-item prop="merchantCode" label="商户编号">
          <el-input v-model="performModelData.merchantCode"></el-input>
        </el-form-item>
        <el-form-item prop="orderId" label="原订单编号">
          <el-input v-model="performModelData.orderId"></el-input>
        </el-form-item>
        <el-form-item prop="totalAmt" label="原订单总金额">
          <el-input v-model="performModelData.totalAmt"></el-input>
        </el-form-item>
        <el-form-item prop="refundChannel" label="退款金额">
          <el-input v-model="performModelData.refundChannel"></el-input>
        </el-form-item>
        <el-form-item prop="refundTime" label="退款时间">
          <el-input v-model="performModelData.refundTime"></el-input>
        </el-form-item>
        <el-form-item prop="refundState" label="退款状态">
          <el-input v-model="performModelData.refundState"></el-input>
        </el-form-item>
      </el-form>

      <div class="next-wrap">
        <button @click="goToNext">继续下一步</button>
      </div>

      <el-dialog title="执行确认" class="next-dialog" append-to-body :visible.sync="nextDisplay" width="600px">
        <el-form :model="nextData" disabled label-width="80px">
          <el-form-item label="退款编号">
            <el-input v-model="nextData.refundId"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="nextSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      performDisplay: false, //执行
      performModelData: {},
      nextDisplay: false,
      nextData: {},
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getOrderExcList();
  },

  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getOrderExcList(data, 1);
    },
    getOrderExcList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.agOrderExcList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getOrderExcList(data, v);
    },
    mapStatus(type, status) {
      const data = {
        '1': {
          '01': '等待支付',
          '02': '等待支付',
          '00': '等待支付',
          '09': '等待支付',
          '90': '等待支付',
          '91': '等待支付',
          '99': '等待支付'
        },
        '2': { '0': '退款成功' }
      };
      return data[type][status] || type;
    },
    performModelCancel() {
      this.performDisplay = false;
    },
    performModelSubmit() {
      window.console.log(this.performModelData);
      this.performDisplay = false;
    },
    performClick(row) {
      this.performDisplay = true;
      this.nextData = row;
      fetch.agOrderExcDetail(row).then(res => {
        this.performModelData = res.data || {};
      });
    },
    goToNext() {
      this.nextDisplay = true;
    },
    nextSubmit() {
      fetch.agOrderNext(this.nextData).then(res => {
        console.log(res);
        this.$message(res.msg);
      });
      this.nextDisplay = false;
      this.performDisplay = false;
    }
  }
};
</script>

<style lang='scss'>
.aggregate-exception-page {
  .alert-model-form-header {
    padding-top: 20px;
    font-size: 20px;
    text-align: center;
    border-top: 1px solid #eee;
  }
  .next-wrap {
    text-align: right;
    button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #ccc;
    }
  }
}
</style>