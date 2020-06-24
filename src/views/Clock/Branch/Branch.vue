<template>
  <!-- 码表维护 > 支行信息管理 -->
  <div class="clock-trading-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm">
          <el-form-item label="银行支付系统行号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="银行名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="银行地址" prop="name3">
            <el-input v-model="examine.name3"></el-input>
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
          <el-table-column prop='name1' label='银行联行号' width="120"></el-table-column>
          <el-table-column prop='name2' label='银行支付系统行号' width="130"></el-table-column>
          <el-table-column prop='name3' label='区域编码' width="80"></el-table-column>
          <el-table-column prop='name4' label='银行名称' min-width="100"></el-table-column>
          <el-table-column prop='name5' label='银行地址' min-width="100"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 新增银行支行信息 -->
    <el-dialog title="新增银行支行信息" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="name1" label="银行联行号" required>
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="银行支付系统行号" required>
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="区域编号" required>
          <el-input v-model="addModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="银行名称" required>
          <el-input v-model="addModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="银行地址" required>
          <el-input v-model="addModelData.name5"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更新银行支行信息 -->
    <el-dialog title="更新银行支行信息" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="name1" label="银行联行号" required>
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="银行支付系统行号" required>
          <el-input v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="区域编号" required>
          <el-input v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="银行名称" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="银行地址" required>
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除银行支行信息 -->
    <el-dialog title="删除银行支行信息" :visible.sync="deleteDisplay" width="600px">
      <div class="dialog-deleted-content">您确定要删除该任务调度配置<span>[8338]</span>吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { preview } from '@/tools/utils';
const testData = {
  name1: '001100001509',
  name2: '001',
  name3: '652',
  name4: '中国人民银行营业管理部营业室',
  name5: '北京市西城区月坛南街79号'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {
        name3: null
      },
      editorDisplay: false,
      editorModelData: {},
      deleteDisplay: false,
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
    editorClick(row) {
      this.editorDisplay = true;
      this.isLook = false;
      this.editorModelData = row;
      window.console.log(row);
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
    editorUploadChange(res) {
      const { name, raw } = res;
      const src = preview(raw);
      this.editorUploadFileName = name;
      this.editorUploadImageSrc = src;
      this.editorModelData.name3 = raw;
    },
    editorChooseFile() {
      // 上传之前清除文件
      this.$refs.editorUpload.clearFiles();
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
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss'>
</style>