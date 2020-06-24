<template>
  <!-- 交易管理 => 商户转账 -->
  <div class="merchants-bank-transfer-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm1">
          <el-form-item label="七分钱订单号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="付方商户编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="付方商户名称" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm2">
          <el-form-item label="收方商户编号" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
          <el-form-item label="收方商户名称" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="name6">
            <el-select v-model="examine.name6" placeholder="请选择">
              <el-option label="成功" value="1"></el-option>
              <el-option label="待提交" value="0"></el-option>
              <el-option label="提交核心" value="0"></el-option>
              <el-option label="提交处理中" value="0"></el-option>
              <el-option label="失败" value="0"></el-option>
              <el-option label="取消" value="0"></el-option>
              <el-option label="未明" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm3" class="el-form-diy">
          <el-form-item label="订单开始日期" prop="name7">
            <el-date-picker v-model="examine.name7" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="订单结束日期" prop="name8">
            <el-date-picker v-model="examine.name8" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="账期" prop="name9">
            <el-date-picker v-model="examine.name9" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
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
          <el-table-column prop='name2' label='订单名称' min-width="120"></el-table-column>
          <el-table-column prop='name3' label='订单描述' min-width="100"></el-table-column>
          <el-table-column prop='name4' label='付方商户编号' min-width="110"></el-table-column>
          <el-table-column prop='name5' label='付方商户名称' min-width="130"></el-table-column>
          <el-table-column prop='name6' label='收方商户编号' min-width="110"></el-table-column>
          <el-table-column prop='name7' label='收方商户名称' min-width="110"></el-table-column>
          <el-table-column prop='name8' label='订单开始时间' min-width="100"></el-table-column>
          <el-table-column prop='name9' label='订单金额' min-width="80"></el-table-column>
          <el-table-column prop='name10' label='订单状态' min-width="80"></el-table-column>
          <el-table-column prop='name11' label='账期' min-width="100"></el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
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
        <el-form-item label="七分钱订单号" prop="name2">
          <el-input v-model="lookModelData.name2"></el-input>
        </el-form-item>
        <el-form-item label="付方商户编号" prop="name3">
          <el-input v-model="lookModelData.name3"></el-input>
        </el-form-item>
        <el-form-item label="付方商户名称" prop="name4">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item label="收方商户编号" prop="name5">
          <el-input v-model="lookModelData.name5"></el-input>
        </el-form-item>
        <el-form-item label="收方商户名称" prop="name5">
          <el-input v-model="lookModelData.name5"></el-input>
        </el-form-item>
        <el-form-item label="订单开始日期" prop="name6">
          <el-input v-model="lookModelData.name6"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="name7">
          <el-input v-model="lookModelData.name7"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="name8">
          <el-input v-model="lookModelData.name8"></el-input>
        </el-form-item>
        <el-form-item label="账期" prop="name9">
          <el-input v-model="lookModelData.name9"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '2017090310412400300000007',
  name2: '转帐到七分钱',
  name3: '电影票一张',
  name4: 'M9144030035873982X0',
  name5: '深圳市钱记到家投资有限公司',
  name6: 'M9144030035873982X1',
  name7: '深圳市钱钱投资有限公司',
  name8: '2017-09-03 23:43:09',
  name9: '1.00',
  name10: '成功',
  name11: '20170903'
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
      this.looklookDisplay = false;
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
.merchants-bank-transfer-page {
  .el-input {
    .el-input__inner {
      width: 193px;
    }
  }
}
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