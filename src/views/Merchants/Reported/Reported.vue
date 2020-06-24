<template>
  <!-- 商户管理>商户报备列表 -->
  <div class="merchants-reported-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="custName">
            <el-input v-model="examine.custName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="邮箱账号" prop="email">
            <el-input v-model="examine.email" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="examine.mobile" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>

          <el-form-item label="报备渠道" prop="channelNo">
            <el-select v-model="examine.channelNo" placeholder="请选择">
              <el-option label="随行付" value="8"></el-option>
              <el-option label="平安付" value="10"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="报备状态" prop="detailStatus">
            <el-select v-model="examine.detailStatus" placeholder="请选择">
              <el-option label="报备成功" value="10"></el-option>
              <el-option label="报备失败" value="99"></el-option>
              <el-option label="提交审核中" value="0"></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="报备时间">
            <el-col :span="11">
              <el-form-item prop="startModifyTime">
                <el-date-picker v-model="examine.startModifyTime" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" />
              </el-form-item>
            </el-col>
            <el-col :span="1" class="center">至</el-col>
            <el-col :span="11">
              <el-form-item prop="endModifyTime">
                <el-date-picker v-model="examine.endModifyTime" type="date" value-format="yyyy-MM-dd" placeholder="终止日期" />
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
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='商户名称' min-width="100"></el-table-column>
          <el-table-column prop='name2' label='商户简称' min-width="80"></el-table-column>
          <el-table-column prop='name3' label='商户编号' min-width="110"></el-table-column>
          <el-table-column prop='name4' label='邮箱账号' width="80"></el-table-column>
          <el-table-column prop='name5' label='报备渠道' width="80"></el-table-column>
          <el-table-column prop='name6' label='渠道商户号' width="100"></el-table-column>
          <el-table-column prop='reportStatus' label='商户报备状态' width="100"></el-table-column>
          <el-table-column prop='resultMsg' label='返回信息' width="100"></el-table-column>
          <el-table-column prop='name9' label='报备时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope" size="small">
              <el-button type="text" @click="lookClick(scope.row)">
                <cs-btn type="look" title="查看资料"></cs-btn>
              </el-button>
              <el-button type="text" size="small" @click="authClick(scope.row)">
                <cs-btn type="take" title="子商户授权"></cs-btn>
              </el-button>
              <el-button type="text" size="medium" icon="el-icon-s-check" title="实名认证" :style="{fontSize:'16px'}" @click="certClick(scope.row)"></el-button>
              <el-button type="text" size="medium" icon="el-icon-refresh-left" title="申请撤销" :style="{fontSize:'16px',color:'#f3d19e'}" @click="undoClick(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 商户报备详细 -->
    <el-dialog title="商户报备详细" :visible.sync="lookDisplay" class="alert-model-wrap" width="1000px">
      <h3>商户信息</h3>
      <el-form :model="lookModelData" :disabled="true" class="alert-model-form" :inline="true" label-width="140px" :show-message="false">
        <el-form-item prop="name4" label="商户编号">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="商户简称">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="商户名称">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
      </el-form>

      <h3>基本信息</h3>
      <el-form :model="lookModelData" :disabled="true" class="alert-model-form" :inline="true" label-width="140px" :show-message="false">
        <el-form-item prop="name4" label="商户类型">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="注册地址">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="营业执照编号">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="name5" label="营业执照编号">
          <div class="preview-img"></div>
        </el-form-item>
      </el-form>

      <h3>法人信息</h3>
      <el-form :model="lookModelData" :disabled="true" class="alert-model-form" :inline="true" label-width="140px" :show-message="false">
        <el-form-item prop="name4" label="法人真实姓名">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="法人身份证号码">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="联系人姓名">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="联系人手机号">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="联系人邮箱">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <br />
        <el-form-item prop="name5" label="法人身份证正面">
          <div class="preview-img"></div>
        </el-form-item>
        <el-form-item prop="name5" label="法人身份证背面">
          <div class="preview-img"></div>
        </el-form-item>
      </el-form>

      <h3>结算信息</h3>
      <el-form :model="lookModelData" :disabled="true" class="alert-model-form" :inline="true" label-width="140px" :show-message="false">
        <el-form-item prop="name4" label="结算账户名称">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="银行卡号">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="结算类型">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="结算费率">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="银行卡正面">
          <div class="preview-img"></div>
        </el-form-item>
        <el-form-item prop="name5" label="银行卡反面">
          <div class="preview-img"></div>
        </el-form-item>
        <el-form-item prop="name5" label="手持身份证正面">
          <div class="preview-img"></div>
        </el-form-item>
        <el-form-item prop="name5" label="微信联系人信息确认二维码">
          <div class="preview-img"></div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {
        merchantCode: null,
        custName: null,
        mobile: null,
        channelNo: null,
        detailStatus: null,
        startModifyTime: null,
        endModifyTime: null
      },
      lookDisplay: false,
      lookModelData: {},
      tableData: [],
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
    this.getReportedList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getReportedList(data, 1);
    },
    getReportedList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcReportedList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getReportedList(data, v);
    },
    // 查看资料
    lookClick(row) {
      this.lookDisplay = true;
      // this.lookModelData = row;
      fetch.mcReportedDetail(row).then(res => {
        window.console.log(res);
      });
    },
    // 子商户授权
    authClick() {},
    // 实名认证
    certClick() {},
    // 申请撤销
    undoClick() {}
  }
};
</script>

<style lang='scss'>
.merchants-reported-page {
  .preview-img {
    width: 120px;
    height: 100px;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #efefef;
  }

  .alert-model-wrap {
    h3 {
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      background-color: #eee;
    }
    .el-form-item {
      margin: 4px 0;
      width: 45%;
    }
  }
}
</style>