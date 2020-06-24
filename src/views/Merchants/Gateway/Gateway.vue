<template>
  <!-- 商户管理 > 商户网关维护 -->
  <div class="merchants-gateway-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="custName">
            <el-input v-model="examine.custName"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="dataTable" border>
          <el-table-column prop='merchantCode' label='商户编号' min-width="120"></el-table-column>
          <el-table-column prop='custName' label='商家名称' min-width="130"></el-table-column>
          <el-table-column prop='tradeType' label='交易类型' width="80"></el-table-column>
          <el-table-column prop='isSupportCreditCard' label='支持信用卡' width="90"></el-table-column>
          <el-table-column prop='bandIp' label='绑定的商户端IP' width="120"></el-table-column>
          <el-table-column prop='merchantCertFilePath' label='证书路径' min-width="100"></el-table-column>
          <el-table-column prop='comment' label='备注' min-width="100"></el-table-column>
          <el-table-column prop='creater' label='创建人' width="90"></el-table-column>
          <el-table-column prop='createrTime' label='创建时间' width="160"></el-table-column>
          <el-table-column prop='modified' label='修改人' width="90"></el-table-column>
          <el-table-column prop='modifiedTime' label='修改时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row,scope.$index)">
                <cs-btn type="editor" />
              </el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">
                <cs-btn type="delete" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 添加商户配置 -->
    <el-dialog title="添加商户配置" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="custId" label="商户" required>
          <el-col>
            <el-select v-model="addModelData.custId" filterable placeholder="请选择">
              <el-option v-for="(item,index) in allAgentList" :key="index" :label="item.custName" :value="item.custId" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item prop="tradeType" label="交易类型" required>
          <el-input v-model="addModelData.tradeType"></el-input>
        </el-form-item>
        <el-form-item prop="isSupportCreditCard" label="支持信用卡" required>
          <el-select v-model="addModelData.isSupportCreditCard" placeholder="请选择">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="bandIp" label="绑定商户端IP" required>
          <el-input v-model="addModelData.bandIp"></el-input>
        </el-form-item>
        <el-form-item prop="merchantCertFilePath" label="存放路径" required>
          <el-input v-model="addModelData.merchantCertFilePath"></el-input>
        </el-form-item>
        <el-form-item prop="merchantPubKey" label="商户证书公钥" required>
          <el-input type="textarea" v-model="addModelData.merchantPubKey"></el-input>
        </el-form-item>
        <el-form-item prop="comment" label="备注">
          <el-input type="textarea" v-model="addModelData.comment"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改商户配置 -->
    <el-dialog title="修改商户配置" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertEditorModelForm" :model="editorModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="custId" label="商户" required>
          <el-col>
            <el-select v-model="editorModelData.custId" filterable placeholder="请选择">
              <el-option v-for="(item,index) in allAgentList" :key="index" :label="item.custName" :value="item.custId" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item prop="tradeType" label="交易类型" required>
          <el-input v-model="editorModelData.tradeType"></el-input>
        </el-form-item>
        <el-form-item prop="isSupportCreditCard" label="支持信用卡" required>
          <el-select v-model="editorModelData.isSupportCreditCard" placeholder="请选择">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="bandIp" label="绑定商户端IP" required>
          <el-input v-model="editorModelData.bandIp"></el-input>
        </el-form-item>
        <el-form-item prop="merchantCertFilePath" label="存放路径" required>
          <el-input v-model="editorModelData.merchantCertFilePath"></el-input>
        </el-form-item>
        <el-form-item prop="merchantPubKey" label="商户证书公钥" required>
          <el-input type="textarea" v-model="editorModelData.merchantPubKey"></el-input>
        </el-form-item>
        <el-form-item prop="comment" label="备注">
          <el-input type="textarea" v-model="editorModelData.comment"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
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
        merchantCode: '',
        custName: ''
      },
      addDisplay: false,
      addModelData: {
        comment: '',
        merchantPubKey: '',
        custId: '',
        tradeType: '',
        isSupportCreditCard: '',
        bandIp: '',
        merchantCertFilePath: ''
      },
      restaurants: [],
      editorDisplay: false,
      editorModelData: {},
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      allAgentList: []
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getGatewayList();
    this.getComAgentList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getGatewayList(data, 1);
    },
    getGatewayList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcGatewayList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getGatewayList(data, v);
    },
    // 商户列表
    getComAgentList() {
      fetch.comAgentList().then(({ data = [] }) => {
        this.allAgentList = data;
      });
    },
    // 新增
    addClick() {
      this.addDisplay = true;
      const form = this.$refs['alertAddModelForm'];
      form && form.resetFields();
    },
    addModelCancel() {
      this.addDisplay = false;
    },
    addModelSubmit() {
      const form = this.$refs['alertAddModelForm'];
      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.mcGatewayAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getGatewayList();
      });
      this.addModelCancel();
    },
    // 编辑
    editorClick(row, index) {
      const data = Object.assign({}, row);
      this.tableIndex = index;
      this.editorDisplay = true;
      this.editorModelData = data;
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      const form = this.$refs['alertEditorModelForm'];
      this.checkFormSubmit(form, this.updateMenuItem.bind(null, form.model));
    },
    updateMenuItem(data) {
      this.editorDisplay = false;
      fetch.mcGatewayUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.dataTable);
      table[this.tableIndex] = data;
      this.dataTable = table;
    },
    // 删除
    deleteClick(row) {
      const { custId } = row;

      this.$confirm('您确定要删除该商户网关维护吗？')
        .then(() => {
          fetch.mcGatewayDelete({ custId }).then(({ msg }) => {
            this.currentPage = 1;
            this.getGatewayList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'></style>