<template>
  <!-- 财务管理 > 对账汇总 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="对账日期" prop="name1">
            <el-date-picker placeholder="请选择" v-model="examine.name1" type="date" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="渠道" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option value="CR" label="华润银行"></el-option>
              <el-option value="ECITIC" label="中信银行"></el-option>
              <el-option value="CR_ULOPAY" label="华润-优络"></el-option>
              <el-option value="SPD_QHWR" label="浦发-前海万融"></el-option>
              <el-option value="SEVENPAY" label="七分钱"></el-option>
              <el-option value="PING_AN" label="平安银行"></el-option>
              <el-option value="CNCB_SWIFT" label="中信-威富通"></el-option>
              <el-option value="WX" label="微信支付"></el-option>
              <el-option value="FM_COMBINEDPAY" label="富名银行聚合支付"></el-option>
              <el-option value="HELIPAY" label="合利宝支付"></el-option>
              <el-option value="KFT_PAY" label="快付通支付"></el-option>
              <el-option value="ALIPAY" label="支付宝支付"></el-option>
              <el-option value="GHXB" label="广东华兴银行"></el-option>
              <el-option value="QM_PAY" label="易宝钱麦支付"></el-option>
              <el-option value="KQ_PAY" label="快钱"></el-option>
              <el-option value="TX_PAY" label="腾讯云支付"></el-option>
              <el-option value="XL_PAY" label="讯联支付"></el-option>
              <el-option value="JD_PAY" label="京东渠道"></el-option>
              <el-option value="KZLL" label="空中连连"></el-option>
              <el-option value="BEST_PAY" label="翼支付"></el-option>
              <el-option value="FM_UNIONPAY" label="富民银联支付"></el-option>
              <el-option value="Z_BANK" label="众邦银行"></el-option>
              <el-option value="TFB" label="天下支付"></el-option>
              <el-option value="TYY" label="TYY纯代付"></el-option>
              <el-option value="EPAY" label="双乾代付"></el-option>
              <el-option value="YYT" label="银盈通代付"></el-option>
              <el-option value="SUIXING_PAY" label="随行付"></el-option>
              <el-option value="SUM_PAY" label="商盟聚合支付"></el-option>
              <el-option value="YQB" label="平安付-壹钱包"></el-option>
              <el-option value="ALLINPAY" label="通联支付"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="reconciliation">对账</el-button>
        <div class="reconcilia-tips">掉单：我们有银行没有 丢单：我们没有银行有</div>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='渠道'>
            <!-- 部分需要可点击，实际根据接口数据来
              <template slot-scope="scope">
                <a href="scpoe.row.name1">链接</a>
              </template>
            -->
          </el-table-column>
          <el-table-column prop='name2' label='成功笔数'></el-table-column>
          <el-table-column prop='name3' label='成功总金额'></el-table-column>
          <el-table-column prop='name4' label='掉单笔数'></el-table-column>
          <el-table-column prop='name5' label='掉单金额'></el-table-column>
          <el-table-column prop='name6' label='丢单笔数'></el-table-column>
          <el-table-column prop='name7' label='丢单金额'></el-table-column>
          <el-table-column prop='name8' label='差错成功笔数'></el-table-column>
          <el-table-column prop='name9' label='差错成功金额'></el-table-column>
          <el-table-column prop='name10' label='对账日期'></el-table-column>
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
  name1: '讯联支付',
  name2: '0',
  name3: '0.00',
  name4: '0',
  name5: '0.00',
  name6: '0',
  name7: '0.00',
  name8: '0',
  name9: '0.00',
  name10: '2018-11-12'
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
    //查询
    goToSearch() {
      window.console.log(this.examine, '查询');
    },
    // 对账
    reconciliation() {
      this.$message('对账');
    }
  }
};
</script>

<style lang='scss'>
.reconcilia-tips {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #777;
  text-align: left;
}
</style>