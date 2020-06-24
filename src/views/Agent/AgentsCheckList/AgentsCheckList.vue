<template>
  <!-- 页面模板文件 -->
  <div class="agent-agents-list-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm">
          <el-form-item label="代理商编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="代理商名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" prop="name3">
            <el-select v-model="editorModelData.name3" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="待审核" value="2"></el-option>
              <el-option label="审核不通过" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户经理" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="name6">
            <el-date-picker v-model="examine.name6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
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
          <el-table-column prop='name1' label='代理商编号' min-width="120"></el-table-column>
          <el-table-column prop='name2' label='代理商名称' width="120"></el-table-column>
          <el-table-column prop='name3' label='产品类型' width="180"></el-table-column>
          <el-table-column prop='name6' label='联系人' width="80"></el-table-column>
          <el-table-column prop='name5' label='手机号码' width="160"></el-table-column>
          <el-table-column prop='name6' label='开户名' width="80"></el-table-column>
          <el-table-column prop='name6' label='开户账号' width="80"></el-table-column>
          <el-table-column prop='name6' label='邮箱地址' width="80"></el-table-column>
          <el-table-column prop='name6' label='客户经理' width="80"></el-table-column>
          <el-table-column prop='name6' label='注册时间' width="80"></el-table-column>
          <el-table-column prop='name6' label='类型' width="80"></el-table-column>
          <el-table-column prop='name6' label='审核状态' width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" @click="editorClick(scope.row)">修改</el-button> -->
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 代理商信息 -->
    <el-dialog title="代理商信息" :visible.sync="editorDisplay" width="700px">
      <el-form :model="editorModelData" :disabled="isLook" class="alert-model-form" label-width="250px" :show-message="false">
        <el-form-item prop="name1" label="账号" required>
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="代理商名称" required>
          <el-input v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="联系人" required>
          <el-input v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="身份证号" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="手机号码" required>
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="证件类型" required>
          <el-input v-model="editorModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="审核状态" required>
          <el-input v-model="editorModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="开户名" required>
          <el-input v-model="editorModelData.name8"></el-input>
        </el-form-item>
        <el-form-item prop="name9" label="开户行" required>
          <el-input v-model="editorModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="开户账号" required>
          <el-input v-model="editorModelData.name10"></el-input>
        </el-form-item>
        <el-form-item prop="name11" label="身份证图片正面" required>
          <SiteUpload v-model="editorModelData.name11" />
        </el-form-item>
        <el-form-item prop="name12" label="身份证图片背面" required>
          <SiteUpload v-model="editorModelData.name12" />
        </el-form-item>
        <el-form-item prop="name13" label="结算银行卡照片" required>
          <SiteUpload v-model="editorModelData.name13" />
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
const testData = {
  name1: 'C2019111111211200002',
  name2: '15802759465',
  name3: '493546860@qq.com',
  name4: '武汉远景嘉悦汽车销售服务有限公司',
  name5: '2019-11-11 11:21:12',
  name6: '正常'
};
import SiteUpload from '@/components/SiteUpload';

export default {
  name: 'AgentsCheckList',
  components: { SiteUpload },
  props: ['searchText'],
  data() {
    return {
      examine: {},
      editorDisplay: false,
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
    lookClick(row) {
      this.editorDisplay = true;
      this.isLook = true;
      window.console.log(row);
    },
    download() {
      this.$message('导出报表');
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