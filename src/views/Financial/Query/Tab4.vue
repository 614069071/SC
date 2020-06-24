<template>
  <!-- 财务管理 => 财务查询 => 用户余额 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="客户手机" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
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
          <el-table-column prop='name1' label='客户手机' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='用户名称' min-width="80"></el-table-column>
          <el-table-column prop='name3' label='余额' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='可用余额' min-width="80"></el-table-column>
          <el-table-column prop='name5' label='冻结余额' min-width="80"></el-table-column>
          <el-table-column prop='name6' label='在途余额' min-width="80"></el-table-column>
          <el-table-column prop='name7' label='创建时间' min-width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="inquireClick(scope.row)">查询流水</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 汇总余额流水查询 -->
    <el-dialog title="汇总余额流水查询" :visible.sync="iquireDisplay" width="1000px">
      后台页面异常，待写
      <!-- <page-model>
        <template slot="controlQueryOps">
          <el-form :model="iquireExamine" label-width="86px" ref="iquireControlQueryForm">
            <el-form-item label="记账日期" prop="name1">
              <el-date-picker v-model="iquireExamine.name1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务类型" prop="name4">
              <el-select v-model="iquireExamine.name4" placeholder="请选择">
                <el-option value='ONL_TO_SEV' label='网银入账七分钱'></el-option>
                <el-option value='CAD_TO_SEV' label='快捷支付至七分钱'></el-option>
                <el-option value='SEV_TO_CAD' label='七分钱至银行卡'></el-option>
                <el-option value='SEV_TO_SEV' label='七分钱至七分钱'></el-option>
                <el-option value='SEV_TO_QFB' label='七分钱至七分宝'></el-option>
                <el-option value='QFB_TO_SEV' label='七分宝至七分钱'></el-option>
                <el-option value='FREEZE' label='冻结'></el-option>
                <el-option value='CHARGE' label='七分钱到手续费cgl'></el-option>
                <el-option value='SEV_TO_SEV1' label='七分钱至七分钱担保'></el-option>
                <el-option value='SEV1_TO_SEV' label='七分钱担保至七分钱'></el-option>
                <el-option value='SEV_TO_SEV2' label='七分钱至七分钱费用'></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <template slot="controlQueryBtns">
          <el-button type="primary" @click="iquireGoToSearch">查询<i class="el-icon-search"></i> </el-button>
          <el-button type="warning" @click="$refs['iquireControlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
          <el-button type="info" @click="iquireDownload">导出报表<i class="el-icon-download"></i></el-button>
        </template>
        <template slot="tableInner">
          <el-table :data="iquireTableData" border>
            <el-table-column prop='name1' label='客户手机' min-width="80"></el-table-column>
            <el-table-column prop='name2' label='用户名称' min-width="80"></el-table-column>
            <el-table-column prop='name3' label='余额' min-width="80"></el-table-column>
            <el-table-column prop='name4' label='可用金额' min-width="80"></el-table-column>
            <el-table-column prop='name5' label='冻结金额' min-width="80"></el-table-column>
            <el-table-column prop='name6' label='在途金额' min-width="80"></el-table-column>
            <el-table-column prop='name7' label='创建时间' min-width="80"></el-table-column>
          </el-table>
        </template>
      </page-model> -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="iquireModelCancel">取 消</el-button>
        <el-button type="primary" @click="iquireModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '18218149023',
  name2: '张四',
  name3: '5015.90',
  name4: '5015.90',
  name5: '0.00',
  name6: '0.00',
  name7: '2016-06-28 15:04:33'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      iquireDisplay: false,
      iquireModelData: {},
      iquireExamine: {},
      iquireTableData: [],
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
    iquireModelCancel() {
      this.iquireDisplay = false;
    },
    iquireModelSubmit() {
      window.console.log(this.iquireModelData);
      this.iquireDisplay = false;
    },
    inquireClick(row) {
      this.iquireDisplay = true;
      this.iquireModelData = row;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    iquireGoToSearch() {
      window.console.log(this.iquireExamine, '查询');
    },
    download() {
      this.$message('导出报表');
    },
    iquireDownload() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss' scoped></style>