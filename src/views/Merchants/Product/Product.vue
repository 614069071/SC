<template>
  <!-- 商户管理>商户产品管理 -->
  <div class="merchants-product-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户名称" prop="merchantName">
            <el-input v-model="examine.merchantName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>

          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="examine.productName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>

          <el-form-item label="产品开通状态" prop="productStatus">
            <el-select v-model="examine.productStatus" placeholder="请选择">
              <el-option label="开通成功" value="00"></el-option>
              <el-option label="开通失败" value="09"></el-option>
              <el-option label="未开通" value="99"></el-option>
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
        <el-table :data="dataTable" border>
          <el-table-column prop='merchantName' label='商户名称' min-width="100"></el-table-column>
          <el-table-column prop='productName' label='产品名称' width="80"></el-table-column>
          <el-table-column prop='merchantCode' label='商户代码' min-width="90"></el-table-column>
          <el-table-column prop='productRate' label='产品汇率' width="80"></el-table-column>
          <el-table-column prop='productRateStr' label='充值汇率' width="80"></el-table-column>
          <el-table-column prop='productStatus' label='产品开通状态' width="100">
            <template slot-scope="scope">{{{'00':'开通成功','01':'待审核','09':'开通失败','99':'未开通'}[scope.row.productStatus]}}</template>
          </el-table-column>
          <el-table-column prop='realName' label='审核人' width="80"></el-table-column>
          <el-table-column prop='aisle' label='渠道' width="100"></el-table-column>
          <el-table-column prop='createTime' label='创建时间' width="160"></el-table-column>
          <el-table-column prop='modifyTime' label='修改时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <!-- 00 开通成功 09 开通失败 99 未开通 01 待审核 -->
            <template slot-scope="scope">
              <el-button v-if="scope.row.productStatus !== '00'" type="text" size="small" @click="editorClick(scope.row,scope.$index)">
                <cs-btn />
              </el-button>
              <el-button v-if="scope.row.productStatus === '00'" type="text" size="small" @click="deleteClick(scope.row)">
                <cs-btn type="delete" />
              </el-button>
              <el-button v-if="scope.row.productStatus !== '00'" type="text" size="small" @click="performClick(scope.row)">
                <cs-btn type="take" title="审核" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 商户产品新增 -->
    <el-dialog title="商户产品新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="merchantCode" label="商户名称" required>
          <el-select v-model="addModelData.merchantCode" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allAgentList" :key="index" :label="item.custName" :value="item.merchantCode" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productId" label="产品名称" required>
          <el-select v-model="addModelData.productId" placeholder="请选择">
            <el-option v-for="item in allProductList" :key="item.productId" :value="item.productId" :label="item.productName" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productRate" label="产品费率">
          <el-input v-model="addModelData.productRate"></el-input>
        </el-form-item>
        <el-form-item prop="rechargeRate" label="充值费率">
          <el-input v-model="addModelData.rechargeRate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 商户产品修改 -->
    <el-dialog title="商户产品修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertEditorModelForm" :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="merchantCode" label="商户名称" required>
          <el-select disabled v-model="editorModelData.merchantCode" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allAgentList" :key="index" :label="item.custName" :value="item.merchantCode" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productId" label="产品名称" required>
          <el-select disabled v-model="editorModelData.productId" placeholder="请选择">
            <el-option v-for="item in allProductList" :key="item.productId" :value="item.productId" :label="item.productName" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productRate" label="产品费率">
          <el-input v-model="editorModelData.productRate"></el-input>
        </el-form-item>
        <el-form-item prop="rechargeRate" label="充值费率">
          <el-input v-model="editorModelData.rechargeRate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 商户产品信息删除 -->
    <el-dialog title="商户产品信息删除" :visible.sync="deleteDisplay" width="600px">
      <el-form ref="alertDeleteModelForm" disabled :model="deleteModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="merchantCode" label="商户名称" required>
          <el-select v-model="deleteModelData.merchantCode" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allAgentList" :key="index" :label="item.custName" :value="item.merchantCode" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productId" label="产品名称" required>
          <el-select disabled v-model="deleteModelData.productId" placeholder="请选择">
            <el-option v-for="item in allProductList" :key="item.productId" :value="item.productId" :label="item.productName" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productRate" label="产品费率">
          <el-input v-model="deleteModelData.productRate"></el-input>
        </el-form-item>
        <el-form-item prop="rechargeRate" label="充值费率">
          <el-input v-model="deleteModelData.rechargeRate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 商户产品审核 -->
    <el-dialog title="商户产品审核" :visible.sync="performDisplay" width="600px">
      <el-form ref="alertPerformModelForm" :model="performModelData" disabled class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="merchantCode" label="商户名称" required>
          <el-select v-model="performModelData.merchantCode" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allAgentList" :key="index" :label="item.custName" :value="item.merchantCode" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productId" label="产品名称" required>
          <el-select disabled v-model="performModelData.productId" placeholder="请选择">
            <el-option v-for="item in allProductList" :key="item.productId" :value="item.productId" :label="item.productName" />
          </el-select>
        </el-form-item>
        <el-form-item prop="productRate" label="产品汇率">
          <el-input v-model="performModelData.productRate"></el-input>
        </el-form-item>
        <el-form-item prop="rechargeRate" label="充值费率">
          <el-input v-model="performModelData.rechargeRate"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="performModelCancel">取 消</el-button>
        <el-button type="primary" @click="performModelSubmit">审核通过</el-button>
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
        merchantName: '',
        productName: '',
        productStatus: ''
      },
      addDisplay: false,
      addModelData: {},
      editorDisplay: false,
      editorModelData: {},
      deleteDisplay: false, //任务删除
      deleteModelData: {},
      performDisplay: false,
      performModelData: {},
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      allAgentList: [],
      allProductList: []
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getProductList();
    this.getComAgentList();
    this.getComProductList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getProductList(data, 1);
    },
    getProductList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcProductList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getProductList(data, v);
    },
    getComAgentList() {
      fetch.comAgentList().then(({ data = [] }) => {
        this.allAgentList = data;
      });
    },
    getComProductList() {
      fetch.comProductList().then(({ data = [] }) => {
        this.allProductList = data;
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
      fetch.mcProductAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getProductList();
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
      fetch.mcProductUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.dataTable);
      table[this.tableIndex] = data;
      this.dataTable = table;
    },
    deleteClick(row) {
      const data = Object.assign({}, row);
      this.deleteDisplay = true;
      this.deleteModelData = data;
    },
    deleteModelSubmit() {
      const { productId, merchantCode } = this.deleteModelData;

      fetch.mcProductDelete({ productId, merchantCode }).then(({ msg }) => {
        this.currentPage = 1;
        this.getProductList();
        this.$message(msg);
      });
      this.deleteModelCancel();
    },
    deleteModelCancel() {
      this.deleteDisplay = false;
    },
    performClick(row) {
      const data = Object.assign({}, row);
      this.performDisplay = true;
      this.performModelData = data;
    },
    performModelSubmit() {
      const form = this.$refs['alertPerformModelForm'];
      fetch.mcProductAudit(form.model).then(res => {
        this.getProductList();
        this.$message(res.msg);
      });
      this.performModelCancel();
    },
    performModelCancel() {
      this.performDisplay = false;
    }
  }
};
</script>

<style lang='scss'>
.merchants-product-page {
  .alert-model-form {
    .el-input__inner {
      width: 440px;
    }
  }
}
</style>