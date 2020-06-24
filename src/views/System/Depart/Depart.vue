<template>
  <!-- 系统管理 => 部门管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="部门代码" prop="deptCode">
            <el-input v-model.trim="examine.deptCode" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model.trim="examine.deptName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='deptId' label='部门编号' width="80"></el-table-column>
          <el-table-column prop='deptName' label='部门名称' min-width="120"></el-table-column>
          <el-table-column prop='deptCode' label='部门代码' min-width="100"></el-table-column>
          <el-table-column prop='deptLevel' label='部门级别' min-width="80"></el-table-column>
          <el-table-column prop='upDeptId' label='上级部门' min-width="80"></el-table-column>
          <el-table-column prop='status' label='是否有效' min-width="80">
            <template slot-scope="scope">{{scope.row.status | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='instUserName' label='创建人' min-width="100"></el-table-column>
          <el-table-column prop='instDatetime' label='创建时间' min-width="160"></el-table-column>
          <el-table-column prop='lupdUserName' label='更新人' min-width="100"></el-table-column>
          <el-table-column prop='lupdDatetime' min-width="160" label='更新时间'></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row,scope.$index)">
                <CsBtn type="editor" />
              </el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">
                <CsBtn type="delete" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 部门新增 -->
    <el-dialog title="角色新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="deptName" label="部门名称" required>
          <el-input v-model="addModelData.deptName"></el-input>
        </el-form-item>
        <el-form-item prop="deptCode" label="部门代码" required>
          <el-input v-model="addModelData.deptCode"></el-input>
        </el-form-item>
        <el-form-item prop="deptLevel" label="部门级别" required>
          <el-input v-model="addModelData.deptLevel"></el-input>
        </el-form-item>
        <el-form-item prop="upDeptId" label="上级部门" required>
          <el-select v-model="addModelData.upDeptId" placeholder="请选择部门">
            <el-option value='1' label='(GYZB)-国银证保'></el-option>
            <el-option value='2' label='(TECH)-信息技术部'></el-option>
            <el-option value='3' label='(OPERATION)-运营管理部'></el-option>
            <el-option value='4' label='(BJQFQ)-北京七分钱'></el-option>
            <el-option value='5' label='(FIN)-财务部'></el-option>
            <el-option value='6' label='(RM)-风险管理部'></el-option>
            <el-option value='7' label='(KEFU)-客服'></el-option>
            <el-option value='8' label='(PROD)-产品'></el-option>
            <el-option value='0' label='无'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="是否有效" required>
          <el-select v-model="addModelData.status" placeholder="是否有效">
            <el-option label="有效" value="VALID"></el-option>
            <el-option label="无效" value="DISABLE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptAddress" label="部门地址">
          <el-input v-model="addModelData.deptAddress"></el-input>
        </el-form-item>
        <el-form-item prop="memo" label="备注">
          <el-input type="textarea" v-model="addModelData.memo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改model -->
    <el-dialog title="部门修改" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" ref="alertEditorModelForm" class="alertEditorModelForm" label-width="80px" :show-message="false">
        <el-form-item prop="deptId" label="部门编号" required>
          <el-input v-model="editorModelData.deptId"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="部门名称" required>
          <el-input v-model="editorModelData.deptName"></el-input>
        </el-form-item>
        <el-form-item prop="deptCode" label="部门代码" required>
          <el-input v-model="editorModelData.deptCode"></el-input>
        </el-form-item>
        <el-form-item prop="deptLevel" label="部门级别" required>
          <el-input v-model="editorModelData.deptLevel"></el-input>
        </el-form-item>
        <el-form-item prop="upDeptId" label="上级部门" required>
          <el-select v-model="editorModelData.upDeptId" placeholder="请选择部门">
            <el-option :value='1' label='(GYZB)-国银证保'></el-option>
            <el-option :value='2' label='(TECH)-信息技术部'></el-option>
            <el-option :value='3' label='(OPER)-运营管理部'></el-option>
            <el-option :value='4' label='(FIN)-财务部'></el-option>
            <el-option :value='5' label='(PROD)-产品'></el-option>
            <el-option :value='0' label='无'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="是否有效" required>
          <el-select v-model="editorModelData.status" placeholder="是否有效">
            <el-option label="有效" value="VALID"></el-option>
            <el-option label="无效" value="DISABLE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptAddress" label="部门地址">
          <el-input v-model="editorModelData.deptAddress"></el-input>
        </el-form-item>
        <el-form-item prop="memo" label="备注">
          <el-input type="textarea" v-model="editorModelData.memo"></el-input>
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
  name: 'Depart',
  props: ['searchText'],
  data() {
    return {
      examine: {
        deptCode: '',
        deptName: ''
      },
      addDisplay: false,
      addModelData: {
        deptName: '',
        deptCode: '',
        deptLevel: '',
        upDeptId: '',
        status: '',
        deptAddress: '',
        memo: ''
      },
      editorDisplay: false,
      editorModelData: {
        deptId: '',
        deptName: '',
        deptCode: '',
        deptLevel: '',
        upDeptId: '',
        status: '',
        deptAddress: '',
        memo: ''
      },
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
    this.getDeptList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getDeptList(data, 1);
    },
    getDeptList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.sysDeptList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getDeptList(data, v);
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
      fetch.sysDeptSave(data).then(({ msg }) => {
        this.$message(msg);
        this.getDeptList();
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
      fetch.sysDeptUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.tableData);
      table[this.tableIndex] = data;
      this.tableData = table;
    },
    deleteClick(row) {
      const { deptId } = row;

      this.$confirm('确定删除吗')
        .then(() => {
          fetch.sysDeptDelete({ deptId }).then(({ msg }) => {
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

<style lang='scss' scoped></style>