<template>
  <!-- 页面model组件 -->
  <div class='page-model'>
    <!-- 查询 -->
    <div class="control-query">
      <!-- 查询选项 -->
      <div class="control-query-ops">
        <slot name="controlQueryOps">
          <!-- <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="真实姓名" prop="username">
            <el-input v-model="examine.username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="depart">
            <el-select v-model="examine.depart" placeholder="请选择部门">
              <el-option label="(GYZB)-国银证保" value="1"></el-option>
              <el-option label="(TECH)-信息技术部" value="2"></el-option>
              <el-option label="(OPER)-运营管理部" value="4"></el-option>
              <el-option label="(FINA)-财务部" value="5"></el-option>
              <el-option label="(CPB)-产品部" value="6"></el-option>
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
        </el-form> -->
        </slot>
      </div>
      <!-- 按钮组 -->
      <div class="control-query-btns">
        <slot name="controlQueryBtns">
          <!-- <el-button type="primary">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info">新增<i class="el-icon-circle-plus-outline"></i></el-button> -->
        </slot>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-inner">
      <slot name="tableInner">
        <!-- <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="serial" width="50" label="编号"></el-table-column>
          <el-table-column prop="employee" width="120" label="员工编号"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="industry" width="150" label="部门名称"></el-table-column>
          <el-table-column prop="sex" width="50" label="性别"></el-table-column>
          <el-table-column prop="phone" width="220" label="个人电话"></el-table-column>
          <el-table-column prop="status" width="100" label="状态"></el-table-column>
          <el-table-column prop="creator" width="120" label="创建人"></el-table-column>
          <el-table-column prop="date" label="创建时间" width="220"></el-table-column>
          <el-table-column prop="regenerator" label="更新人" width="150"></el-table-column>
          <el-table-column prop="turnovertime" label="更新时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table> -->
      </slot>
    </div>

    <!-- 分页 -->
    <div class="page-model-pagination">
      <slot name="pageModelPagination">
        <!-- <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]" :total="100">
      </el-pagination> -->
      </slot>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.page-model {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.control-query {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .el-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: space-around;
  }
  .el-form-item {
    margin-bottom: 10px;
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
  .el-pagination {
    padding: 10px 0;
  }
}
</style>