<template>
  <!-- 商户管理 > 商户列表 -->
  <div class="merchants-list-pages">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlExamineQueryForm">
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model.trim="examine.merchantCode" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="custName">
            <el-input v-model.trim="examine.custName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="邮箱账号" prop="email">
            <el-input v-model.trim="examine.email" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <el-input v-model.trim="examine.mobile" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>

          <el-form-item label="录入时间" class="search-create-time">
            <el-form-item prop="startCreateTime">
              <el-date-picker v-model="examine.startCreateTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" />
            </el-form-item>
            <span class="connect">至</span>
            <el-form-item label="" prop="endCreateTime">
              <el-date-picker v-model="examine.endCreateTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择" />
            </el-form-item>
          </el-form-item>

          <el-form-item label="商户状态" prop="state">
            <el-select v-model="examine.state" placeholder="请选择">
              <el-option label="有效" value="00"></el-option>
              <el-option label="待审核" value="01"></el-option>
              <el-option label="注销" value="02"></el-option>
              <el-option label="冻结" value="03"></el-option>
              <el-option label="审核不通过" value="04"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核状态" prop="auditState">
            <el-select v-model="examine.auditState" placeholder="请选择">
              <el-option label="审核通过" value="0"></el-option>
              <el-option label="待审核" value="1"></el-option>
              <el-option label="审核不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i>
        </el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button disabled type="info" @click="batchAuditDataClick">批量审核资料<i class="el-icon-document-checked"></i>
        </el-button>
        <el-button disabled type="info" @click="batchEntryClick">批量录入<i class="el-icon-upload2"></i></el-button>
        <el-button type="info" @click="exportFileClick">导出<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='custName' label='商户名称' min-width="100"></el-table-column>
          <el-table-column prop='shortName' label='商户简称' min-width="80"></el-table-column>
          <el-table-column prop='merchantCode' label='商户编号' min-width="100"></el-table-column>
          <el-table-column prop='mobile' label='账号' min-width="110">
            <template slot-scope="scoped">{{`${scoped.row.mobile ? scoped.row.mobile: ''}${scoped.row.mobile && scoped.row.email ? '/ ' : ''}${scoped.row.email ? scoped.row.email : ''}` }}</template>
          </el-table-column>
          <el-table-column prop='createTime' label='录入时间' width="160"></el-table-column>
          <el-table-column prop='state' label='商户状态' width="80">
            <template slot-scope="scoped">{{scoped.row.state | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='auditState' label='审核状态' width="90">
            <template slot-scope="scoped">{{{'0':'审核通过','1':'待审核','2':'审核不通过'}[scoped.row.auditState] }}</template>
          </el-table-column>
          <el-table-column prop='aduitUserName' label='审核人' width="90"></el-table-column>
          <el-table-column fixed="right" label="操作" width="110">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)"><cs-btn type="look" /></el-button>
              <!-- 待审核 -->
              <template v-if="scope.row.auditState !== '0'">
                <el-button type="text" size="small" @click="editorClick(scope.row)"><cs-btn /></el-button>
                <el-button type="text" size="small" @click="performClick(scope.row)"><cs-btn type="take" title="商户审核" /></el-button>
              </template>
              <el-button v-else type="text" size="small" @click="ReportedClick(scope.row)"><cs-btn type="report" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 报备渠道选择 -->
    <el-dialog title="报备渠道选择" :visible.sync="performDisplay" width="600px">
      <el-col :span="3">报备渠道</el-col>
      <el-col :span="20">
        <el-select v-model="channelNo" placeholder="请选择" @change="checkeChannelNo">
          <el-option v-for="(item,index) in reportSourceData" :key="index" :value="item.channlCode" :label="item.channlName" />
        </el-select>
      </el-col>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="performModelCancel">取 消</el-button>
        <el-button type="primary" @click="performModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 报备资料详情 -->
    <el-dialog :title="performTitle" :visible.sync="performInfoDisplay" width="1200px" class="merchanrts-list-perform-dialog">
      <component :code="merchantCode" :is="reported" :visible.sync="performInfoDisplay" />
    </el-dialog>

    <!-- 更新预览审核 -->
    <el-dialog :title="controlTitle" :visible.sync="controlInfoDisplay" width="1200px" class="merchanrts-list-operation-dialog">
      <Operation @updateList="getMchList" :data="operationData" :visible.sync="controlInfoDisplay" />
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';
import Suixin from './Suixin';
import Pinan from './Pinan';
import Laka from './Laka';
import Operation from './Operation';

// 新增1 + 预览0 + 商户更新2 + 商户审核3

export default {
  name: 'MerchantsList',
  props: ['searchText'],
  components: { Operation, Suixin, Pinan, Laka },
  data() {
    return {
      examine: {
        merchantCode: '',
        custName: '',
        email: '',
        mobile: '',
        state: '',
        auditState: '',
        startCreateTime: '',
        endCreateTime: ''
      },
      performDisplay: false, //执行
      performTitle: '商户报备资料',
      performInfoDisplay: false,
      tableData: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      reportSourceData: [],
      channelNo: '',
      merchantCode: '',
      checkedItem: {},
      controlTitle: '',
      controlInfoDisplay: false,
      operationData: {},
      reported: 'Suixin'
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    const bankList = this.getStorage('bankList') || []; //报备开户银行列表
    const cahnnelTypeList = this.getStorage('cahnnelTypeList') || [];
    const provinces = this.getStorage('provinces') || [];

    this.getMchList();

    if (provinces.length) {
      this.provinces = provinces;
    } else {
      this.getProvinceList();
    }

    if (cahnnelTypeList.length) {
      this.reportSourceData = cahnnelTypeList;
    } else {
      this.getReportData();
    }

    if (!bankList || !bankList.length) {
      this.getBankList();
    }
  },
  beforeDestroy() {
    this.setStorage('bankList', []);
    this.setStorage('cahnnelTypeList', []);
    this.setStorage('provinces', []);
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getMchList(data, 1);
    },
    getMchList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcMchList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getMchList(data, v);
    },
    batchAuditDataClick() {
      window.console.log('批量审核资料');
    },
    batchEntryClick() {
      window.console.log('批量录入');
    },
    exportFileClick() {
      window.console.log('导出');
      this.$message('download');
    },
    // 新增
    addClick() {
      this.controlTitle = '新增商户';
      this.controlInfoDisplay = true;
      const data = { type: 'add' };
      this.operationData = data;
    },
    // 审核
    performClick(row) {
      const data = { custId: row.custId, type: 'perform' };
      this.operationData = data;
      this.controlTitle = '商户审核';
      this.controlInfoDisplay = true;
    },
    // 查看
    lookClick(row) {
      const data = { custId: row.custId, type: 'look' };
      this.operationData = data;
      this.controlTitle = '商户录入预览';
      this.controlInfoDisplay = true;
    },
    // 更新
    editorClick(row) {
      const data = { custId: row.custId, type: 'update' };
      this.operationData = data;
      this.controlTitle = '商户录入更新';
      this.controlInfoDisplay = true;
    },
    // 报备渠道源数据
    getReportData() {
      fetch.comReportChannel().then(({ data }) => {
        this.reportSourceData = data;
        this.setStorage('cahnnelTypeList', data);
      });
    },
    // 注册地址省市区列表
    getProvinceList(data) {
      fetch.comProvinceList(data).then(({ data = [] }) => {
        this.provinces = data || [];
        this.setStorage('provinces', data);
      });
    },
    // 报备
    ReportedClick(row) {
      this.performDisplay = true;
      this.merchantCode = row.merchantCode;
      this.checkedItem = row;
    },
    // 报备
    // 选择渠道
    performModelSubmit() {
      if (!this.channelNo) {
        this.$message('请选择报备渠道!');
        return;
      }

      if (this.channelNo === 'SUIXING_PAY') {
        this.reported = 'Suixin';
      } else if (this.channelNo === 'YQB') {
        this.reported = 'Pinan';
      } else if (this.channelNo === 'LKL') {
        this.reported = 'Laka';
      }

      this.performDisplay = false;
      this.performInfoDisplay = true;
      this.channelNo = '';
    },
    performModelCancel() {
      this.performDisplay = false;
    },
    performInfoModelCancel() {
      this.performInfoDisplay = false;
    },
    checkeChannelNo(v) {
      const item = this.reportSourceData.find(e => e.channlCode === v);
      this.performTitle = item.channlName + '商户报备资料';
    },
    // 开户银行列表
    getBankList() {
      fetch.comBankList().then(({ data = [] }) => {
        this.setStorage('bankList', data);
      });
    }
  }
};
</script>

<style lang='scss'>
.merchants-list-pages {
  h2 {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 10px;
    background-color: #eee;
  }
  .search-create-time .connect {
    // display: inline-block;
    margin: 5px 10px 0 0;
  }

  .merchanrts-list-operation-dialog {
    overflow-y: scroll;
    overflow-x: hidden;

    .btns {
      padding: 20px 0;
      text-align: center;
    }

    .item {
      display: inline-block;
      padding: 4px 10px 0 0;
    }

    .pl {
      padding-left: 10px;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: auto;
    }
  }
}
</style>