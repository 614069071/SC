<template>
  <!-- 商户管理 > 收银员 -->
  <div class="merchants-rate-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm">
          <el-form-item label="商户" prop="merchantCustId">
            <el-col>
              <el-select v-model="examine.merchantCustId" filterable placeholder="请输入内容">
                <el-option v-for="(item,index) in allMchList" :key="index" :label="item.custName" :value="item.shopId" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="收银员手机号" prop="cashierMobile">
            <el-input v-model="examine.cashierMobile" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="emptySearch">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <!-- 商户 门店名称 收银员手机号 收银员姓名 是否有退款权限 是否有全门店权限 是否有效 创建时间 -->
        <el-table :data="tableData" border class="tableInner-content">
          <el-table-column prop='merchantName' label='商户' min-width="100"></el-table-column>
          <el-table-column prop='shopName' label='门店名称' min-width="100"></el-table-column>
          <el-table-column prop='cashierMobile' label='收银员手机号' width="120"></el-table-column>
          <el-table-column prop='cashierName' label='收银员姓名' width="100"></el-table-column>
          <el-table-column prop='refundAuth' label='是否有退款权限' width="120">
            <template slot-scope="scope">{{scope.row.refundAuth == '1' ? '有' : '否'}}</template>
          </el-table-column>
          <el-table-column prop='status' label='是否有效' width="100">
            <template slot-scope="scope">{{scope.row.status == '1' ? '有' : '否'}}</template>
          </el-table-column>
          <el-table-column prop='createTime' label='创建时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">
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

    <!-- 添加收银员 -->
    <el-dialog title="添加收银员" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item label="商户" prop="merchantCustId" required>
          <el-col>
            <el-select v-model="addModelData.merchantCustId" filterable placeholder="请输入内容">
              <el-option v-for="item in allMchList" :key="item.custId" :label="item.custName" :value="item.custId" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="门店" prop="shopId">
          <el-input v-model="addModelData.shopId"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cashierMobile" required>
          <el-input v-model="addModelData.cashierMobile"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="cashierName">
          <el-input v-model="addModelData.cashierName"></el-input>
        </el-form-item>
        <el-form-item prop="refundAuth" label="是否有退款权限">
          <el-select v-model="examine.refundAuth" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="loginPw" label="登录密码" required>
          <el-input v-model="addModelData.loginPw"></el-input>
        </el-form-item>
        <el-form-item prop="refundPw" label="退款密码" required>
          <el-input v-model="addModelData.refundPw"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 协议修改 -->
    <el-dialog title="协议修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertEditorModelForm" :model="editorModelData" class="editor-model-form" label-width="130px" :show-message="false">
        <el-form-item prop="merchantName" label="商户">
          <el-input disabled v-model="editorModelData.merchantName"></el-input>
        </el-form-item>
        <el-form-item prop="shopName" label="门店">
          <el-input disabled v-model="editorModelData.shopName"></el-input>
        </el-form-item>
        <el-form-item prop="cashierMobile" label="手机号" required>
          <el-input v-model="editorModelData.cashierMobile"></el-input>
        </el-form-item>
        <el-form-item prop="cashierName" label="姓名">
          <el-input v-model="editorModelData.cashierName"></el-input>
        </el-form-item>
        <el-form-item prop="refundAuth" label="是否有退款权限">
          <el-select v-model="editorModelData.refundAuth" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="是否生效">
          <el-select v-model="editorModelData.status" placeholder="请选择">
            <el-option label="生效" value="1"></el-option>
            <el-option label="失效" value="0"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务删除 -->
    <el-dialog title="删除任务" :visible.sync="deleteDisplay" width="640px">
      <div class="dialog-deleted-content">您确定要删除该收银员么？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
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
      examine: {},
      addDisplay: false,
      addModelData: {},
      restaurants: [],
      editorDisplay: false,
      editorModelData: {},
      deleteDisplay: false,
      tableData: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      allMchList: []
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getCashierList();
    this.getAllMchList();
  },
  methods: {
    testchange(c) {
      const code = this.allMchList.find(e => (e.custId = c));
      console.log(code, 'code');
    },
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getCashierList(data, 1);
    },
    //清空
    emptySearch() {
      this.mapCustName = '';
      this.$refs['controlQueryForm'].resetFields();
    },
    getCashierList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcCashierList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getCashierList(data, v);
    },
    getAllMchList() {
      fetch.mcAllMchList().then(({ data = [] }) => {
        this.allMchList = data;
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
      fetch.mcCashierAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getCashierList();
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
      fetch.mcCashierUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.tableData);
      table[this.tableIndex] = data;
      this.tableData = table;
    },
    deleteModelSubmit() {
      this.deleteDisplay = false;
    },
    deleteModelCancel(row) {
      this.deleteDisplay = false;
      window.console.log(row);
    },
    deleteClick(row) {
      const { cashierCustId = '' } = row;

      this.$confirm('确定要删除该收银员么？')
        .then(() => {
          fetch.sysDeptDelete({ cashierCustId }).then(({ msg }) => {
            this.currentPage = 1;
            this.getDeptList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'>
.merchants-rate-page {
  .add-form-rate {
    .el-form-item__content {
      .el-input {
        margin: 0 4px;
        &:first-child {
          margin-left: 0;
        }
      }

      display: flex;
      i {
        display: inline-block;
        width: 230px;
      }
    }
  }
}
</style>