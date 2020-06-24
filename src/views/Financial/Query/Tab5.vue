<template>
  <!-- 财务管理 => 财务查询 => 客户提现结算 -->
  <div class="financial-query-client-page ">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm1">
          <el-form-item label="七分钱提现流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="平台流水号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="客户手机" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="待审核" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="审核不通过" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm2">
          <el-form-item label="提现银行卡号" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="金蝶清算编号" prop="name6">
            <el-input v-model="examine.name6"></el-input>
          </el-form-item>
          <el-form-item label="关联流水号" prop="name7">
            <el-input v-model="examine.name7"></el-input>
          </el-form-item>
          <el-form-item label="核销状态" prop="name8">
            <el-select v-model="examine.name8" placeholder="请选择">
              <el-option label="未核销" value="1"></el-option>
              <el-option label="已核销" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm3">
          <el-form-item label="提现审核日期" prop="name9">
            <el-date-picker v-model="examine.name9" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="提现申请日期" prop="name10">
            <el-date-picker v-model="examine.name10" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="resetFormFiles">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column v-for="(item,index) in tableForData" :key="index" :prop='`name${index}`' :label='item' min-width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查询详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 审核信息 -->
    <el-dialog title="审核信息" :visible.sync="lookDisplay" width="900px">
      <el-form :model="lookModelData" disabled label-width="130px" :inline="true" ref="lookQueryForm" class="look-query-form">
        <el-form-item label="七分钱提现流水号" prop="name1">
          <el-input v-model="lookModelData.name1"></el-input>
        </el-form-item>
        <el-form-item label="提现金额" prop="name2">
          <el-input v-model="lookModelData.name2"></el-input>
        </el-form-item>
        <el-form-item label="平台流水号" prop="name3">
          <el-input v-model="lookModelData.name3"></el-input>
        </el-form-item>
        <el-form-item label="提现银行卡编号" prop="name4">
          <el-input v-model="lookModelData.name4"></el-input>
        </el-form-item>
        <el-form-item label="客户手机" prop="name5">
          <el-input v-model="lookModelData.name5"></el-input>
        </el-form-item>
        <el-form-item label="提现申请时间" prop="name6">
          <el-input v-model="lookModelData.name6"></el-input>
        </el-form-item>
        <el-form-item label="客户名" prop="name7">
          <el-input v-model="lookModelData.name7"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="name8">
          <el-select v-model="examine.name8" placeholder="请选择">
            <el-option label="待审核" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核不通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款名" prop="name9">
          <el-input v-model="lookModelData.name9"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="name10">
          <el-input v-model="lookModelData.name10"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="name11">
          <el-input v-model="lookModelData.name11"></el-input>
        </el-form-item>
        <el-form-item label="审核时间" prop="name12">
          <el-input v-model="lookModelData.name12"></el-input>
        </el-form-item>
        <el-form-item label="支行信息" prop="name13">
          <el-input v-model="lookModelData.name13"></el-input>
        </el-form-item>
        <el-form-item label="核销状态" prop="name14">
          <el-select v-model="examine.name14" placeholder="请选择">
            <el-option label="未核销" value="1"></el-option>
            <el-option label="已核销" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行卡" prop="name15">
          <el-input v-model="lookModelData.name15"></el-input>
        </el-form-item>
        <el-form-item label="核销人" prop="name16">
          <el-input v-model="lookModelData.name16"></el-input>
        </el-form-item>
        <el-form-item label="手续费" prop="name17">
          <el-input v-model="lookModelData.name17"></el-input>
        </el-form-item>
        <el-form-item label="核销时间" prop="name18">
          <el-input v-model="lookModelData.name18"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name0: '2017070313261900200000001',
  name1: '2017070416434565800100003726',
  name2: 'TBPAYMENT0012017070313261938600019530',
  name3: '0012017070416452003600002713',
  name4: '15372402030',
  name5: '熊碧波',
  name6: '6226220623741013',
  name7: '1.00',
  name8: '2017-07-03 13:26:19',
  name9: '审核通过',
  name10: '2017-07-04 16:43:45',
  name11: '提现成功',
  name12: '已核销'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
      lookModelData: {},
      tableForData: [
        '七分钱提现流水号',
        '关联流水号',
        '平台流水号',
        '金蝶清算编号',
        '客户手机',
        '收款名',
        '提现银行卡号',
        '提现金额',
        '提现申请日期',
        '审核状态',
        '审核时间',
        '提现状态',
        '核销状态'
      ],
      tableData: new Array(10).fill(testData),
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
    resetFormFiles() {
      this.$refs['controlQueryForm1'].resetFields();
      this.$refs['controlQueryForm2'].resetFields();
      this.$refs['controlQueryForm3'].resetFields();
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
    }
  }
};
</script>

<style lang='scss'>
.financial-query-client-page {
  .look-query-form {
    .el-form-item {
      width: 50%;
      margin-right: 0;
    }
    .el-form-item__content {
      width: 300px;
    }
  }

  .perform-btn {
    margin-left: 0;
  }
}
</style>