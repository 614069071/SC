<template>
  <!-- 系统管理 => 用户管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model.trim="examine.realName" placeholder="请输入姓名" @keyup.enter.native="goToSearch"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="deptId">
            <el-select v-model.trim="examine.deptId" placeholder="请选择部门">
              <el-option v-for="(item,index) in deptList" :value='item.deptId' :label="`(${item.deptCode})-${item.deptName}`" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="examine.status" placeholder="请选择用户状态">
              <el-option label="(VALID)-生效" value="VALID"></el-option>
              <el-option label="(FREEZE)-冻结" value="FREEZE"></el-option>
              <el-option label="(LEAVE)-离职" value="LEAVE"></el-option>
              <el-option label="(LOGIN)-已登陆" value="LOGIN"></el-option>
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
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="userId" min-width="50" label="编号"></el-table-column>
          <el-table-column prop="userCode" min-width="120" label="员工编号"></el-table-column>
          <el-table-column prop="userName" label="姓名" min-width="120"></el-table-column>
          <el-table-column prop="deptName" min-width="150" label="部门名称"></el-table-column>
          <el-table-column prop="sex" min-width="50" label="性别">
            <template slot-scope="scope">{{scope.row.sex | dealFields}}</template>
          </el-table-column>
          <el-table-column prop="selfPhone" min-width="110" label="个人电话"></el-table-column>
          <el-table-column prop="status" min-width="100" label="状态">
            <template slot-scope="scope">{{scope.row.status | dealFields}}</template>
          </el-table-column>
          <el-table-column prop="instUserName" min-width="120" label="创建人"></el-table-column>
          <el-table-column prop="instDatetime" label="创建时间" min-width="160"></el-table-column>
          <el-table-column prop="lupdUserName" label="更新人" min-width="100"></el-table-column>
          <el-table-column prop="lupdDatetime" label="更新时间" min-width="160"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">
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

    <!-- 用户新增 -->
    <el-dialog title="用户新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="80px" :show-message="false">
        <el-form-item prop="userCode" label="员工编号" required>
          <el-input v-model="addModelData.userCode"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" required>
          <el-input v-model="addModelData.password"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名" required>
          <el-input v-model="addModelData.userName"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="真实姓名" required>
          <el-input v-model="addModelData.realName"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model="addModelData.nickName"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别" required>
          <el-select v-model="addModelData.sex" placeholder="选择">
            <el-option label="男" value="MEN"></el-option>
            <el-option label="女" value="WOMEN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" label="所属部门" required>
          <el-select v-model="addModelData.deptId" placeholder="请选择部门">
            <el-option v-for="(item,index) in deptList" :value='item.deptId' :label="`(${item.deptCode})-${item.deptName}`" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="roleList" label="角色">
          <el-select v-model="addModelData.roleList" multiple placeholder="请选择">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item prop="workPhone" label="办公电话">
          <el-input v-model="addModelData.workPhone"></el-input>
        </el-form-item>
        <el-form-item prop="selfPhone" label="个人电话">
          <el-input v-model="addModelData.selfPhone"></el-input>
        </el-form-item>
        <el-form-item prop="workEmail" label="办公邮箱">
          <el-input v-model="addModelData.workEmail"></el-input>
        </el-form-item>
        <el-form-item prop="selfEmai" label="个人邮箱">
          <el-input v-model="addModelData.selfEmai"></el-input>
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
    <el-dialog title="用户修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertEditorModelForm" :model="editorModelData" class="alert-model-form" label-width="80px" :show-message="false">
        <el-form-item prop="userId" label="编号" required>
          <el-input disabled v-model="editorModelData.userId"></el-input>
        </el-form-item>
        <el-form-item prop="userCode" label="员工编号" required>
          <el-input disabled v-model="editorModelData.userCode"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名" required>
          <el-input v-model="editorModelData.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" required>
          <el-input v-model="editorModelData.password"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="真实姓名" required>
          <el-input v-model="editorModelData.realName"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model="editorModelData.nickName"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别" required>
          <el-select v-model="editorModelData.sex" placeholder="选择">
            <el-option label="男" value="MEN"></el-option>
            <el-option label="女" value="WOMEN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" required>
          <el-select v-model="editorModelData.status" placeholder="请选择用户状态">
            <el-option label="(VALID)-生效" value="VALID"></el-option>
            <el-option label="(FREEZE)-冻结" value="FREEZE"></el-option>
            <el-option label="(LEAVE)-离职" value="LEAVE"></el-option>
            <el-option label="(LOGIN)-已登陆" value="LOGIN"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptName" label="所属部门" required>
          <el-select v-model="editorModelData.deptName" placeholder="请选择部门">
            <el-option v-for="(item,index) in deptList" :value='item.deptId' :label="`(${item.deptCode})-${item.deptName}`" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="roleList" label="角色">
          <el-select v-model="editorModelData.roleList" multiple placeholder="请选择">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item prop="workPhone" label="办公电话">
          <el-input v-model="editorModelData.workPhone"></el-input>
        </el-form-item>
        <el-form-item prop="selfPhone" label="个人电话">
          <el-input v-model="editorModelData.selfPhone"></el-input>
        </el-form-item>
        <el-form-item prop="workEmail" label="办公邮箱">
          <el-input v-model="editorModelData.workEmail"></el-input>
        </el-form-item>
        <el-form-item prop="selfEmail" label="个人邮箱">
          <el-input v-model="editorModelData.selfEmail"></el-input>
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
  name: 'Suser',
  props: ['searchText'],
  data() {
    return {
      examine: {}, //查询字段
      addDisplay: false, //新增
      addModelData: {
        userCode: '',
        password: '',
        userName: '',
        nickName: '',
        sex: '',
        deptId: '',
        roleList: [],
        workPhone: '',
        selfPhone: '',
        workEmail: '',
        selfEmail: '',
        memo: ''
      }, //新增表单数据
      editorDisplay: false, //编辑
      editorModelData: {
        userId: '',
        userCode: '',
        userName: '',
        password: '',
        realName: '',
        sex: '',
        status: '',
        deptName: '',
        roleList: [],
        workPhone: '',
        selfPhone: '',
        workEmail: '',
        selfEmail: '',
        memo: ''
      }, //编辑数据
      tableData: [], //表单数据
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1,
      deptList: [],
      roleList: []
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getUserList();
    this.getDeptList();
    this.getRoleList();
  },
  methods: {
    // 搜索
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getUserList(data, 1);
    },
    getUserList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.sysUserList(data, parmas).then(res => {
        const { list = [], total = 0 } = res.data;
        this.tableData = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getUserList(data, v);
    },
    // 部门列表
    getDeptList() {
      fetch.sysDeptList({}, { pageNum: 1, pageSize: 1000 }).then(res => {
        const { list = [] } = res.data;
        this.deptList = list;
      });
    },
    getRoleList() {
      fetch.sysRoleList({}, { pageNum: 1, pageSize: 1000 }).then(res => {
        const { list = [] } = res.data;
        this.roleList = list;
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
      const roleList = [];

      form.model.roleList.forEach(ele => {
        this.roleList.forEach(v => {
          if (ele == v.roleId) {
            roleList.push(v);
          }
        });
      });

      form.model.role = roleList.map(e => e.roleId).join(',');
      form.model.roleList = null;

      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.sysUserAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getUserList();
      });
      this.addModelCancel();
    },
    // 编辑
    editorClick(row, index) {
      const data = Object.assign({}, row);
      data.roleList = data.roleList.map(ele => ele.roleId);

      this.tableIndex = index;
      this.editorDisplay = true;
      this.editorModelData = data;
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      const form = this.$refs['alertEditorModelForm'];
      const roleList = [];

      form.model.roleList.forEach(ele => {
        this.roleList.forEach(v => {
          if (ele == v.roleId) {
            roleList.push(v);
          }
        });
      });

      form.model.role = roleList.map(e => e.roleId).join(',');
      form.model.roleList = null;

      this.checkFormSubmit(form, this.updateUserItem.bind(null, form.model));
    },
    updateUserItem(data) {
      this.editorDisplay = false;

      fetch.sysUserUpdate(data).then(({ msg }) => {
        this.getUserList();
        this.$message(msg);
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.tableData);
      table[this.tableIndex] = data;
      this.tableData = table;
    },
    deleteClick(row) {
      const { userId } = row;

      this.$confirm('确定删除吗')
        .then(() => {
          fetch.sysUserDelete({ userId }).then(({ msg }) => {
            this.currentPage = 1;
            this.getUserList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss' scoped>
.control-query {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .el-form {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .control-query-ops {
    border-bottom: 1px solid #eee;
  }
  .control-query-btns {
    margin-top: 10px;
    .el-button {
      margin-right: 50px;
    }
    text-align: center;
  }
}

.table-inner {
  height: 100%;
  overflow: auto;
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.page-model-pagination {
  padding: 10px 0;
}
</style>