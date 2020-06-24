<template>
  <!-- 金蝶 > 金蝶待付数据信息 -->
  <div class="finacial-kingdee-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm1">
          <el-form-item label="清算编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="业务编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="业务类型" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="个人提现" value="1"></el-option>
              <el-option label="商户结算" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务编号" prop="name4">
            <el-date-picker v-model="examine.name4" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm2">
          <el-form-item label="是否初期单据" prop="name5">
            <el-select v-model="examine.name5" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对账状态" prop="name6">
            <el-select v-model="examine.name6" placeholder="请选择">
              <el-option label="初始" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行处理状态" prop="name7">
            <el-select v-model="examine.name7" placeholder="请选择">
              <el-option label="空" value="0"></el-option>
              <el-option label="银行处理中" value="1"></el-option>
              <el-option label="银行交易成功" value="2"></el-option>
              <el-option label="银行交易失败" value="3"></el-option>
              <el-option label="银行交易未确认" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='清算编号'></el-table-column>
          <el-table-column prop='name2' label='业务类型'></el-table-column>
          <el-table-column prop='name3' label='业务编号'></el-table-column>
          <el-table-column prop='name4' label='业务日期'></el-table-column>
          <el-table-column prop='name5' label='是否期初单据'></el-table-column>
          <el-table-column prop='name6' label='写入日期'></el-table-column>
          <el-table-column prop='name7' label='交易提交状态'></el-table-column>
          <el-table-column prop='name8' label='返回信息'></el-table-column>
          <el-table-column prop='name9' label='对账状态'></el-table-column>
          <el-table-column prop='name10' label='银行处理状态'></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="lookClick(scope.row)">交易明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 交易明细 -->
    <el-dialog title="金蝶交易明细" :visible.sync="lookDisplay" width="800px">
      <el-form :model="lookModelData" disabled class="alert-model-form look-query-form" :inline="true" label-width="130px" :show-message="false">
        <el-form-item v-for="(item,index) in lookForData" :key="index" :prop="`name${index}`" :label="item">
          <el-input v-model="lookModelData[`name${index}`]"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '2042018091917254333900076681',
  name2: '商户结算',
  name3: '2018091910183906124400000390',
  name4: '2018-09-19',
  name5: 'false',
  name6: '2018-09-19',
  name7: '',
  name8: '',
  name9: '初始化',
  name10: '银行交易成功'
};

const lookForData = [
  '编号',
  '付款用途名称',
  '付款用途编码',
  '应付金额',
  '折后金额',
  '实付金额',
  '我方银行账号编码',
  '收款银行名称',
  '收款银行编码',
  '对方银行账号',
  '对方账户名称',
  '对方开户行',
  '联行号',
  '费用项目编码',
  '手续费',
  '手续费本位币'
];

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
      lookModelData: {},
      lookForData: lookForData,
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
    lookModelCancel() {
      this.lookDisplay = false;
    },
    lookClick(row) {
      this.lookDisplay = true;
      this.lookModelData = row;
    },
    lookModelSubmit() {
      window.console.log(this.lookModelData);
      this.lookDisplay = false;
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
.finacial-kingdee-page {
  .look-query-form {
    .el-form-item {
      width: 50%;
      margin-right: 0;
    }
  }

  .perform-btn {
    margin-left: 0;
  }
}
</style>