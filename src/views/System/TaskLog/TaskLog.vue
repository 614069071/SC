<template>
  <!-- 系统管理 => 任务调度日志 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="80px" :inline="true" ref="controlQueryForm">
          <el-form-item label="执行日期" prop="name1">
            <el-date-picker v-model="examine.name1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="执行状态" prop="name2">
            <el-select v-model="examine.name2" placeholder="请选择">
              <el-option label="执行中" value="1"></el-option>
              <el-option label="成功" value="2"></el-option>
              <el-option label="失败" value="3"></el-option>
              <el-option label="参数为空" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="触发类型" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="手动" value="1"></el-option>
              <el-option label="自动" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='执行日期' min-width="100"></el-table-column>
          <el-table-column prop='name2' label='任务名称' min-width="120"></el-table-column>
          <el-table-column prop='name3' label='任务参数' min-width="300"></el-table-column>
          <el-table-column prop='name4' label='执行主机名' min-width="100"></el-table-column>
          <el-table-column prop='name5' label='执行开始时间' min-width="160"></el-table-column>
          <el-table-column prop='name6' label='执行结束时间' min-width="160"></el-table-column>
          <el-table-column prop='name7' label='执行状态' min-width="80"></el-table-column>
          <el-table-column prop='name8' label='触发类型' min-width="80"></el-table-column>
          <el-table-column prop='name9' label='详细描述' min-width="140"></el-table-column>
          <el-table-column prop='name10' label='执行人' min-width="80"></el-table-column>
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
  name1: '2019-12-02',
  name2: '迅联渠道对账',
  name3:
    'http://127.0.0.1:5002/servlet/checkV2/checkChannelTypeServlet?channelType=XL_PAY',
  name4: 'app1',
  name5: '2019-12-03 06:00:00',
  name6: '2019-12-03 06:00:00	',
  name7: '失败',
  name8: '自动',
  name9: 'java.lang.NullPointerException',
  name10: '司马东西'
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