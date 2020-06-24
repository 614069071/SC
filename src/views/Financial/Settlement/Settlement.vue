<template>
  <!-- 财务管理 => 商户结算 -->
  <div class="financial-settlement-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="120px" :inline="true" ref="controlQueryForm1" class="control-query-ops-diy">
          <el-form-item label="编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="协议编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="金蝶清算编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="待确认" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="确认异常" value="3"></el-option>
              <el-option label="确认撤销异常" value="4"></el-option>
              <el-option label="发送金蝶" value="5"></el-option>
              <el-option label="发送金蝶成功" value="6"></el-option>
              <el-option label="金蝶付款成功" value="7"></el-option>
              <el-option label="金蝶付款失败" value="8"></el-option>
              <el-option label="确认撤销" value="9"></el-option>
              <el-option label="核销异常" value="10"></el-option>
              <el-option label="核销明确失败" value="11"></el-option>
              <el-option label="已核销" value="12"></el-option>
              <el-option label="废弃" value="13"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="120px" :inline="true" ref="controlQueryForm2" class="control-query-ops-diy">
          <el-form-item label="商户编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="结算申请编号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="是否T+0" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算金额是否为0" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="examine" label-width="120px" :inline="true" ref="controlQueryForm3">
          <el-form-item label="批次号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="执行日期" prop="name1">
            <el-date-picker v-model="examine.name1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
        <el-button type="info" @click="batchSettlement">批量结算<i class="el-icon-download"></i></el-button>
        <el-button type="info" @click="adjustAccounts">批量核销<i class="el-icon-download"></i></el-button>
        <el-button type="info" @click="unite">联合<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="(item,index) in tableForData" :key="index" :prop='index' :label='item.label' :width="item.width"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="performClick(scope.row)">执行</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 修改model -->
    <el-dialog title="任务修改" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name4" label="执行主机" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="是否开启" required>
          <el-select v-model="editorModelData.name5" placeholder="请选择">
            <el-option label="开启" value="1"></el-option>
            <el-option label="停止" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务删除 -->
    <el-dialog title="删除任务" :visible.sync="deleteDisplay" width="600px">
      <div class="dialog-deleted-content">您确定要删除该任务调度配置[8338]吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务执行 -->
    <el-dialog title="任务执行" :visible.sync="performDisplay" width="600px">
      <el-form :model="performModelData" :disabled="true" class="alert-model-form" label-width="100px">
        <el-form-item prop="name1" label="任务名称" required>
          <el-input v-model="performModelData.name1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="performModelCancel">取 消</el-button>
        <el-button type="primary" @click="performModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 日志内容 -->
    <el-dialog title="日志内容" :visible.sync="lookDisplay" width="600px">
      <div class="dialog-look-content">
        客户手机号码：13590385556 <br />
        客户建议留言：123456电风扇
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: 'app1',
  name2: '七分钱商户端app统计历史时报',
  name3: 'com.sevenpay.scheduler.jobs.platform.MasterJob',
  name4: '20 13 15 * * *',
  name5: '开启',
  name6: 'exception',
  name7: 'http://192.168.1.71:8080/servlet/countMerchantTradeHistoryHours',
  name8: '无灵通',
  name9: '2019-02-27 02:35:26',
  name10: '只执行一次，执行完之后状态改为关闭状态'
};

const tableForData = {
  name1: { label: '编号', width: '80' },
  name2: { label: '结算申请编号', width: '80' },
  name3: { label: '金蝶清算编号', width: '80' },
  name4: { label: '结算批次号', width: '80' },
  name5: { label: '商户编号', width: '80' },
  name6: { label: '商户名称', width: '80' },
  name7: { label: '开始日期', width: '80' },
  name8: { label: '结束日期', width: '80' },
  name9: { label: '协议编号', width: '80' },
  name10: { label: '收款笔数', width: '80' },
  name11: { label: '收款总额', width: '80' },
  name12: { label: '收款总费用', width: '80' },
  name13: { label: '撤销笔数', width: '80' },
  name14: { label: '撤销总额', width: '80' },
  name15: { label: '撤销总费用', width: '80' },
  name16: { label: '退款笔数', width: '80' },
  name17: { label: '总额', width: '80' },
  name18: { label: '退款总费用', width: '80' },
  name19: { label: '提现笔数', width: '80' },
  name20: { label: '提现总额', width: '80' },
  name21: { label: '提现总费用', width: '80' },
  name22: { label: '转入笔数', width: '80' },
  name23: { label: '转入总额', width: '80' },
  name24: { label: '转入总费用', width: '80' },
  name25: { label: '转出笔数', width: '80' },
  name26: { label: '转出总额', width: '80' },
  name27: { label: '转出总费用', width: '80' },
  name28: { label: '应收总额', width: '80' },
  name29: { label: '应付总额', width: '80' },
  name30: { label: '结算金额', width: '80' },
  name31: { label: '状态', width: '80' }
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      tableForData: tableForData,
      addDisplay: false,
      addModelData: {},
      editorDisplay: false,
      editorModelData: {},
      performDisplay: false, //执行
      performModelData: {},
      deleteDisplay: false, //任务删除
      lookDisplay: false,
      tableData: [] || new Array(5).fill(testData),
      multipleSelection: [],
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
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
    editorClick(row) {
      this.editorDisplay = true;
      this.editorModelData = row;
      window.console.log(row);
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
    deleteModelSubmit() {
      this.deleteDisplay = false;
    },
    deleteModelCancel(row) {
      this.deleteDisplay = false;
      window.console.log(row);
    },
    deleteClick(row) {
      this.deleteDisplay = true;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    download() {
      window.console.log('导出报表');
    },
    batchSettlement() {
      window.console.log('批量结算');
    },
    adjustAccounts() {
      window.console.log('批量核销');
    },
    unite() {
      window.console.log('联合');
    },
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    },
    handleSelectionChange(val) {
      window.console.log(val, 'val');
      // 选中的项
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang='scss'>
.financial-settlement-page {
  .control-query-ops-diy {
    .el-input__inner {
      width: 193px;
    }
  }
}
</style>