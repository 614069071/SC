<template>
  <!-- 客户管理 > 证件审核管理 -->
  <div class="customer-audit-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="客户名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="实名认证状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="待认证" value="1"></el-option>
              <el-option label="认证通过" value="2"></el-option>
              <el-option label="认证不通过" value="3"></el-option>
              <el-option label="取消" value="4"></el-option>
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
          <!-- 客户名称 用户手机号 创建时间 用户类型 实名认证状态 认证人 认证时间 认证情况描述 -->
          <el-table-column prop='name1' label='客户名称'></el-table-column>
          <el-table-column prop='name2' label='用户手机号'></el-table-column>
          <el-table-column prop='name3' label='创建时间'></el-table-column>
          <el-table-column prop='name4' label='用户类型'></el-table-column>
          <el-table-column prop='name5' label='实名认证状态'></el-table-column>
          <el-table-column prop='name6' label='认证人'></el-table-column>
          <el-table-column prop='name7' label='认证时间'></el-table-column>
          <el-table-column prop='name8' label='认证情况描述'></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
              <!-- 若是已处理，则不显示编辑 -->
              <!-- <el-button v-if="scope.flag" type="text" size="small" @click="editorClick(scope.row)">编辑</el-button> -->
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 查看 and 编辑 -->
    <el-dialog title="任务修改" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" :disabled="islook" class="alert-model-form" :inline="false" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="编号">
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="客户ID">
          <el-input disabled v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="客户名称">
          <el-input disabled v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="用户手机号">
          <el-input disabled v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="证件号码">
          <el-input disabled v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="证件信息1">
          <template slot-scope="scoped">
            <div class="certificate-info" @click="previewImageHandle(scoped.src)" :style="{backgroundImage:`url(${scoped.src})`}"></div>
          </template>
        </el-form-item>
        <el-form-item prop="name4" label="证件信息2">
          <template slot-scope="scoped">
            <div class="certificate-info" @click="previewImageHandle(scoped.src)" :style="{backgroundImage:`url(${scoped.src})`}"></div>
          </template>
        </el-form-item>
        <el-form-item prop="name4" label="证件信息3">
          <!-- <template slot-scope="scoped">
            <div class="certificate-info" @click="previewImageHandle(scoped.src)" :style="{backgroundImage:`url(${scoped.src})`}"></div>
          </template> -->
          <div class="certificate-info" @click="previewImageHandle()" :style="{backgroundImage:'url(https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1608124387,1484661828&fm=26&gp=0.jpg)'}">
          </div>
        </el-form-item>
        <el-form-item prop="name5" label="扫描件类型">
          <el-select disabled v-model="editorModelData.name5" placeholder="请选择">
            <el-option label="开启" value="1"></el-option>
            <el-option label="停止" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="申请时间">
          <el-input disabled v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="公安认证情况">
          <el-input type="textarea" v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="实名认证状态">
          <el-select v-model="editorModelData.name5" placeholder="请选择">
            <el-option label="待认证" value="1"></el-option>
            <el-option label="认证通过" value="0"></el-option>
            <el-option label="认证不通过" value="0"></el-option>
            <el-option label="取消" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="认证情况描述">
          <el-input type="textarea" v-model="editorModelData.name4"></el-input>
        </el-form-item>
      </el-form>
      <div v-show="!islook" slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="previewImageDisplay" width="500px" :show-close="false" class="preview-image">
      <img :src="previewImage" alt="">
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '管仕龙',
  name2: '13692247549',
  name3: '2019-11-29 19:31:36	',
  name4: '客户',
  name5: '认证通过',
  name6: '曾招郡',
  name7: '2019-11-29 19:31:44',
  name8: ''
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      editorDisplay: false,
      editorModelData: {},
      previewImage: '',
      previewImageDisplay: false,
      islook: true,
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
      this.editorModelData = row;
      this.islook = false;
      window.console.log(row);
    },
    // 预览证件
    previewImageHandle(src) {
      if (!src.length) return; //src为空时，阻止弹窗
      this.previewImageDisplay = true;
      this.previewImage = src;
    },
    lookClick(row) {
      this.editorDisplay = true;
      this.islook = true;
      this.editorModelData = row;
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    }
  }
};
</script>

<style lang='scss'>
.customer-audit-page {
  .certificate-info {
    width: 120px;
    height: 80px;
    border: 1px solid #eee;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .preview-image {
    .el-dialog__header {
      padding: 0;
    }
    img {
      width: 100%;
      min-width: 300px;
      max-width: 500px;
    }
  }
}
</style>