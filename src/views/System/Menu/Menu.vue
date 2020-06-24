<template>
  <!-- 系统管理 => 菜单管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="菜单代码" prop="functionCode">
            <el-input v-model.trim="examine.functionCode" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称" prop="functionName">
            <el-input v-model.trim="examine.functionName" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="URL" prop="functionUrl">
            <el-input v-model.trim="examine.functionUrl" @keyup.enter.native="goToSearch"></el-input>
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
          <el-table-column prop='functionId' label='菜单编号' min-width="80"></el-table-column>
          <el-table-column prop='functionCode' label='菜单代码' min-width="80"></el-table-column>
          <el-table-column prop='functionName' label='菜单名称' min-width="140"></el-table-column>
          <el-table-column prop='parentFunctionId' label='上级编号' min-width="80"></el-table-column>
          <el-table-column prop='functionLevel' label='功能级别' min-width="80"></el-table-column>
          <el-table-column prop='routePage' label='Router' min-width="140"></el-table-column>
          <el-table-column prop='isMenu' label='是否是菜单' min-width="90">
            <template slot-scope="scope">{{scope.row.isMenu | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='isValid' label='是否有效' min-width="80">
            <template slot-scope="scope">{{scope.row.isValid | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='accessType' label='是否要授权' min-width="90">
            <template slot-scope="scope">{{scope.row.accessType | dealFields}}</template>
          </el-table-column>
          <el-table-column prop='instUserName' label='创建人' min-width="80"></el-table-column>
          <el-table-column prop='instDatetime' min-width="160" label='创建时间'></el-table-column>

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

    <!-- 菜单新增 -->
    <el-dialog title="菜单新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="functionCode" label="功能代码" required>
          <el-input v-model="addModelData.functionCode"></el-input>
        </el-form-item>
        <el-form-item prop="functionName" label="功能名称" required>
          <el-input v-model="addModelData.functionName"></el-input>
        </el-form-item>
        <el-form-item prop="parentFunctionId" label="上级编号" required>
          <el-input v-model="addModelData.parentFunctionId"></el-input>
        </el-form-item>
        <el-form-item prop="functionLevel" label="功能级别" required>
          <el-input v-model="addModelData.functionLevel"></el-input>
        </el-form-item>
        <el-form-item prop="functionOrder" label="功能排序" required>
          <el-input v-model="addModelData.functionOrder"></el-input>
        </el-form-item>
        <el-form-item prop="routePage" label="Router" required>
          <el-input v-model="addModelData.routePage"></el-input>
        </el-form-item>
        <el-form-item prop="functionUrl" label="URL">
          <el-input v-model="addModelData.functionUrl"></el-input>
        </el-form-item>
        <el-form-item prop="isMenu" label="是否是菜单" required>
          <el-select v-model="addModelData.isMenu" placeholder="选择是否是菜单">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="isValid" label="是否要授权" required>
          <el-select v-model="addModelData.isValid" placeholder="是否授权">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="accessType" label="是否有效" required>
          <el-select v-model="addModelData.accessType" placeholder="是否有效">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="iconClass" label="图标样式">
          <el-input v-model="addModelData.iconClass"></el-input>
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
    <el-dialog title="角色修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertEditorModelForm" :model="editorModelData" class="alert-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="functionId" label="功能编号" required>
          <el-input v-model="editorModelData.functionId"></el-input>
        </el-form-item>
        <el-form-item prop="functionCode" label="功能代码" required>
          <el-input v-model="editorModelData.functionCode"></el-input>
        </el-form-item>
        <el-form-item prop="functionName" label="功能名称" required>
          <el-input v-model="editorModelData.functionName"></el-input>
        </el-form-item>
        <el-form-item prop="parentFunctionId" label="上级编号" required>
          <el-input v-model="editorModelData.parentFunctionId"></el-input>
        </el-form-item>
        <el-form-item prop="functionLevel" label="功能级别" required>
          <el-input v-model="editorModelData.functionLevel"></el-input>
        </el-form-item>
        <el-form-item prop="functionOrder" label="功能排序" required>
          <el-input v-model="editorModelData.functionOrder"></el-input>
        </el-form-item>
        <el-form-item prop="functionUrl" label="URL" required>
          <el-input v-model="editorModelData.functionUrl"></el-input>
        </el-form-item>
        <el-form-item prop="routePage" label="Router">
          <el-input v-model="editorModelData.routePage"></el-input>
        </el-form-item>
        <el-form-item prop="isMenu" label="是否是菜单" required>
          <el-select v-model="editorModelData.isMenu" placeholder="选择是否是菜单">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="isValid" label="是否要授权" required>
          <el-select v-model="editorModelData.isValid" placeholder="是否授权">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="accessType" label="是否有效" required>
          <el-select v-model="editorModelData.accessType" placeholder="是否有效">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="iconClass" label="图标样式">
          <el-input v-model="editorModelData.iconClass"></el-input>
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
  name: 'Menu',
  props: ['searchText'],
  data() {
    return {
      examine: {
        functionCode: '',
        functionName: '',
        functionUrl: ''
      },
      addDisplay: false,
      addModelData: {
        functionCode: '',
        functionName: '',
        functionUrl: '',
        functionLevel: '',
        parentFunctionId: '',
        functionOrder: '',
        routePage: '',
        isMenu: '',
        isValid: '',
        accessType: '',
        iconClass: '',
        memo: ''
      },
      editorDisplay: false,
      editorModelData: {
        functionId: '',
        functionCode: '',
        functionName: '',
        parentFunctionId: '',
        functionLevel: '',
        functionOrder: '',
        functionUrl: '',
        routePage: '',
        isMenu: '',
        isValid: '',
        accessType: '',
        iconClass: '',
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
    this.getMenuList();
  },
  methods: {
    // 搜索
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getMenuList(data, 1);
    },
    getMenuList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.sysMenuList(data, parmas).then(res => {
        const { list = [], total = 0 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getMenuList(data, v);
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
      // console.log(form, 'alertAddModelForm');
      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.sysMenuAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getMenuList();
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
      fetch.sysMenuUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg);
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.tableData);
      table[this.tableIndex] = data;
      this.tableData = table;
    },
    deleteClick(row) {
      const { functionId } = row;

      this.$confirm('确定删除吗')
        .then(() => {
          fetch.sysMenuDelete({ functionId }).then(({ msg }) => {
            this.currentPage = 1;
            this.getMenuList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss' scoped></style>