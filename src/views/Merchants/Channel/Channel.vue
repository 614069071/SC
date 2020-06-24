<template>
  <!-- 商户管理 > 商户渠道列表 -->
  <div class="merchants-channel-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode" @keyup.enter="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="custName">
            <el-input v-model="examine.custName" @keyup.enter="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="商户渠道编号" prop="merchantChannelId">
            <el-input v-model="examine.merchantChannelId" @keyup.enter="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="通道名" prop="channelName">
            <el-select v-model="examine.channelName" placeholder="请选择">
              <el-option v-for="(value,key) in channelnameData" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="dataTable" border class="tableInner-content" @expand-change="openColumnItem">
          <!-- 商户名 商户号 通道名称 商户通道编号 商户通道KEY 状态 注释 创建时间 修改时间 -->
          <el-table-column prop='custName' label='商户名' min-width="100"></el-table-column>
          <el-table-column prop='merchantCode' label='商户号' min-width="100"></el-table-column>
          <el-table-column prop='channelName' label='通道名称' min-width="90">
            <!-- <template slot-scope="scoped">{{channelnameData[scoped.row.channelName] || scoped.row.channelName}}</template> -->
            <template slot-scope="scoped">{{scoped.row.channelName.text}}</template>
          </el-table-column>
          <el-table-column prop='merchantChannelId' label='商户通道编号' min-width="100"></el-table-column>
          <el-table-column prop='merchantChannelKey' label='商户通道KEY' min-width="100"></el-table-column>
          <el-table-column prop='status' label='状态' width="50">
            <template slot-scope="scoped">{{scoped.row.status | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='comment' label='注释' min-width="60"></el-table-column>
          <el-table-column prop='createTime' label='创建时间' min-width="100"></el-table-column>
          <el-table-column prop='modifyTime' label='修改时间' min-width="100"></el-table-column>
          <!-- 详情 -->
          <el-table-column type="expand" label="查看" width="50">
            <template slot-scope="scoped">
              <!-- 支付类型 支付产品 微信AppID 微信Appsecret 状态 注释 -->
              <el-table :data="scoped.row.details" border class="table-inner-expand">
                <el-table-column prop='channelCode' label='支付类型' width="80">
                  <!-- <template slot-scope="scoped">{{scoped.row.channelCode | dealFields}}</template> -->
                </el-table-column>
                <el-table-column prop='subCode' label='支付产品' min-width="80"></el-table-column>
                <el-table-column prop='wxAppId' label='微信AppID' min-width="100"></el-table-column>
                <el-table-column prop='wxAppsecret' label='微信Appsecret' min-width="110"></el-table-column>
                <el-table-column prop='wxChildNo' label='微信子商户号' width="100"></el-table-column>
                <el-table-column prop='zfbChildNo' label='支付宝子商户号' min-width="100"></el-table-column>
                <el-table-column prop='status' label='状态' width="80">
                  <template slot-scope="scoped">{{scoped.row.status | dealFields}}</template>
                </el-table-column>
                <el-table-column prop='comment' label='注释' min-width="100"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 'PENDING'">
                <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
                <el-button type="text" style="color:#69aa46;" size="small" @click="activateClick(scope.row)">激活</el-button>
              </template>
              <el-button v-else type="text" style="color:#DD5A43;" size="small" @click="deactivateClick(scope.row)">下线</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 添加(编辑)商户渠道 -->
    <el-dialog :title="changeTitle" :visible.sync="changeDisplay" width="1200px" class="add-dialog-channel-form">
      <div class="alert-model-form-item-control">
        <el-form ref="alertAddModelForm" :inline="true" :model="changeModelData" class="alert-model-form" :show-message="false">
          <el-form-item prop="merchantCode" label="商户编号(七分钱)" required>
            <el-input v-model="changeModelData.merchantCode"></el-input>
          </el-form-item>
          <el-form-item prop="channelName" label="渠道" required>
            <el-select v-model="changeModelData.channelName" placeholder="请选择">
              <el-option v-for="(value,key) in channelnameData" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="merchantChannelId" label="商户编号(渠道)" required>
            <el-input v-model="changeModelData.merchantChannelId"></el-input>
          </el-form-item>
          <!-- 验证时排除几个通道 华兴（GHXB）和翼支付（BAST_PAY）没有key -->
          <el-form-item prop="merchantChannelKey" label="商户KEY(渠道)" :required="isRequired">
            <el-input v-model="changeModelData.merchantChannelKey"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="info" round @click="addOption">增加选项</el-button>
      </div>

      <!-- 增加选项 -->
      <div class="alert-model-form-item-ops" v-for="(item,index) in changeModelData.details" :key="index">
        <el-form :inline="true" :model="item" class="alert-model-form" label-width="130px" :show-message="false">
          <el-form-item prop="channelCode" label="通道" required>
            <el-select v-model="item.channelCode" placeholder="请选择">
              <el-option label="微信" value="WEIXIN"></el-option>
              <el-option label="翼支付" value="BESTPAY"></el-option>
              <el-option label="支付宝" value="ALIPAY"></el-option>
              <el-option label="云闪付" value="UNIONPAY"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="subCode" label="产品">
            <el-select v-model="item.subCode" placeholder="请选择">
              <el-option label="扫码" value="SM"></el-option>
              <el-option label="刷卡" value="SK"></el-option>
              <el-option label="公共号（线下）" value="GZH"></el-option>
              <el-option label="公共号（线上）" value="OL_PUB"></el-option>
              <el-option label="H5" value="H5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="wxAppId" label="AppId">
            <el-input v-model="item.wxAppId"></el-input>
          </el-form-item>
          <el-form-item prop="wxAppsecret" label="AppSecret">
            <el-input v-model="item.wxAppsecret"></el-input>
          </el-form-item>
          <el-form-item prop="zfbChildNo" label="支付宝子商户号">
            <el-input v-model="item.zfbChildNo"></el-input>
          </el-form-item>
          <el-form-item prop="wxChildNo" label="微信子商户号">
            <el-input v-model="item.wxChildNo"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="text" class="el-icon-circle-close" @click="removeOption(index)"></el-button>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeModelSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';
import cloneDeep from 'lodash/cloneDeep';

// 新增及修改接口异常，待修改
export default {
  name: 'Service',
  props: ['searchText'],
  data() {
    return {
      examine: {
        merchantCode: null,
        custName: null,
        merchantChannelId: null,
        channelName: null
      },
      changeDisplay: false,
      changeModelData: {
        merchantCode: '',
        channelName: '',
        merchantChannelId: '',
        merchantChannelKey: '',
        details: [
          {
            channelCode: '',
            subCode: '',
            wxAppId: '',
            wxAppsecret: '',
            zfbChildNo: '',
            wxChildNo: ''
          }
        ]
      },
      changeTitle: '添加商户渠道',
      cloneDeepData: {},
      isAdd: false,
      restaurants: [],
      deleteDisplay: false,
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      channelnameData: {}
    };
  },
  watch: {
    searchText(v) {
      window.console.log(v);
    }
  },
  computed: {
    isRequired() {
      const isOther = this.changeModelData.channelName;
      return isOther !== 'GHXB' && isOther !== 'BEST_PAY';
    }
  },
  created() {
    this.getChannelList();
    this.getComChannelnameList();
  },
  methods: {
    openColumnItem(v1, v2) {
      if (!v2.length) return;
      console.log(v1, v2, 123);
    },
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getChannelList(data, 1);
    },
    getChannelList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcChannelList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getChannelList(data, v);
    },
    // 商户渠道详情列表
    getMcChannelDetailList(data = {}, params = {}) {
      fetch.mcChannelDetail(data, params).then(res => {
        console.log(res);
      });
    },
    // 通道名列表
    getComChannelnameList() {
      fetch.comChannelnameList().then(({ data = {} }) => {
        this.channelnameData = data;
      });
    },
    // 新增
    addClick() {
      this.changeDisplay = true;
      this.isAdd = true;
      const form = this.$refs['alertAddModelForm'];
      this.changeTitle = '添加商户渠道';
      form && form.resetFields();
    },
    changeModelCancel() {
      this.changeDisplay = false;
    },
    changeModelSubmit() {
      const form = this.$refs['alertAddModelForm'];
      const data = {
        channelBean: form.model,
        oldChannelBean: this.isAdd ? null : this.cloneDeepData
      };
      const isOtherListNull = form.model.details.every(e => !e.channelCode);

      if (!form.model.details.length) {
        this.$message('请添加子商户');
        return;
      }

      if (isOtherListNull) {
        this.$message('请选择通道');
        return;
      }

      console.log(data);
      this.checkFormSubmit(form, this.changeFormSubmit.bind(null, data));
    },
    changeFormSubmit(data) {
      if (this.isAdd) {
        fetch.mcChannelAdd(data).then(({ msg }) => {
          this.$message(msg);
          this.getChannelList();
        });
      } else {
        fetch.mcChannelUpdate(data).then(({ msg }) => {
          this.$message(msg);
          this.getChannelList();
        });
      }
      this.changeModelCancel();
    },
    addOption() {
      const item = {
        channelCode: '',
        subCode: '',
        wxAppId: '',
        wxAppsecret: '',
        zfbChildNo: '',
        wxChildNo: ''
      };
      this.changeModelData.details.push(item);
    },
    removeOption(index) {
      this.changeModelData.details.splice(index, 1);
    },
    editorClick(row) {
      this.changeDisplay = true;
      this.isAdd = false;
      this.changeTitle = '编辑商户渠道';
      this.cloneDeepData = cloneDeep(row);
      this.changeModelData = row;
    },
    // 下线
    deactivateClick(row) {
      this.$confirm('您确定要下线该商户的商户信息吗？', '商户渠道下线')
        .then(() => {
          fetch.mcChannelDeactivate(row).then(({ msg }) => {
            this.currentPage = 1;
            this.getChannelList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    },
    activateClick(row) {
      this.$confirm('您确定要激活该商户的商户信息吗？', '商户渠道激活')
        .then(() => {
          fetch.mcChannelActivate(row).then(({ msg }) => {
            this.currentPage = 1;
            this.getChannelList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'>
.merchants-channel-page {
  .el-table__expand-column {
    color: #69aa46;
  }
  .el-table__expanded-cell {
    padding: 5px !important;
  }
  .el-table__row {
    height: 33px;
  }

  .alert-model-form {
    .el-form-item {
      width: 25%;
      margin: 0;
    }
    .el-input__inner {
      width: 130px;
    }
  }

  .alert-model-form-item-control {
    background-color: #fefefe;
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
  }

  .alert-model-form-item-ops {
    .el-form-item {
      width: 33.33%;
    }
    .el-button {
      font-size: 28px;
      padding: 0;
    }
    .el-input__inner {
      width: 200px;
    }
    display: flex;
    justify-content: space-between;
    border: 1px dashed #ccc;
    box-sizing: border-box;
    padding: 10px 10px 0 10px;
    background-color: #fefefe;
    margin-top: 10px;
  }

  .add-dialog-channel-form {
    .dialog-footer {
      text-align: center;
    }
  }

  .table-inner-expand {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
}
</style>
