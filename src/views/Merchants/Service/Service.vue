<template>
  <!-- 商户管理 > 服务商列表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="服务商编号" prop="merchantCode">
            <el-input v-model="examine.merchantCode"></el-input>
          </el-form-item>
          <el-form-item label="服务商名称" prop="custName">
            <el-input v-model="examine.custName"></el-input>
          </el-form-item>

          <el-form-item label="时间">
            <el-form-item>
              <el-col :span="11">
                <el-form-item prop="finishTimeB">
                  <el-date-picker v-model="examine.finishTimeB" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" />
                </el-form-item>
              </el-col>
              <el-col :span="2" class="center">-</el-col>
              <el-col :span="11">
                <el-form-item prop="finishTimeE">
                  <el-date-picker v-model="examine.finishTimeE" type="date" value-format="yyyy-MM-dd" placeholder="终止日期" />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="addClick">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="dataTable" border>
          <el-table-column prop='merchantCode' label='服务商编号' min-width="100"></el-table-column>
          <el-table-column prop='custName' label='服务商名称' min-width="90"></el-table-column>
          <el-table-column prop='custType' label='服务商类型' width="100"></el-table-column>
          <el-table-column prop='contactName' label='联系人姓名' width="90"></el-table-column>
          <el-table-column prop='contactMobile' label='联系人电话' width="120"></el-table-column>
          <el-table-column prop='referrer' label='推荐人' width="80"></el-table-column>
          <el-table-column prop='serviceLevel' label='服务商级别' width="90"></el-table-column>
          <el-table-column prop='state' label='状态' width="90">
            <template slot-scope="scope">{{{'00':'有效','01':'待审核','02':'注销','03':'冻结','04':'审核不通过'}[scope.row.state]}}</template>
          </el-table-column>
          <el-table-column prop='createTime' label='创建时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">
                <cs-btn type="look" />
              </el-button>
              <el-button type="text" size="small" @click="editorClick(scope.row)">
                <cs-btn type="editor" />
              </el-button>
              <el-button v-if="scope.row.state === '01'" type="text" size="small" @click="performClick(scope.row)">
                <cs-btn type="take" title="审核" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, total, jumper" :total="total" :current-page.sync="currentPage" @current-change="currentClick" />
      </template>
    </page-model>
  </div>
</template>

<script>
import fetch from '@/fetch';

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {
        merchantCode: null,
        custName: null,
        finishTimeB: null,
        finishTimeE: null
      },
      performDisplay: false, //执行
      performModelData: {},
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
    this.getServiceList();
    this.setStorage('service_operation', '{}');
  },
  methods: {
    // 新增1 + 预览0 + 商户更新2 + 商户审核3
    //查询
    goToSearch() {
      const data = this.examine;
      this.currentPage = 1;
      this.getServiceList(data, 1);
    },
    getServiceList(data = {}, v = 1) {
      const parmas = { pageNum: v, pageSize: 10 };
      fetch.mcServiceList(data, parmas).then(res => {
        const { list = [], total = 1 } = res.data;
        this.dataTable = list;
        this.total = total;
      });
    },
    currentClick(v) {
      const data = this.examine;
      this.getServiceList(data, v);
    },
    // 新增
    addClick() {
      this.$router.push('/merchants/service/operation/1');
    },
    addModelCancel() {
      this.addDisplay = false;
    },
    addModelSubmit() {
      const form = this.$refs['alertAddModelForm'];
      this.checkFormSubmit(form, this.addFormSubmit.bind(null, form.model));
    },
    addFormSubmit(data) {
      fetch.sysDeptSave(data).then(({ msg }) => {
        this.$message(msg);
        this.getServiceList();
      });
      this.addModelCancel();
    },
    // 编辑
    editorClick(row) {
      // const data = Object.assign({}, row);
      // this.tableIndex = index;
      // this.editorDisplay = true;
      // this.editorModelData = data;

      this.setStorage('service_operation', row);
      this.$router.push('/merchants/service/operation/2');
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
      fetch.sysDeptUpdate(data).then(({ msg }) => {
        this.updateTableItem(data);
        this.$message(msg || '失败');
      });
    },
    updateTableItem(data) {
      const table = Object.assign([], this.dataTable);
      table[this.tableIndex] = data;
      this.dataTable = table;
    },
    // 审核
    performClick(row) {
      this.setStorage('service_operation', row);
      this.$router.push('/merchants/service/operation/3');
      window.console.log(row);
    },
    // 查看
    lookClick(row) {
      window.console.log(row);
      this.setStorage('service_operation', row);
      this.$router.push('/merchants/service/operation/0');
    }
  }
};
</script>

<style lang='scss'></style>