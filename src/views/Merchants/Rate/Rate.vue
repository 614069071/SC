<template>
  <!-- 商户管理 > 费率管理 -->
  <div class="merchants-rate-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm">
          <el-form-item label="费率编号" prop="feeCode">
            <el-input v-model="examine.feeCode"></el-input>
          </el-form-item>

          <el-form-item label="费率类型" prop="feeType">
            <el-select v-model="examine.feeType" placeholder="请选择">
              <el-option label="固定费率" value="Fixed"></el-option>
              <el-option label="套餐费率" value="Package"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <!-- 费率编号 费率名称 费率类型 费率详情 费率值 费率描述 创建人 状态 -->
        <el-table :data="dataTable" border class="tableInner-content">
          <el-table-column prop='feeCode' label='费率编号' width="80"></el-table-column>
          <el-table-column prop='feeName' label='费率名称' width="120"></el-table-column>
          <el-table-column prop='feeType' label='费率类型' width="90"></el-table-column>
          <el-table-column prop='ruleDesc' label='费率详情' min-width="100"></el-table-column>
          <el-table-column prop='ruleValues' label='费率值' min-width="70"></el-table-column>
          <el-table-column prop='memo' label='费率描述' min-width="180"></el-table-column>
          <el-table-column prop='instUser' label='创建人' width="70"></el-table-column>
          <el-table-column prop='status' label='状态' width="60">
            <template slot-scope="scoped">{{scoped.row.status | dealFields}}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">
                <cs-btn type="look" />
              </el-button>
              <el-button type="text" size="small" @click="editorClick(scope.row,scope.$index)">
                <cs-btn type="editor" />
              </el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">
                <cs-btn type="delete" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>

    <!-- 费率新增 -->
    <el-dialog title="费率新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="feeName" label="费率名称" required>
          <el-input v-model="addModelData.feeName"></el-input>
        </el-form-item>
        <el-form-item prop="feeType" label="费率类型" required>
          <el-radio-group v-model="addModelData.feeType">
            <el-radio label="Package">套餐费率</el-radio>
            <el-radio label="Fixed">固定费率</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="addModelData.feeType === 'Package'">
          <el-form-item label="费率区间1" required>
            <el-col :span="6">
              <el-form-item prop="ruleMin1">
                <el-input v-model="addModelData.ruleMin1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleMax1">
                <el-input v-model="addModelData.ruleMax1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">费率值：</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleValues1">
                <el-input v-model="addModelData.ruleValues1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="right">%</el-col>
          </el-form-item>

          <el-form-item label="费率区间2" required>
            <el-col :span="6">
              <el-form-item prop="ruleMin2">
                <el-input v-model="addModelData.ruleMin2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleMax2">
                <el-input v-model="addModelData.ruleMax2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">费率值：</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleValues2">
                <el-input v-model="addModelData.ruleValues2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="right">%</el-col>
          </el-form-item>

          <el-form-item label="费率区间3" required>
            <el-col :span="6">
              <el-form-item prop="ruleMin3">
                <el-input v-model="addModelData.ruleMin3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleMax3">
                <el-input v-model="addModelData.ruleMax3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">费率值：</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleValues3">
                <el-input v-model="addModelData.ruleValues3"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="right">%</el-col>
          </el-form-item>

          <el-form-item label="费率区间4" required>
            <el-col :span="6">
              <el-form-item prop="ruleMin4">
                <el-input v-model="addModelData.ruleMin4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleMax4">
                <el-input v-model="addModelData.ruleMax4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">费率值：</el-col>
            <el-col :span="6">
              <el-form-item prop="ruleValues4">
                <el-input v-model="addModelData.ruleValues4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="right">%</el-col>
          </el-form-item>
        </template>

        <el-form-item v-else prop="ruleValues" label="费率值" required>
          <el-col :span="23">
            <el-input v-model="addModelData.ruleValues"></el-input>
          </el-col>
          <el-col :span="1" class="right">%</el-col>
        </el-form-item>

        <el-form-item prop="name8" label="费率描述">
          <el-input type="textarea" v-model="addModelData.name8"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 协议修改 -->
    <el-dialog title="协议修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertEditorModelForm" :model="editorModelData" :disabled="isLook" class="editor-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="feeCode" label="费率编号" required>
          <el-input disabled v-model="editorModelData.feeCode"></el-input>
        </el-form-item>
        <el-form-item prop="feeName" label="费率名称" required>
          <el-input disabled v-model="editorModelData.feeName"></el-input>
        </el-form-item>
        <el-form-item label="费率类型" prop="feeType" required>
          <el-radio-group disabled v-model="editorModelData.feeType">
            <el-radio label="Package">套餐费率</el-radio>
            <el-radio label="Fixed">固定费率</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="ruleValues" label="费率值" class="add-form-rate" required>
          <el-col :span="23">
            <el-input v-model="editorModelData.ruleValues"></el-input>
          </el-col>
          <el-col :span="1" class="right">%</el-col>
        </el-form-item>
        <el-form-item prop="memo" label="费率描述">
          <el-input type="textarea" v-model="editorModelData.memo"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" v-show="!isLook">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {
        feeName: '',
        feeType: 'Package',
        memo: '',
        ruleDesc: 'Fixed Rule'
      },
      restaurants: [],
      editorDisplay: false,
      editorModelData: {},
      isLook: false,
      dataTable: [],
      tableIndex: 0,
      total: 0, // 分页
      currentPage: 1
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {
    this.getRuleList();
  },
  methods: {
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getRuleList(data, 1);
    },
    getRuleList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcRuleList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getRuleList(data, v);
    },
    // 新增
    addClick() {
      this.addDisplay = true;
      const form = this.$refs['alertAddModelForm'];
      form && form.resetFields();
    },
    addModelCancel() {
      this.addDisplay = false;
    },
    addModelSubmit() {
      const form = this.$refs['alertAddModelForm'];

      console.log(form.model);
      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.mcRuleAdd(data).then(({ msg }) => {
        this.$message(msg);
        this.getRuleList();
      });
      this.addModelCancel();
    },
    // 编辑
    editorClick(row, index) {
      const data = Object.assign({}, row);
      this.isLook = false;
      this.tableIndex = index;
      this.editorDisplay = true;
      this.editorModelData = data;
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      const form = this.$refs['alertEditorModelForm'];

      this.checkFormSubmit(form, this.updateMenuItem.bind(null, form.model));
    },
    updateMenuItem(data) {
      this.editorDisplay = false;
      fetch.mcRuleUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.dataTable);
      table[this.tableIndex] = data;
      console.log(data, table, 'updateTableItem');
      this.dataTable = table;
    },
    lookClick(row) {
      this.editorDisplay = true;
      this.isLook = true;
      const data = Object.assign({}, row);
      this.editorModelData = data;
    },
    deleteClick(row) {
      const { feeCode } = row;

      this.$confirm('您确定要删除该费率吗？')
        .then(() => {
          fetch.mcRuleDelete({ feeCode }).then(({ msg }) => {
            this.currentPage = 1;
            this.getRuleList();
            this.$message(msg);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'>
.merchants-rate-page {
  .el-col {
    text-align: center;
  }
  .el-col.right {
    text-align: right;
  }
}
</style>