<template>
  <!-- 财务管理 => 财务查询 => 商户余额 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="对账日期" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
        <el-button type="info" @click="allDownload">批量提现申请<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table ref="multipleTable" :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="name1" label="商户编号" min-width="120"></el-table-column>
          <el-table-column prop="name2" label="商户名称" min-width="100"></el-table-column>
          <el-table-column prop="name3" label="收款账号名" width="90"></el-table-column>
          <el-table-column prop="name4" label="提现银行卡号" width="120"></el-table-column>
          <el-table-column prop="name5" label="开户银行" width="120"></el-table-column>
          <el-table-column prop="name6" label="支行信息" width="120"></el-table-column>
          <el-table-column prop="name7" label="余额" width="120"></el-table-column>
          <el-table-column prop="name8" label="可用余额" min-width="100"></el-table-column>
          <el-table-column prop="name9" label="在途金额" min-width="100"></el-table-column>
          <el-table-column prop="name10" label="可结算金额" width="120"></el-table-column>
          <el-table-column prop="name11" label="在途结算金额" width="120"></el-table-column>
          <el-table-column prop="name12" label="冻结金额" width="120"></el-table-column>
          <el-table-column prop="name13" label="账户状态" width="80"></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="90">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">提现申请</el-button>
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

    <!-- 单笔提现界面 -->
    <el-dialog title="单笔提现界面" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="商户编号" required>
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="商户名称" required>
          <el-input disabled v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="可提现余额" required>
          <el-input disabled v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="提现方式" required>
          <el-select v-model="editorModelData.name4" placeholder="请选择">
            <el-option label="全部提现" value="1"></el-option>
            <el-option label="全部分提现" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name5" label="提现余额" required>
          <el-input disabled v-model="editorModelData.name5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查询流水 -->
    <el-dialog title="查询流水" :visible.sync="iquireDisplay" width="1000px">
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
            <el-table-column prop='name1' label='记账时间' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='对账ID' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='账户名称' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='业务类型' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='借方' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='借方金额' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='贷方' min-width="80"></el-table-column>
            <el-table-column prop='name1' label='贷方金额' min-width="80"></el-table-column>
          </el-table>
        </template>
      </page-model> -->

      后台数据异常，待写

      <div slot="footer" class="dialog-footer">
        <el-button @click="iquireModelCancel">取 消</el-button>
        <el-button type="primary" @click="iquireModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: 'P2018091318263700006',
  name2: '五洲餐饮',
  name3: '崔阳',
  name4: '6230580000150480221',
  name5: '平安银行深圳分行营业部',
  name6: '平安银行深圳分行营业部',
  name7: '33761002.20',
  name8: '33761002.20',
  name9: '0.00',
  name10: '17512293.00',
  name11: '0.00',
  name12: '0.00',
  name13: '可用'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      iquireModelData: {},
      iquireExamine: {},
      iquireTableData: [],
      tableData: new Array(10).fill(testData), //el-table使用了type=selection 使用fill渲染时，选中会选中所有，对接接口时，渲染真实数据即可解决
      multipleSelection: [],
      editorDisplay: false,
      editorModelData: {},
      iquireDisplay: false,
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
    },
    download() {
      this.$message('导出报表');
    },
    allDownload() {
      this.$message('批量导出报表');
    },
    handleSelectionChange(val) {
      window.console.log(val, 'val');
      // 选中的项
      this.multipleSelection = val;
    },
    editorClick(row) {
      this.editorDisplay = true;
      this.editorModelData = row;
      window.console.log(row);
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
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
    iquireGoToSearch() {
      window.console.log(this.iquireExamine, '查询');
    },
    iquireDownload() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss' scoped></style>