<template>
  <!-- 系统管理 => 短信邮件日志 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="收件时间" prop="name1">
            <el-date-picker v-model="examine.name1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="日志类型" prop="name2">
            <el-select v-model="examine.name2" placeholder="请选择">
              <el-option label="短信" value="1"></el-option>
              <el-option label="邮件" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>

          <el-form-item label="业务类型" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option value="REGISTER_VERIFY" label='注册验证'></el-option>
              <el-option value="FIND_LOGIN_PWD_VERIFY" label='登陆密码找回验证'></el-option>
              <el-option value="EDIT_MOBILE_VERIFY" label='更换手机验证'></el-option>
              <el-option value="FIND_TRADE_PWD_VERFIY" label='支付密码找回验证'></el-option>
              <el-option value="ADD_QUESTION_VERFIY" label='添加安全问题验证'></el-option>
              <el-option value="EDIT_LOGIN_PWD_VERIFY" label='修改登陆密码验证'></el-option>
              <el-option value="EDIT_TRADE_PWD_VERIFY" label='修改支付密码验证'></el-option>
              <el-option value="WITHDRAW_VERFIY" label='提现验证'></el-option>
              <el-option value="CHANNEL_ALARM" label='渠道阀值预警'></el-option>
              <el-option value="MANUAL_HANDLING" label='人工处理'></el-option>
              <el-option value="RESET_TRADE_PWD" label='重置支付密码'></el-option>
              <el-option value="MOBILE_LOGIN_CHECK" label='手机快捷登录'></el-option>
              <el-option value="BUY_FILM" label='购买电影票'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='编号' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='标题' min-width="250"></el-table-column>
          <el-table-column prop='name3' label='类型' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='收件人' min-width="160"></el-table-column>
          <el-table-column prop='name5' label='发送时间' min-width="200"></el-table-column>
          <el-table-column prop='name6' label='发送状态' min-width="90"></el-table-column>
          <el-table-column prop='name7' label='日志编号' min-width="250"></el-table-column>
          <el-table-column prop='name8' label='业务类型' min-width="100"></el-table-column>
          <el-table-column prop='name9' label='发送主机' min-width="120"></el-table-column>

          <el-table-column fixed="right" label="日志内容" width="90">
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

    <!-- 日志内容 -->
    <el-dialog title="日志内容" :visible.sync="lookDisplay" width="600px">
      <div class="dialog-look-content">
        客户手机号码：13590385556 <br />
        客户建议留言：123456电风扇
      </div>
    </el-dialog>
  </div>

</template>

<script>
const testData = {
  name1: '7580',
  name2: '【七分钱支付】商户审核已通过',
  name3: '短信',
  name4: '13268253637',
  name5: '2019-12-02 21:52:22',
  name6: 'ERROR',
  name7: '0151912022152222990150',
  name8: '注册验证',
  name9: 'ssssssssss'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
      lookModelData: {},
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
    lookModelCancel() {
      this.lookDisplay = false;
    },

    lookModelSubmit(c) {
      window.console.log(this.lookModelData);
      c();
    },
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    }
  }
};
</script>

<style lang='scss' scoped></style>