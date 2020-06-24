<template>
  <div>
    <!-- <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="部门代码" prop="departcode">
            <el-input v-model="examine.departcode"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="departname">
            <el-input v-model="examine.departname"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='serial' label='部门编号' width="50"></el-table-column>
          <el-table-column prop='departname' label='部门名称' width="120"></el-table-column>
          <el-table-column prop='departcode' label='部门代码' width="100"></el-table-column>
          <el-table-column prop='level' label='部门级别' width="80"></el-table-column>
          <el-table-column prop='preserial' label='上级部门' width="80"></el-table-column>
          <el-table-column prop='valid' label='是否有效' width="80"></el-table-column>
          <el-table-column prop='creator' label='创建人' width="100"></el-table-column>
          <el-table-column prop='date' label='创建时间' width="220"></el-table-column>
          <el-table-column prop='regenerator' label='更新人' width="100"></el-table-column>
          <el-table-column prop='turnovertime' label='更新时间'></el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model> -->

    内容待添加
  </div>

</template>

<script>
const testData = {
  serial: '1',
  departname: '国银证宝',
  departcode: 'GZYB',
  level: '2',
  preserial: '0',
  valid: 'Y',
  creator: '创建人',
  date: '2015-12-22 6:08:54',
  regenerator: '管理员',
  turnovertime: '2015-12-22 6:08:54'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {
        departcode: '',
        departname: ''
      },
      display: false,
      editorModelData: {},
      tableData: new Array(5).fill(testData),
      paginationOps: {
        pageSizes: [5, 10, 15, 20],
        total: 100
      }
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {},
  methods: {
    editorModelCancel() {
      this.editorDisplay = false;
    },

    editorModelSubmit(c) {
      window.console.log(this.editorModelData);
      c();
    },
    editorClick(row) {
      this.display = true;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss' scoped>