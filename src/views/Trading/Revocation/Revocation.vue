<template>
  <!-- 交易管理 => 交易撤销 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="110px" :inline="true" ref="controlQueryForm">
          <el-form-item label="撤销流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="原交易订单号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="撤销申请时间" prop="name3">
            <el-date-picker v-model="examine.name3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户账号" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增申请<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>
      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='订单号' min-width="100"></el-table-column>
          <el-table-column prop='name2' label='原交易订单号' min-width="100"></el-table-column>
          <el-table-column prop='name3' label='原交易订单名称' min-width="110"></el-table-column>
          <el-table-column prop='name4' label='原交易时间' min-width="100"></el-table-column>
          <el-table-column prop='name5' label='交易金额' min-width="80"></el-table-column>
          <el-table-column prop='name6' label='客户账号' min-width="110"></el-table-column>
          <el-table-column prop='name7' label='商户账号' min-width="110"></el-table-column>
          <el-table-column prop='name8' label='原交易类型' min-width="90"></el-table-column>
          <el-table-column prop='name9' label='申请人' min-width="70"></el-table-column>
          <el-table-column prop='name10' label='申请时间' min-width="100"></el-table-column>
          <el-table-column prop='name11' label='状态' min-width="80"></el-table-column>
          <el-table-column prop='name12' label='撤销描述信息' min-width="120"></el-table-column>
          <el-table-column prop='name13' label='审核人' min-width="70"></el-table-column>
          <el-table-column prop='name14' label='审核状态' min-width="100"></el-table-column>
          <el-table-column prop='name15' label='审核时间' min-width="100"></el-table-column>
          <el-table-column prop='name16' label='备注' min-width="100"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <!-- 对接，根据字段来判断显示 -->
              <el-button v-if="scope.flag" type="text" size="small" @click="performClick(scope.row)">审核</el-button>
              <el-button v-if="!scope.flag" type="text" size="small" @click="performClick(scope.row)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 交易撤销新增申请 -->
    <el-dialog title="交易撤销新增申请" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="原交易订单号">
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="撤销原因">
          <el-input type="textarea" v-model="addModelData.name8"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取消</el-button>
        <el-button type="primary" @click="addModelSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!-- 任务执行 -->
    <el-dialog title="任务执行" :visible.sync="performDisplay" width="600px">
      <el-form :model="performModelData" class="alert-model-form" label-width="120px">
        <el-form-item prop="name1" label="订单号" required>
          <el-input disabled v-model="performModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="原交易订单号" required>
          <el-input disabled v-model="performModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="原交易名称" required>
          <el-input disabled v-model="performModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="原交易时间" required>
          <el-input disabled v-model="performModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="商户账号" required>
          <el-input disabled v-model="performModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="撤销金额" required>
          <el-input disabled v-model="performModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="撤销原因" required>
          <el-input disabled v-model="performModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="钱记到家测试" required>
          <el-input disabled v-model="performModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="创建人" required>
          <el-input disabled v-model="performModelData.name8"></el-input>
        </el-form-item>
        <el-form-item prop="name9" label="创建时间" required>
          <el-input disabled v-model="performModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name12" label="审核状态" required>
          <el-select v-model="performModelData.name12">
            <el-option peop="1" value="审核通过"></el-option>
            <el-option peop="0" value="审核不通过"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="performModelCancel">取 消</el-button>
        <el-button type="primary" @click="performModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
      addDisplay: false,
      addModelData: {},
      performDisplay: false,
      performModelData: {},
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
    addModelSubmit() {
      this.$refs['alertAddModelForm'].validate((files, object) => {
        if (files) {
          // 验证通过 发送请求添加数据到数据库
          this.addDisplay = false;
        } else {
          const keys = Object.keys(object);
          this.$message.error(`${keys[0]}不可为空`);
        }
      });
      window.console.log(this.addModelData);
    },
    addModelCancel() {
      this.addDisplay = false;
      // this.resetFormFields('alertAddModelForm');
    },
    performModelCancel() {
      this.performDisplay = false;
    },
    performModelSubmit() {
      window.console.log(this.performModelData);
      this.performDisplay = false;
    },
    performClick(row) {
      this.performDisplay = true;
      this.performModelData = row;
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