<template>
  <!-- 财务管理 > 对账汇总（V2） -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="平台订单号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="渠道订单号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="交易类型" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option value="1" label="支付"></el-option>
              <el-option value="0" label="退款"></el-option>
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
          <!-- 对账日期 交易渠道 对账总笔数 对账总金额 成功笔数 成功总金额 掉单笔数 掉单总金额 丢单笔数 丢单总金额 操作 -->
          <el-table-column prop='name1' label='对账日期'></el-table-column>
          <el-table-column prop='name2' label='交易渠道'></el-table-column>
          <el-table-column prop='name3' label='对账总笔数'>
            <!-- 部分需要可点击，实际根据接口数据来 -->
            <template slot-scope="scope">
              <el-button type="text" @click="lookClick(scope.row)">{{scope.row.name3}}123</el-button>
            </template>
          </el-table-column>
          <el-table-column prop='name4' label='对账总金额'></el-table-column>
          <el-table-column prop='name5' label='成功笔数'></el-table-column>
          <el-table-column prop='name6' label='成功总金额'></el-table-column>
          <el-table-column prop='name7' label='掉单笔数'></el-table-column>
          <el-table-column prop='name8' label='掉单总金额'></el-table-column>
          <el-table-column prop='name9' label='丢单笔数'></el-table-column>
          <el-table-column prop='name10' label='丢单总金额'></el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 对账详情 -->
    <el-dialog title="对账详情（V2）" :visible.sync="lookDisplay" width="90%">
      <page-model>
        <template slot="controlQueryOps">
          <el-form :model="lookExamine" label-width="86px" :inline="true" ref="controlQueryForm">
            <el-form-item label="平台订单号" prop="name1">
              <el-input v-model="lookExamine.name1"></el-input>
            </el-form-item>
            <el-form-item label="渠道订单号" prop="name2">
              <el-input v-model="lookExamine.name2"></el-input>
            </el-form-item>
            <el-form-item label="交易类型" prop="name4">
              <el-select v-model="lookExamine.name4" placeholder="请选择">
                <el-option value="1" label="支付"></el-option>
                <el-option value="0" label="退款"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>

        <template slot="controlQueryBtns">
          <el-button type="primary" @click="lookGoToSearch">查询<i class="el-icon-search"></i> </el-button>
          <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
          <el-button type="primary" @click="download">导出报表<i class="el-icon-download"></i> </el-button>
        </template>

        <template slot="tableInner">
          <el-table :data="tableDataV2" border>
            <!-- 平台订单号 交易类型 服务商号 商户号 商户名称 渠道 渠道订单号 交易金额 渠道手续费 交易手续费 划款金额 退款原订单号 订单创建时间 订单完成时间 对账结果 对账日期 -->
            <el-table-column prop='name1' label='平台订单号'></el-table-column>
            <el-table-column prop='name2' label='交易类型'></el-table-column>
            <el-table-column prop='name3' label='服务商号'></el-table-column>
            <el-table-column prop='name4' label='商户号'></el-table-column>
            <el-table-column prop='name5' label='商户名称'></el-table-column>
            <el-table-column prop='name6' label='渠道'></el-table-column>
            <el-table-column prop='name7' label='渠道订单号'></el-table-column>
            <el-table-column prop='name8' label='交易金额'></el-table-column>
            <el-table-column prop='name9' label='渠道手续费'></el-table-column>
            <el-table-column prop='name10' label='交易手续费'></el-table-column>
            <el-table-column prop='name11' label='划款金额'></el-table-column>
            <el-table-column prop='name12' label='退款原订单号'></el-table-column>
            <el-table-column prop='name13' label='订单创建时间'></el-table-column>
            <el-table-column prop='name14' label='订单完成时间'></el-table-column>
            <el-table-column prop='name15' label='对账结果'></el-table-column>
            <el-table-column prop='name16' label='对账日期'></el-table-column>
          </el-table>
        </template>

        <template slot="pageModelPagination">
          <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOpsV2.pageSizes" :total="paginationOpsV2.total">
          </el-pagination>
        </template>
      </page-model>

      <div slot="footer" class="dialog-footer">
        <el-button @click="lookModelCancel">取 消</el-button>
        <el-button type="primary" @click="lookModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '讯联支付',
  name2: '0',
  name3: '0.00',
  name4: '0',
  name5: '0.00',
  name6: '0',
  name7: '0.00',
  name8: '0',
  name9: '0.00',
  name10: '2018-11-12'
};

const testDataV2 = {
  name1: '19120722160448050',
  name2: '支付	',
  name3: '501584553110001	',
  name4: '95011888	',
  name5: '',
  name6: '讯联支付	',
  name7: '2019120722001407825746720073	',
  name8: '15.00	',
  name9: '0.04	',
  name10: '0.05	',
  name11: '14.95	',
  name12: '',
  name13: '2019-12-08 12:16:04	',
  name14: '2019-12-08 12:16:08	',
  name15: '丢单	',
  name16: '2019-12-07'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookExamine: {},
      lookDisplay: false,
      lookModelData: {},
      tableData: new Array(5).fill(testData),
      tableDataV2: new Array(5).fill(testDataV2),
      paginationOps: {
        pageSizes: [5, 10, 15, 20],
        total: 100
      },
      paginationOpsV2: {
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
    //查询
    goToSearch() {
      window.console.log(this.examine, '查询');
    },
    download() {
      this.$message('导出报表');
    },
    lookGoToSearch() {
      window.console.log(this.lookExamine, '查询');
    },
    lookClick(row) {
      this.lookDisplay = true;
      this.lookModelData = row;
      window.console.log(row);
    },
    lookModelSubmit() {
      this.lookDisplay = false;
    },
    lookModelCancel() {
      this.lookDisplay = false;
    }
  }
};
</script>

<style lang='scss'>
.reconcilia-tips {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #777;
  text-align: left;
}
</style>