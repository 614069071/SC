<template>
  <!-- 物料管理 => 物料管理 -->
  <div class="material-manage-page">
    <page-model>
      <template slot="controlQueryOps">
        <!-- 批量导入物料信息 action 上传文件地址待对接时修改 -->
        <el-upload class="material-upload" ref="upload" :limit="1" :on-change="uploadChange" :show-file-list="false" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
          :on-success="uploadSuccess">
          <el-button slot="trigger" size="mini" type="primary" @click="chooseFile">选取文件</el-button>
          <span class="upload-file-name">{{uploadFileName}}</span>
          <el-button style="margin-left: 10px;" size="mini" type="success" @click="uploadSubmit">批量导入物料信息</el-button>
        </el-upload>
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="机器编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="领用人" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="所用商户" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="机器状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="已领用" value="1"></el-option>
              <el-option label="未领用" value="2"></el-option>
              <el-option label="已激活" value="3"></el-option>
              <el-option label="未激活" value="4"></el-option>
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
          <el-table-column prop='name1' label='编号' width='80'></el-table-column>
          <el-table-column prop='name2' label='设备编号' min-width='170'></el-table-column>
          <el-table-column prop='name3' label='设备类型' width='80'></el-table-column>
          <el-table-column prop='name4' label='领取人' width='80'></el-table-column>
          <el-table-column prop='name5' label='所用商户' min-width='80'></el-table-column>
          <el-table-column prop='name6' label='所用门店' width='80'></el-table-column>
          <el-table-column prop='name7' label='供应商' width='80'></el-table-column>
          <el-table-column prop='name8' label='机器状态' width='80'></el-table-column>
          <el-table-column prop='name9' label='创建人' width='80'></el-table-column>
          <el-table-column prop='name10' label='创建时间' width='160'></el-table-column>
          <el-table-column prop='name11' label='备注' min-width='80'></el-table-column>
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

    <!-- 物料新增 -->
    <el-dialog title="物料新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="设备编号" required>
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="设备类型">
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="领取人">
          <el-input v-model="addModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="所用商户">
          <el-input v-model="addModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="所用门店">
          <el-input v-model="addModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="供应商" required>
          <el-input v-model="addModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="机器状态" required>
          <el-select v-model="addModelData.name7" placeholder="请选择">
            <el-option label="已领用" value="1"></el-option>
            <el-option label="未领用" value="1"></el-option>
            <el-option label="已激活" value="1"></el-option>
            <el-option label="未激活" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name8" label="备注">
          <el-input v-model="addModelData.name8"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 物料修改 -->
    <el-dialog title="物料修改" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="编号" required>
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="设备编号" required>
          <el-input v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="设备类型">
          <el-input v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="领取人">
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="所用商户">
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="所用门店">
          <el-input v-model="editorModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="供应商" required>
          <el-input v-model="editorModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="机器状态" required>
          <el-select v-model="editorModelData.name8" placeholder="请选择">
            <el-option label="已领用" value="1"></el-option>
            <el-option label="未领用" value="1"></el-option>
            <el-option label="已激活" value="1"></el-option>
            <el-option label="未激活" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name9" label="备注">
          <el-input v-model="editorModelData.name9"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务删除 -->
    <el-dialog title="删除任务" :visible.sync="deleteDisplay" width="600px">
      <div class="dialog-deleted-content">您确定要删除该任务调度配置<span>[8338]</span>吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '53',
  name2: 'QCF420191109220584',
  name3: '蜻蜓F4',
  name4: '领用人',
  name5: '所用商户',
  name6: '所用萌点',
  name7: 'mailao',
  name8: '未激活',
  name9: '伍龄童',
  name10: '2019-11-21 05:09:53',
  NAME11: ''
};

export default {
  props: ['searchText'],
  data() {
    return {
      uploadFileName: '未选择任何文件',
      examine: {},
      addDisplay: false,
      addModelData: {},
      editorDisplay: false,
      editorModelData: {},
      deleteDisplay: false, //任务删除
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
    uploadChange({ name }) {
      this.uploadFileName = name;
    },
    chooseFile() {
      // 上传之前清除文件
      this.$refs.upload.clearFiles();
    },
    uploadSubmit() {
      this.$refs.upload.submit();
      window.console.log('批量上传');
    },
    // 上传成功时的回调
    uploadSuccess(res) {
      window.console.log(res);
    },
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
.material-manage-page {
  .material-upload {
    margin: 0 0 10px 0;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .upload-file-name {
    display: inline-block;
    padding-left: 10px;
    min-width: 100px;
    color: #bababa;
  }
}
</style>