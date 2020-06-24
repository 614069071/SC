<template>
  <!-- 商户管理>商户设备管理 -->
  <div class="merchants-product-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户名称" prop="merchantName">
            <el-input v-model="examine.merchantName" @keyup.enter="goToSearch"></el-input>
          </el-form-item>

          <el-form-item label="设备编号" prop="terminalNo">
            <el-input v-model="examine.terminalNo" @keyup.enter="goToSearch"></el-input>
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
          <el-table-column prop='id' label='编号' width="60"></el-table-column>
          <el-table-column prop='merchantName' label='商户名称' min-width="100"></el-table-column>
          <el-table-column prop='merchantId' label='商户编号' min-width="110"></el-table-column>
          <el-table-column prop='terminalNo' label='设备编号' min-width="90"></el-table-column>
          <el-table-column prop='instDatetime' label='初始时间' width="160"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <!-- 按钮显示还需要判断 -->
              <el-button type="text" size="small" @click="editorClick(scope.row,scope.$index)">
                <cs-btn />
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

    <!-- 商户产品新增 -->
    <el-dialog title="商户产品新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="merchantId" label="商户名称" required>
          <el-select v-model="addModelData.merchantId" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allMerchantList" :key="index" :label="item.custName" :value="item.custId" />
          </el-select>
        </el-form-item>
        <el-form-item prop="terminalNo" label="设备编号" required>
          <el-select v-model="addModelData.terminalNo" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allMaterielList" :key="index" :label="item.machineId" :value="item.machineId" />
          </el-select>
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
        <el-form-item prop="id" label="编号" required>
          <el-input disabled v-model="editorModelData.id"></el-input>
        </el-form-item>
        <el-form-item prop="merchantId" label="商户名称" required>
          <el-select disabled v-model="editorModelData.merchantId" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allMerchantList" :key="index" :label="item.custName" :value="item.custId" />
          </el-select>
        </el-form-item>
        <el-form-item prop="terminalNo" label="设备编号" required>
          <el-select v-model="editorModelData.terminalNo" filterable placeholder="请选择">
            <el-option v-for="(item,index) in allMaterielList" :key="index" :label="item.machineId" :value="item.machineId" />
          </el-select>
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
        merchantName: '',
        terminalNo: ''
      },
      addDisplay: false,
      addModelData: {
        merchantId: '',
        terminalNo: ''
      },
      editorDisplay: false,
      editorModelData: {
        merchantId: '',
        terminalNo: ''
      },
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      allMerchantList: [],
      allMaterielList: []
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getEquipmentList();
    this.getComMerchantList();
    this.getComMaterielList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getEquipmentList(data, 1);
    },
    getEquipmentList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcEquipmentList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getEquipmentList(data, v);
    },
    // 商户列表
    getComMerchantList() {
      fetch.comMerchantList().then(({ data = [] }) => {
        this.allMerchantList = data;
      });
    },
    // 设备列表
    getComMaterielList() {
      fetch.comMaterielList().then(({ data }) => {
        this.allMaterielList = data;
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
      fetch.mcEquipmentAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getEquipmentList();
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
      fetch.mcEquipmentUpdate(data).then(({ msg }) => {
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
      this.$confirm('您确定要删除该物料吗？')
        .then(() => {
          fetch.mcEquipmentDelete(row).then(({ msg }) => {
            this.currentPage = 1;
            this.getEquipmentList();
            this.$message(msg);
          });
        })
        .catch(() => {});
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