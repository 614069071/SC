<template>
  <!-- 聚合支付 => 产品渠道 => 渠道路由 -->
  <div class="aggregate-router-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="渠道名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道类型" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='编号' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='渠道名称' min-width="80"></el-table-column>
          <el-table-column prop='name3' label='支付渠道类型' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='网关类型' min-width="80"></el-table-column>
          <el-table-column prop='name5' label='计费方式' min-width="80"></el-table-column>
          <el-table-column prop='name6' label='费率' min-width="80"></el-table-column>
          <el-table-column prop='name7' label='交易最小限度' min-width="80"></el-table-column>
          <el-table-column prop='name8' label='交易最大额度' min-width="80"></el-table-column>
          <el-table-column prop='name9' label='支持卡种' min-width="80"></el-table-column>
          <el-table-column prop='name10' label='权重' min-width="80"></el-table-column>
          <el-table-column prop='name11' label='状态' min-width="80"></el-table-column>
          <el-table-column prop='name12' label='累计发送次数' min-width="80"></el-table-column>
          <el-table-column prop='name13' label='累计失败次数' min-width="80"></el-table-column>
          <el-table-column prop='name14' label='备注' min-width="80"></el-table-column>
          <el-table-column prop='name15' label='创建日期' min-width="80"></el-table-column>

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

    <!-- 任务新增 -->
    <el-dialog title="新增任务" :visible.sync="addDisplay" width="1000px">
      <el-form ref="alertAddModelForm" :model="addModelData" :inline="true" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="渠道名称">
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="支付渠道类型">
          <el-select v-model="addModelData.name2" placeholder="请选择">
            <el-option label="开启" value="1"></el-option>
            <el-option label="停止" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name3" label="网关类型">
          <el-select v-model="addModelData.name3" placeholder="请选择">
            <el-option label="个人网银" value="1"></el-option>
            <el-option label="对公网银" value="2"></el-option>
            <el-option label="银企直联" value="3"></el-option>
            <el-option label="快捷支付" value="4"></el-option>
            <el-option label="聚合支付" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="计费方式">
          <el-select v-model="addModelData.name4" placeholder="请选择">
            <el-option label="按单笔" value="0"></el-option>
            <el-option label="按费率" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name5" label="费率">
          <el-input v-model="addModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="交易最小限度">
          <el-input v-model="addModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="交易最大额度">
          <el-input v-model="addModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="支持卡种">
          <el-select v-model="addModelData.name8" placeholder="请选择">
            <el-option label="储蓄卡" value="0"></el-option>
            <el-option label="信用卡" value="1"></el-option>
            <el-option label="借贷卡" value="2"></el-option>
            <el-option label="银行账户" value="3"></el-option>
            <el-option label="存折" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name9" label="权重">
          <el-input v-model="addModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="状态">
          <el-select v-model="addModelData.name10" placeholder="请选择">
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name11" label="累计发送次数">
          <el-input v-model="addModelData.name11"></el-input>
        </el-form-item>
        <el-form-item prop="name12" label="累计失败次数">
          <el-input v-model="addModelData.name12"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="备注">
          <el-input v-model="addModelData.name13"></el-input>
        </el-form-item>
        <el-form-item prop="name14" label="活动性质" class="checkbox-list">
          <el-checkbox-group v-model="addModelData.name14">
            <el-checkbox v-for="(item,index) in modelDataCheckboxList" :key="index" :label="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

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
const testData = {};

const modelDataCheckboxList = [
  '中国农业银行',
  '中国工商银行',
  '中国建设银行',
  '中国邮政储蓄银行',
  '中国银行',
  '招商银行',
  '交通银行',
  '浦东银行',
  '中国光大银行',
  '中信银行',
  '平安银行',
  '中国民生银行',
  '华夏银行',
  '广发银行',
  '兴业银行',
  '上海银行',
  '宁波银行',
  '杭州银行',
  '北京银行',
  '温州银行',
  '成都银行',
  '东莞银行',
  '渤海银行',
  '新韩银行(中国)',
  '包商银行',
  '长沙银行',
  '星展银行',
  '东莞农村商业银行',
  '富邦华一银行',
  '广州银行',
  '广东农信',
  '广东华兴银行',
  '桂林银行',
  '广州农商银行',
  '东亚银行',
  '汇丰银行(中国)',
  '九江银行',
  '江苏银行',
  '南海农商银行',
  '广东南粤银行',
  '华润银行',
  '顺德农商银行',
  '深圳农村商业银行',
  '友利银行',
  '众邦银行',
  '微信',
  '支付宝',
  '京东支付',
  'QQ支付',
  '翼支付',
  '云闪付'
];
export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {
        name14: []
      },
      modelDataCheckboxList: modelDataCheckboxList,
      editorDisplay: false,
      editorModelData: {},
      performDisplay: false, //执行
      performModelData: {},
      deleteDisplay: false, //任务删除
      lookDisplay: false,
      tableData: [] || new Array(5).fill(testData),
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
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss'>
.aggregate-router-page {
  .el-dialog__body {
    padding-bottom: 0;
  }
  .alert-model-form .el-form-item {
    .el-input__inner {
      width: 178px;
    }
    width: 50%;
    margin-right: 0;
    &.checkbox-list {
      display: flex;
      justify-content: space-between;
      width: 100%;
      label {
        width: 120px;
      }
      .el-form-item__content {
        width: 800px;
      }
    }
  }
}
</style>