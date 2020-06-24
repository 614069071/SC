<template>
  <!-- 页面模板文件 -->
  <div class="agent-agents-list-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="174px" :inline="false" ref="controlQueryForm">
          <el-form-item label="服务商编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="邮箱账号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="服务商状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务商名称" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
          <el-form-item label="手机账号" prop="name5">
            <el-input v-model="examine.name5"></el-input>
          </el-form-item>
          <el-form-item label="客户经理" prop="name2">
            <el-input v-model="examine.name2"></el-input>
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
          <el-table-column prop='name1' label='服务商编号' min-width="120"></el-table-column>
          <el-table-column prop='name2' label='邮箱账号' width="120"></el-table-column>
          <el-table-column prop='name3' label='手机账号' width="180"></el-table-column>
          <el-table-column prop='name4' label='服务商名称' min-width="140"></el-table-column>
          <el-table-column prop='name5' label='客户经理' width="160"></el-table-column>
          <el-table-column prop='name6' label='注册时间' width="80"></el-table-column>
          <el-table-column prop='name6' label='银行开户名' width="80"></el-table-column>
          <el-table-column prop='name6' label='服务商状态' width="80"></el-table-column>
          <el-table-column prop='name6' label='审核状态' width="80"></el-table-column>
          <el-table-column prop='name6' label='审核信息' width="80"></el-table-column>
          <el-table-column prop='name6' label='审核人' width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">审核</el-button>
              <!-- <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 服务商审核 -->
    <el-dialog title="服务商审核" :visible.sync="editorDisplay" width="800px">
      <el-form :model="editorModelData" :disabled="isLook" class="alert-model-form" label-width="150px" :show-message="false">
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常用邮箱" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件持有人类型" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件类型" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="身份证正面照" required>
              <SiteUpload v-model="editorModelData.name12" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="身份证反面照" required>
              <SiteUpload v-model="editorModelData.name12" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户类型" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户名称" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户银行" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账户" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="结算卡开户行支行名称" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="结算银行卡正面照" required>
              <SiteUpload v-model="editorModelData.name12" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="营业执照" required>
              <SiteUpload v-model="editorModelData.name12" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="营业期限" required>
              <el-input v-model="editorModelData.name1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="!isLook">
        <el-button @click="editorModelSubmit">审核不通过</el-button>
        <el-button type="primary" @click="editorModelSubmit">审核通过</el-button>
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
  name: 'ServiceGisterCheck',
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