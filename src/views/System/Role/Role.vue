<template>
  <!-- 系统管理 => 角色管理 -->
  <div class="system-role-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="角色代码" prop="roleCode">
            <el-input v-model.trim="examine.roleCode" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model.trim="examine.roleName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="roleId" min-width="50" label="编号"></el-table-column>
          <el-table-column prop='roleCode' min-width="100" label="角色代码"></el-table-column>
          <el-table-column prop='roleName' min-width="100" label="角色名称"></el-table-column>
          <el-table-column prop='memo' min-width="100" label="角色说明"></el-table-column>
          <el-table-column prop='isValid' min-width="60" label="是否有效">
            <template slot-scope="scope">{{scope.row.isValid | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='instUserName' min-width="100" label="创建人"></el-table-column>
          <el-table-column prop='instDatetime' min-width="160" label="创建时间"></el-table-column>
          <el-table-column prop='lupdUserName' min-width="60" label="最后更改人"></el-table-column>
          <el-table-column prop='lupdDatetime' min-width="160" label="最后更改时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row,scope.$index)">
                <CsBtn type="look" />
              </el-button>
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

    <!-- 角色新增 -->
    <el-dialog title="角色新增" :visible.sync="addDisplay" width="900px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="80px" :show-message="false">
        <el-form-item prop="roleName" label="角色名称" required>
          <el-input v-model="addModelData.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="roleCode" label="角色代码" required>
          <el-input v-model="addModelData.roleCode"></el-input>
        </el-form-item>
        <el-form-item prop="memo" label="角色说明" required>
          <el-input v-model="addModelData.memo"></el-input>
        </el-form-item>
        <el-form-item prop="isValid" label="是否有效" required>
          <el-select v-model="addModelData.isValid" placeholder="选择角色状态">
            <el-option label="有效" value="Y"></el-option>
            <el-option label="无效" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="checkValue" label="角色权限" required>
          <el-cascader-panel v-model="addModelData.checkValue" :options="addRoleFnList" :props="cascaderPanelProps"></el-cascader-panel>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 查看 model -->
    <el-dialog title="角色修改" :visible.sync="editorDisplay" width="900px">
      <el-form ref="alertEditorModelForm" :disabled="islook" :model="editorModelData" class="alert-model-form" label-width="80px" :show-message="false">
        <el-form-item prop="roleId" label="角色编号" required>
          <el-input disabled v-model="editorModelData.roleId"></el-input>
        </el-form-item>
        <el-form-item prop="roleCode" label="角色代码" required>
          <el-input v-model="editorModelData.roleCode"></el-input>
        </el-form-item>
        <el-form-item prop="roleName" label="角色名称" required>
          <el-input v-model="editorModelData.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="memo" label="角色说明" required>
          <el-input v-model="editorModelData.memo"></el-input>
        </el-form-item>
        <el-form-item prop="isValid" label="是否有效" required>
          <el-select v-model="editorModelData.isValid" placeholder="选择角色状态">
            <el-option label="有效" value="Y"></el-option>
            <el-option label="无效" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="checkValue" label="角色权限" required v-loading="!updateRoleFnList.length">
          <el-cascader-panel v-model="editorModelData.checkValue" :options="updateRoleFnList" :props="cascaderPanelProps"></el-cascader-panel>
        </el-form-item>

      </el-form>
      <div v-show="!islook" slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';
import { dealTree, getTreeData } from '@/tools/utils';

export default {
  name: 'Role',
  props: ['searchText'],
  data() {
    return {
      cascaderPanelProps: {
        multiple: true,
        value: 'functionId',
        label: 'functionName',
        children: 'functionTreeVOS'
      },
      examine: {
        roleCode: '',
        roleName: ''
      },
      addDisplay: false,
      addModelData: {
        roleName: '',
        roleCode: '',
        memo: '',
        isValid: '',
        checkValue: []
      },
      editorDisplay: false,
      editorModelData: {
        roleId: '',
        roleCode: '',
        memo: '',
        isValid: '',
        checkValue: []
      },
      islook: false, //编辑还是查看
      tableData: [],
      addRoleFnList: [], //新增角色功能列表
      updateRoleFnList: [], //修改角色功能列表
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
    this.getRoleList();
    this.getRoleFn(null);
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getRoleList(data, 1);
    },
    getRoleList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.sysRoleList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data || {};
        this.tableData = list || [];
        this.total = total;
      });
    },
    getRoleFn(roleId = '') {
      fetch.sysRoleFnTree({ roleId }).then(res => {
        const { data = [] } = res;
        const dataArr = dealTree(data);

        if (roleId) {
          //修改时请求
          this.updateRoleFnList = getTreeData(data);
          this.editorModelData.checkValue = dataArr;
        } else {
          //新增时获取列表
          this.addRoleFnList = getTreeData(data);
        }
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getRoleList(data, v);
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
      const dealCheckValue = this.dealCheckValue(form.model.checkValue);
      form.model.checkValue = dealCheckValue;
      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.sysRoleSave(data).then(({ msg }) => {
        this.$message(msg);
        this.getRoleList();
      });
      this.addModelCancel();
    },
    // 编辑
    editorClick(row, index) {
      this.islook = false;
      const data = Object.assign({}, row);

      if (!data.checkValue) {
        data.checkValue = [];
      }

      this.getRoleFn(data.roleId);
      this.tableIndex = index;
      this.editorDisplay = true;
      this.editorModelData = data;
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      const form = this.$refs['alertEditorModelForm'];
      const dealCheckValue = this.dealCheckValue(form.model.checkValue);
      form.model.checkValue = dealCheckValue;
      this.checkFormSubmit(form, this.updateMenuItem.bind(null, form.model));
    },
    dealCheckValue(arr) {
      const dealStr = arr.flat();
      const dealArr = new Set(dealStr);
      const dealCheckValue = Array.from(dealArr).join(',');
      return dealCheckValue;
    },
    updateMenuItem(data) {
      this.editorDisplay = false;
      fetch.sysRoleUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.tableData);
      table[this.tableIndex] = data;
      this.tableData = table;
    },
    lookClick(row, index) {
      this.editorClick(row, index);
      this.islook = true;
    },
    deleteClick(row) {
      const { roleId } = row;

      this.$confirm('确定删除吗')
        .then(() => {
          fetch.sysRoleDelete({ roleId }).then(({ msg }) => {
            this.currentPage = 1;
            this.getRoleList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'>
.system-role-page {
  .el-checkbox {
    width: 25%;
  }
}
</style>