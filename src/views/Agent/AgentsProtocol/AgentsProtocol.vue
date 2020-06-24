<template>
  <!-- 页面模板文件 -->
  <div class="agent-agents-list-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="90px" :inline="true" ref="controlQueryForm">
          <el-form-item label="协议名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="代理商" prop="name2">
            <el-select v-model="editorModelData.name2" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议模板" prop="name3">
            <el-select v-model="editorModelData.name3" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="name4">
            <el-select v-model="editorModelData.name4" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='协议编号' min-width="120"></el-table-column>
          <el-table-column prop='name2' label='协议名称' width="120"></el-table-column>
          <el-table-column prop='name3' label='代理商编号' width="180"></el-table-column>
          <el-table-column prop='name4' label='协议模板' min-width="140"></el-table-column>
          <el-table-column prop='name5' label='协议内容' width="160"></el-table-column>
          <el-table-column prop='name6' label='失效日期' width="80"></el-table-column>
          <el-table-column prop='name6' label='创建人' width="80"></el-table-column>
          <el-table-column prop='name6' label='状态' width="80"></el-table-column>
          <el-table-column prop='name6' label='备注' width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="lookClick(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">终止</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 新增代理商协议 -->
    <el-dialog title="代理商协议" :visible.sync="addDisplay" width="500px">
      <el-form :model="addModelData" class="alert-model-form" label-width="100px" :show-message="false">
        <el-form-item prop="name2" label="代理商" required>
          <el-select v-model="editorModelData.name2" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name1" label="协议名称" required>
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="协议模板" required>
          <el-select v-model="editorModelData.name3" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="备注" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 代理商协议 -->
    <el-dialog title="代理商协议" :visible.sync="editorDisplay" width="700px">
      <el-form :model="editorModelData" :disabled="isLook" class="alert-model-form" label-width="200px" :show-message="false">
        <el-form-item prop="name1" label="协议名称" required>
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="代理商" required>
          <el-select v-model="editorModelData.name2" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name3" label="协议模板" required>
          <el-select v-model="editorModelData.name3" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="备注" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="结算周期" required>
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="是否跳过假日(Y/N)" required>
          <el-input v-model="editorModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="结算卡号" required>
          <el-input v-model="editorModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="结算户名" required>
          <el-input v-model="editorModelData.name8"></el-input>
        </el-form-item>
        <el-form-item prop="name9" label="结算卡开户行及支行信息" required>
          <el-input v-model="editorModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="开户行地址" required>
          <el-input v-model="editorModelData.name10"></el-input>
        </el-form-item>
        <el-form-item prop="name11" label="联行号" required>
          <el-input v-model="editorModelData.name11"></el-input>
        </el-form-item>
        <el-form-item prop="name12" label="客户经理" required>
          <el-select v-model="editorModelData.name12" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name13" label="H5支付_费率" required>
          <el-input v-model="editorModelData.name13"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="原生H5支付_费率" required>
          <el-input v-model="editorModelData.name13"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="APP支付_费率" required>
          <el-input v-model="editorModelData.name13"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="扫码支付_费率" required>
          <el-input v-model="editorModelData.name13"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="网关支付_费率" required>
          <el-input v-model="editorModelData.name13"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="!isLook">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 协议终止 -->
    <el-dialog title="协议终止" :visible.sync="deleteDisplay" width="640px">
      <div class="dialog-deleted-content">您确定要终止该协议[5e128fded81c49d5983cbbaeb45cc317]么？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: 'C2019111111211200002',
  name2: '15802759465',
  name3: '493546860@qq.com',
  name4: '武汉远景嘉悦汽车销售服务有限公司',
  name5: '2019-11-11 11:21:12',
  name6: '正常'
};
// import SiteUpload from '@/components/SiteUpload';

export default {
  name: 'AgentsProtocol',
  // components: { SiteUpload },
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      editorDisplay: false,
      deleteDisplay: false,
      editorModelData: {
        name6: {},
        name7: {}
      },
      isLook: false,
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
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
    editorClick(row) {
      this.editorDisplay = true;
      // this.editorModelData = row;
      this.isLook = false;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    // 新增
    insertItem(row) {
      this.addDisplay = true;
      window.console.log(row);
    },
    addModelCancel() {
      this.addDisplay = false;
    },
    addModelSubmit() {
      window.console.log(this.addModelData);
      this.addDisplay = false;
    },
    lookClick(row) {
      this.editorDisplay = true;
      this.isLook = true;
      window.console.log(row);
    },
    download() {
      this.$message('导出报表');
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
    }
  }
};
</script>

<style lang='scss'>
.agent-agents-list-page {
  .el-form-item-flex {
    .el-form-item__content {
      display: flex;
      .el-select {
        margin-right: 10px;
        &:last-child {
          margin: 0;
        }
      }
    }
  }
}
</style>