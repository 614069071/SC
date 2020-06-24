<template>
  <!-- 商户管理 > 门店管理 -->
  <div class="merchants-shop-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="70px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户名称" prop="custName">
            <el-input v-model.trim="examine.custName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="商户编号" prop="merchantCode">
            <el-input v-model.trim="examine.merchantCode" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="shopName">
            <el-input v-model.trim="examine.shopName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="门店编号" prop="shopNo">
            <el-input v-model.trim="examine.shopNo" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">添加新门店<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border class="tableInner-content">
          <el-table-column prop='merchantCode' label='商户编号' min-width="100"></el-table-column>
          <el-table-column prop='custName' label='商户名称' min-width="80"></el-table-column>
          <el-table-column prop='shopNo' label='门店编号' min-width="90"></el-table-column>
          <el-table-column prop='shopName' label='门店名称' min-width="100"></el-table-column>
          <el-table-column prop='addr' label='门店地址' min-width="100"></el-table-column>
          <el-table-column prop='contact' label='门店联系方式' width="110"></el-table-column>
          <el-table-column prop='status' label='门店状态' width="80">
            <template slot-scope="scope">{{scope.row.status | dealFields}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row,scope.$index)">
                <CsBtn />
              </el-button>
              <!-- <el-button type="text" size="small" @click="newClick(scope.row)">
                <CsBtn type="add" />
              </el-button> -->
              <el-button type="text" size="small" @click="lookClick(scope.row)">
                <CsBtn type="look" title="查看收款二维码" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 添加门店 -->
    <el-dialog title="添加门店" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="merchantCode" label="商户" required>
          <el-select v-model="addModelData.merchantCode" filterable placeholder="请选择商户" @change="handleSelect">
            <el-option v-for="item in cashier" :key="item.merchantCode" :label="item.custName" :value="item.merchantCode" />
          </el-select>
        </el-form-item>
        <el-form-item prop="shopName" label="门店名称" required>
          <el-input v-model="addModelData.shopName"></el-input>
        </el-form-item>
        <el-form-item prop="addr" label="门店地址" required>
          <el-input v-model="addModelData.addr"></el-input>
        </el-form-item>
        <el-form-item prop="contact" label="门店联系方式" required>
          <el-input v-model="addModelData.contact"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态" required>
          <el-select v-model="addModelData.status" placeholder="请选择">
            <el-option label="可用" value="1"></el-option>
            <el-option label="不可用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改门店资料 -->
    <el-dialog title="修改门店资料" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" ref="alertEditorModelForm" class="editor-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="custName" label="商户" required>
          <el-input disabled v-model="editorModelData.custName"></el-input>
        </el-form-item>
        <el-form-item prop="shopNo" label="门店编号" required>
          <el-input disabled v-model="editorModelData.shopNo"></el-input>
        </el-form-item>
        <el-form-item prop="shopName" label="门店名称" required>
          <el-input v-model="editorModelData.shopName"></el-input>
        </el-form-item>
        <el-form-item prop="addr" label="门店地址" required>
          <el-input v-model="editorModelData.addr"></el-input>
        </el-form-item>
        <el-form-item prop="contact" label="门店联系方式" required>
          <el-input v-model="editorModelData.contact"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-select v-model="editorModelData.status" placeholder="请选择">
            <el-option label="可用" value="1"></el-option>
            <el-option label="不可用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加门店资料 -->
    <!-- <el-dialog title="添加门店资料" :visible.sync="newDisplay" width="600px">
      <el-form :model="newModelData" class="editor-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="custName" label="商户" required>
          <el-input disabled v-model="newModelData.custName"></el-input>
        </el-form-item>
        <el-form-item prop="shopName" label="门店名称" required>
          <el-input v-model="newModelData.shopName"></el-input>
        </el-form-item>
        <el-form-item prop="addr" label="门店地址" required>
          <el-input v-model="newModelData.addr"></el-input>
        </el-form-item>
        <el-form-item prop="contact" label="门店联系方式" required>
          <el-input v-model="newModelData.contact"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-select v-model="newModelData.status" placeholder="请选择">
            <el-option label="可用" value="1"></el-option>
            <el-option label="不可用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newModelCancel">取 消</el-button>
        <el-button type="primary" @click="newModelSubmit">确 定</el-button>
      </div>
    </el-dialog> -->

    <!-- 收款二维码 -->
    <el-dialog title="收款二维码" :visible.sync="lookDisplay" width="400px" class="alert-qrcode-model">
      <el-radio-group v-model="QrCode">
        <el-radio label="0">七分钱样式</el-radio>
        <el-radio label="1">原始样式</el-radio>
      </el-radio-group>

      <div class="QrCode-img">
        <img class="img" :src="QrCodeSrc" />
        <div>二维码收款可打印张贴在店门口</div>
      </div>
      <div class="qrcode-download">
        <el-button type="primary">下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import cashier from '@/tools/cashier';
import fetch from '@/fetch';
export default {
  name: 'Shop',
  props: ['searchText'],
  data() {
    return {
      examine: {
        custName: '',
        shopName: '',
        shopNo: '',
        merchantCode: ''
      },
      addDisplay: false,
      addModelData: {},
      restaurants: [],
      editorDisplay: false,
      editorModelData: {},
      // newDisplay: false,
      // newModelData: {},
      QrCode: '0',
      lookDisplay: false,
      tableData: [],
      total: 0, // 分页
      currentPage: 1,
      cashier: [], //商户列表
      QrCodeSrc: ''
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getShopList();
    this.getAllMchList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getShopList(data, 1);
    },
    getShopList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcShopList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getShopList(data, v);
    },
    // 所有商户列表
    getAllMchList() {
      fetch.mcAllMchList().then(res => {
        const { data = [] } = res;
        this.cashier = data;
      });
    },
    // 新增新门店
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
      console.log(form.model);
      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.mcShopAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getShopList();
      });
      this.addModelCancel();
    },
    // 选中候选中的项
    handleSelect(code) {
      const form = this.$refs['alertAddModelForm'];
      const { custId = '' } =
        this.cashier.find(e => e.merchantCode === code) || {};
      form.model.mchId = custId;
      window.console.log(code, custId, 'value');
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
      fetch.mcShopUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.tableData);
      table[this.tableIndex] = data;
      this.tableData = table;
    },
    // 添加门店资料
    // newClick(row) {
    //   this.newDisplay = true;
    //   // this.newModelData = row;
    //   window.console.log(row);
    // },
    // newModelCancel() {
    //   this.newDisplay = false;
    // },
    // newModelSubmit() {
    //   window.console.log(this.newModelData);
    //   this.newDisplay = false;
    // },
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
      const data = {
        mchId: row.mchId,
        merchantCode: row.merchantCode,
        shopNo: row.shopNo
      };
      this.getShopCode(data);
    },
    getShopCode(data) {
      fetch.mcShopCode(data).then(res => {
        console.log(res)
        const { url = '' } = res.data || {};
        
        this.QrCodeSrc = url;
      });
    }
  }
};
</script>

<style lang='scss'>
.merchants-shop-page {
  .alert-model-form {
    .el-input {
      width: 370px;
    }
  }

  .alert-qrcode-model .QrCode-img {
    .img {
      display: inline-block;
      width: 200px;
      height: 200px;
      background-color: rgb(250, 250, 250);
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: 5px;
    }
    text-align: center;
  }
  .qrcode-download {
    text-align: right;
  }
}
</style>
