<template>
  <!-- 实名认证 > 实名认证文件列表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="文件类型" prop="name1">
            <el-select v-model="examine.name1" placeholder="请选择">
              <el-option label="请求文件" value="0"></el-option>
              <el-option label="返回文件" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文件类型" prop="name1">
            <el-date-picker v-model="examine.name2" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <!-- 文件编号 上传日期 文件名 存储路径 文件类型 总记录数 文件状态 写入日期 数据日期 返回编号 写入时间 备注 -->
          <el-table-column prop='name1' label='文件编号' min-width="140"></el-table-column>
          <el-table-column prop='name2' label='上传日期' min-width="140"></el-table-column>
          <el-table-column prop='name3' label='文件名' width="200"></el-table-column>
          <el-table-column prop='name4' label='存储路径' width="170"></el-table-column>
          <el-table-column prop='name5' label='文件类型' width="100"></el-table-column>
          <el-table-column prop='name6' label='总记录数' width="80"></el-table-column>
          <el-table-column prop='name7' label='文件状态' width="80"></el-table-column>
          <el-table-column prop='name8' label='写入日期' width="100"></el-table-column>
          <el-table-column prop='name9' label='数据日期' width="90"></el-table-column>
          <el-table-column prop='name10' label='返回编号' min-width="100"></el-table-column>
          <el-table-column prop='name11' label='写入时间' min-width="150"></el-table-column>
          <el-table-column prop='name12' label='备注' min-width="80"></el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>
  </div>
</template>

<script>
const testData = {
  name1: '2016122619043745300100000001',
  name2: '2016-12-26	',
  name3: '20161226190437452.txt.INVALID-20161226195634	',
  name4: '/data/nfsshare/upload/identity/20161225	',
  name5: '请求文件',
  name6: '1367',
  name7: '无效',
  name8: '2016-12-26	',
  name9: '20161225',
  name10: '2016-12-27 09:04:39',
  name11: '73ba53d3d1e14e7699fd8e644c7bb1fd',
  name12: ''
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
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
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    }
  }
};
</script>

<style lang='scss' scoped></style>