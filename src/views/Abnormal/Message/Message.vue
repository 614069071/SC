<template>
  <!-- 异常列表 => 异常信息列表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="120px" :inline="true" ref="controlQueryForm1" class="message-form">
          <el-form-item label="订单编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="当前状态" prop="name2">
            <el-select v-model="examine.name2" placeholder="请选择">
              <el-option label="创建" value="1"></el-option>
              <el-option label="处理中" value="0"></el-option>
              <el-option label="已解决" value="2"></el-option>
              <el-option label="暂挂" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="name3">
            <el-date-picker v-model="examine.name3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :model="examine" label-width="120px" :inline="true" ref="controlQueryForm2">
          <el-form-item label="模块" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="七分钱前端客户端" value="1"></el-option>
              <el-option label="七分钱核心系统" value="2"></el-option>
              <el-option label="七分钱后台系统" value="3"></el-option>
              <el-option label="网关系统" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务类型" prop="name5">
            <el-select v-model="examine.name5" placeholder="请选择">
              <el-option value="REGISTER" label='注册'></el-option>
              <el-option value="RECHARGE" label='充值'></el-option>
              <el-option value="PAYMENT" label='支付'></el-option>
              <el-option value="PAYMENT_REVOKE" label='支付撤销'></el-option>
              <el-option value="PAYMENT_REFUND" label='支付退款'></el-option>
              <el-option value="WITHDRAW" label='提现'></el-option>
              <el-option value="SETTLE" label='结算'></el-option>
              <el-option value="WITHDRAW_APPLY" label='提现申请'></el-option>
              <el-option value="WITHDRAW_REVOKE" label='提现申请撤销'></el-option>
              <el-option value="SETTLE_APPLY" label='结算申请'></el-option>
              <el-option value="SETTLE_REVOKE" label='结算申请撤销'></el-option>
              <el-option value="REFUND" label='退款'></el-option>
              <el-option value="RECHARGE_REVOKE" label='充值撤销'></el-option>
              <el-option value="RECHARGE_REFUND" label='充值退款'></el-option>
              <el-option value="RECEIVE" label='收款'></el-option>
              <el-option value="RECEIVE_REVOKE" label='收款撤销'></el-option>
              <el-option value="RECEIVE_REFUND" label='收款退款'></el-option>
              <el-option value="TRANSFER" label='转账'></el-option>
              <el-option value="FREEZE" label='冻结'></el-option>
              <el-option value="UNFREEZE" label='解冻'></el-option>
              <el-option value="ADJUST" label='调账'></el-option>
              <el-option value="OTHER" label='其他业务'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最后创建时间" prop="name6">
            <el-date-picker v-model="examine.name6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="restFormFiles">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='订单编号' min-width="170"></el-table-column>
          <el-table-column prop='name2' label='异常类型' min-width="80"></el-table-column>
          <el-table-column prop='name3' label='级别' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='模块' min-width="120"></el-table-column>
          <el-table-column prop='name5' label='业务类型' min-width="80"></el-table-column>
          <el-table-column prop='name6' label='异常码' min-width="150"></el-table-column>
          <el-table-column prop='name7' label='当前状态' min-width="60"></el-table-column>
          <el-table-column prop='name8' label='创建时间' min-width="120"></el-table-column>
          <el-table-column prop='name9' label='最后更新时间' min-width="120"></el-table-column>
          <el-table-column prop='name10' label='备注' min-width="120"></el-table-column>

          <el-table-column fixed="right" label="异常信息描述" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看内容</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 异常信息描述 -->
    <el-dialog title="异常信息描述" :visible.sync="lookDisplay" width="600px">
      <div class="dialog-look-content">
        报文头信息入库异常
        ### Error updating database. Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException:
        Duplicate entry 'COMBINED-QR20191029151536152cxpoecGUCS' for key
        'trans_record_index_req'
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: 'COREMSGID0152019112720201360800001020',
  name2: '系统',
  name3: '紧急',
  name4: '七分钱核心系统',
  name5: '其它业务',
  name6: 'LOG_HEAD_DB_EXCEPTION',
  name7: '创建',
  name8: '2019-12-02 21:52:22',
  name9: '2019-12-02 21:52:22',
  name10: 'ssssssssss'
};

export default {
  name: 'Message',
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
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
    restFormFiles() {
      this.$refs['controlQueryForm1'].resetFields();
      this.$refs['controlQueryForm2'].resetFields();
    },
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    lookModelSubmit() {
      this.lookDisplay = false;
    },
    lookModelCancel(row) {
      this.lookDisplay = false;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss'>
.message-form {
  .el-input {
    input {
      width: 193px;
    }
  }
}
</style>