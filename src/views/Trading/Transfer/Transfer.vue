<template>
  <!-- 交易管理 => 客户转账 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm1">
          <el-form-item label="七分钱订单号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="交广科技订单号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="付方客户手机号" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
          <el-form-item label="订单开始日期" prop="name3">
            <el-date-picker v-model="examine.name3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm2">
          <el-form-item label="付方客户名称" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="收方客户手机号" prop="name6">
            <el-input v-model="examine.name6"></el-input>
          </el-form-item>
          <el-form-item label="收方客户名称	" prop="name7">
            <el-input v-model="examine.name7"></el-input>
          </el-form-item>
          <el-form-item label="账期" prop="name9">
            <el-date-picker v-model="examine.name9" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm3" class="el-form-diy">
          <el-form-item label="订单状态" prop="name8">
            <el-select v-model="examine.name8" placeholder="请选择">
              <el-option label="成功" value="1"></el-option>
              <el-option label="待提交" value="0"></el-option>
              <el-option label="提交核心" value="0"></el-option>
              <el-option label="提交处理中" value="0"></el-option>
              <el-option label="失败" value="0"></el-option>
              <el-option label="未明" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型" prop="name10">
            <el-select v-model="examine.name10" placeholder="请选择">
              <el-option label="转账七分钱" value="1"></el-option>
              <el-option label="红包入账" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="resetFormFileds">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='七分钱订单号' min-width="130"></el-table-column>
          <el-table-column prop='name2' label='交广科技订单号' min-width="180"></el-table-column>
          <el-table-column prop='name3' label='订单名称' min-width="100"></el-table-column>
          <el-table-column prop='name4' label='订单描述' min-width="80"></el-table-column>
          <el-table-column prop='name5' label='付方客户手机号' min-width="120"></el-table-column>
          <el-table-column prop='name6' label='付方客户名称' min-width="100"></el-table-column>
          <el-table-column prop='name7' label='收方客户手机号' min-width="120"></el-table-column>
          <el-table-column prop='name8' label='收方客户名称' min-width="100"></el-table-column>
          <el-table-column prop='name9' label='订单开始时间' min-width="100"></el-table-column>
          <el-table-column prop='name10' label='订单金额' min-width="90"></el-table-column>
          <el-table-column prop='name11' label='订单状态' min-width="80"></el-table-column>
          <el-table-column prop='name12' label='账期' min-width="90"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 订单预览 -->
    <el-dialog title="订单预览" :visible.sync="lookDisplay" width="900px">
      <el-form :model="lookModelData" disabled label-width="110px" :inline="true" ref="lookQueryForm" class="look-query-form">
        <el-form-item label="订单名称" prop="name1">
          <el-input v-model="lookModelData.name1"></el-input>
        </el-form-item>
        <el-form-item label="订单描述" prop="name2">
          <el-input v-model="lookModelData.name2"></el-input>
        </el-form-item>
        <el-form-item label="七分钱订单号:" prop="name3">
          <el-input v-model="lookModelData.name3"></el-input>
        </el-form-item>
        <el-form-item label="交广科技订单号" prop="name4">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item label="付方客户手机号" prop="name5">
          <el-input v-model="lookModelData.name5"></el-input>
        </el-form-item>
        <el-form-item label="付方客户名称" prop="name5">
          <el-input v-model="lookModelData.name5"></el-input>
        </el-form-item>
        <el-form-item label="收方客户手机号" prop="name6">
          <el-input v-model="lookModelData.name6"></el-input>
        </el-form-item>
        <el-form-item label="付方客户名称" prop="name7">
          <el-input v-model="lookModelData.name7"></el-input>
        </el-form-item>
        <el-form-item label="订单开始日期" prop="name8">
          <el-input v-model="lookModelData.name8"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="name9">
          <el-input v-model="lookModelData.name9"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="name10">
          <el-input v-model="lookModelData.name10"></el-input>
        </el-form-item>
        <el-form-item label="账期" prop="name11">
          <el-input v-model="lookModelData.name11"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
const testData = {
  name1: '2018011711314100300000002',
  name2: 'TBTRANSFER0072018011711314225200012331',
  name3: '转帐到七分钱',
  name4: '转帐',
  name5: '15989791023',
  name6: '邱测试',
  name7: '13691836913',
  name8: '测2',
  name9: '2018-01-18 01:31:42',
  name10: '5.00',
  name11: '成功',
  name12: '20180117'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
      lookModelData: {},
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
    lookModelCancel() {
      this.lookDisplay = false;
    },

    lookModelSubmit(c) {
      window.console.log(this.lookModelData);
      c();
    },
    lookClick(row) {
      this.lookDisplay = true;
      this.lookModelData = row;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    download() {
      // 新增
      this.$message('导出报表');
    },
    resetFormFileds() {
      this.$refs['controlQueryForm1'].resetFields();
      this.$refs['controlQueryForm2'].resetFields();
      this.$refs['controlQueryForm3'].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.look-query-form {
  .el-form-item {
    width: 50%;
    margin-right: 0;
  }
  .el-form-item__content {
    width: 300px;
  }
}
</style>