<template>
  <div>
    <!-- <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="收件时间" prop="name1">
            <el-date-picker v-model="examine.name1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="日志类型" prop="name2">
            <el-select v-model="examine.name2" placeholder="请选择">
              <el-option label="短信" value="1"></el-option>
              <el-option label="邮件" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>

          <el-form-item label="业务类型" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="注册验证" value="1"></el-option>
              <el-option label="登录密码找回验证" value="0"></el-option>
            </el-select>
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
          <el-table-column prop='name1' label='编号' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='标题' min-width="250"></el-table-column>
          <el-table-column prop='name3' label='类型' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='收件人' min-width="160"></el-table-column>
          <el-table-column prop='name5' label='发送时间' min-width="200"></el-table-column>
          <el-table-column prop='name6' label='发送状态' min-width="90"></el-table-column>
          <el-table-column prop='name7' label='日志编号' min-width="250"></el-table-column>
          <el-table-column prop='name8' label='业务类型' min-width="100"></el-table-column>
          <el-table-column prop='name9' label='发送主机' min-width="120"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
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
    交易汇总 内容待添加
  </div>

</template>

<script>
const testData = {
  name1: '2017082311462048500700000003',
  name2: '2017021611164400300000036',
  name3: '深圳市钱记到家投资有限公司-深圳市钱记到家投资有限公司',
  name4: '2017-02-17 01:16:45',
  name5: '29.94',
  name6: '0888286ad91b48fbb1e18eca98df1010',
  name7: 'M9144030035873982X0',
  name8: '余额支付',
  name9: '肖玲',
  name10: '2017-02-16 13:49:33',
  name11: '撤销成功',
  name12: '钱记到家测试',
  name13: '肖玲',
  name14: '审核通过',
  name15: '2017-02-16 13:49:37',
  name16: '请求报文流水号重复'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
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

<style lang='scss' scoped></style>