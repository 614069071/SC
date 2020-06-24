<template>
  <!-- 财务管理 => 财务查询 => 客户提现撤销列表 -->
  <div class="financial-query-revocation-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm1">
          <el-form-item label="七分钱提现流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="平台流水号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="撤销状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="提现撤销提交核心" value="1"></el-option>
              <el-option label="提现撤销成功" value="2"></el-option>
              <el-option label="提现撤销核心处理失败" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm2">
          <el-form-item label="客户手机" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="提现银行卡号" prop="name6">
            <el-input v-model="examine.name6"></el-input>
          </el-form-item>
          <el-form-item label="提现审请日期" prop="name9">
            <el-date-picker v-model="examine.name9" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
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
          <el-table-column prop='name1' label='七分钱提现流水号' min-width="120"></el-table-column>
          <el-table-column prop='name2' label='提现撤销关联流水号' min-width="140"></el-table-column>
          <el-table-column prop='name3' label='平台流水号' min-width="140"></el-table-column>
          <el-table-column prop='name4' label='客户手机' width="120"></el-table-column>
          <el-table-column prop='name5' label='收款名' width="80"></el-table-column>
          <el-table-column prop='name6' label='提现银行卡号' min-width="120"></el-table-column>
          <el-table-column prop='name7' label='提现金额' width="80"></el-table-column>
          <el-table-column prop='name8' label='提现申请时间' min-width="100"></el-table-column>
          <el-table-column prop='name9' label='状态' width="100"></el-table-column>
          <el-table-column prop='name10' label='备注' min-width="80"></el-table-column>

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

    <!-- 查看详情 审核信息 -->
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
        <el-form-item label="客户名" prop="name8">
          <el-input v-model="lookModelData.name8"></el-input>
        </el-form-item>
        <el-form-item label="支行信息" prop="name9">
          <el-input v-model="lookModelData.name9"></el-input>
        </el-form-item>
        <el-form-item label="收款名" prop="name10">
          <el-input v-model="lookModelData.name10"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="name11">
          <el-input v-model="lookModelData.name11"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="name12">
          <el-input v-model="lookModelData.name12"></el-input>
        </el-form-item>
        <el-form-item label="最后修改时间" prop="name13">
          <el-input v-model="lookModelData.name13"></el-input>
        </el-form-item>
        <el-form-item label="银行卡" prop="name14">
          <el-input v-model="lookModelData.name14"></el-input>
        </el-form-item>
        <el-form-item label="手续费" prop="name15">
          <el-input v-model="lookModelData.name15"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '2016071414305200200000003',
  name2: '2016071414445713800700000035',
  name3: 'TBREFUND0072016071414445729900001292',
  name4: '18033086950',
  name5: '依依',
  name6: '6222022102010988006',
  name7: '300.00',
  name8: '2016-07-14 14:30:52',
  name9: '提现撤销成',
  name10: ''
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
      lookModelData: {},
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
.financial-query-revocation-page {
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