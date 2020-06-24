<template>
  <!-- 码表维护 > 首页广告维护 -->
  <div class="clock-advertising-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="广告名" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="图片路径" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
            </el-select>
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
          <el-table-column prop='name1' label='广告名' width="80"></el-table-column>
          <el-table-column prop='name2' label='图片路径' min-width="100"></el-table-column>
          <el-table-column prop='name3' label='创建人' width="100"></el-table-column>
          <el-table-column prop='name4' label='创建时间' width="160"></el-table-column>
          <el-table-column prop='name5' label='修改人' width="100"></el-table-column>
          <el-table-column prop='name6' label='修改时间' width="160"></el-table-column>
          <el-table-column prop='name7' label='是否有效' width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
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

    <!-- 新增广告 -->
    <el-dialog title="新增广告" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="问题详情" required>
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="超链接（URL）" required>
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="请选择文件" required>
          <!-- 上传action url待修改 -->
          <el-upload class="material-upload" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png" ref="upload" :limit="1" :on-change="uploadChange" :show-file-list="false"
            action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false">
            <el-button slot="trigger" size="mini" type="primary" @click="chooseFile">选取文件</el-button>
            <span class="upload-file-name">{{uploadFileName}}</span>
            <div slot="tip" class="el-upload__tip">支持*jpg、*jpeg、*gif、*bmp、*png图片格式</div>
          </el-upload>
          <div v-if="uploadImageSrc" class="preview-img"><img :src="uploadImageSrc" alt=""></div>
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
        <el-form-item prop="name1" label="广告名" required>
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="图片路径" required>
          <el-input v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="超链接（URL）" required>
          <el-input v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="状态" required>
          <el-select v-model="editorModelData.name4" placeholder="请选择">
            <el-option label="有效" value="0"></el-option>
            <el-option label="无效" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name5" label="请选择文件" required>
          <!-- 上传action url待修改 -->
          <el-upload class="material-upload" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png" ref="editorUpload" :limit="1" :on-change="editorUploadChange" :show-file-list="false"
            action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false">
            <el-button slot="trigger" size="mini" type="primary" @click="editorChooseFile">选取文件</el-button>
            <span class="upload-file-name">{{editorUploadFileName}}</span>
            <div slot="tip" class="el-upload__tip">支持*jpg、*jpeg、*gif、*bmp、*png图片格式</div>
          </el-upload>
          <div v-if="editorUploadImageSrc" class="preview-img"><img :src="editorUploadImageSrc" alt=""></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { preview } from '@/tools/utils';
const testData = {
  name1: '11',
  name2: '/data/nfsshare/upload/ad/1516259403477Jellyfish.jpg	',
  name3: '管理员',
  name4: '2018-01-18 15:10:03	',
  name5: '管理员',
  name6: '2018-01-18 15:10:03',
  name7: '有效'
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
      // 上传图片
      uploadFileName: '未选择任何文件',
      uploadImageSrc: '',
      editorDisplay: false,
      editorModelData: {},
      editorUploadImageSrc: '',
      editorUploadFileName: '',
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
    // 选择文件的change事件
    // uploadChange({ name, raw }) {
    uploadChange(res) {
      const { name, raw } = res;
      const src = preview(raw);
      this.uploadFileName = name;
      this.uploadImageSrc = src;
      this.addModelData.name3 = raw;
    },
    chooseFile() {
      // 上传之前清除文件
      this.$refs.upload.clearFiles();
    },
    editorClick(row) {
      this.editorDisplay = true;
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
.clock-advertising-page {
  .upload-file-name {
    margin-left: 10px;
  }
  .preview-img {
    width: 200px;
    margin-top: 10px;
    img {
      max-width: 200px;
      max-height: 150px;
    }
  }
}
</style>