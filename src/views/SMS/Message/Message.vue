<template>
  <!-- 短信管理 -->
  <div class="sms-manage-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="手机号码" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="发送状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="待发送" value="0"></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="异常" value="2"></el-option>
              <el-option label="失败" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数据日期" prop="name4">
            <el-date-picker v-model="examine.name4" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="uploadExcel">导入EXCEL<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button type="info" @click="allAend">批量发送<i class="el-icon-upload2"></i></el-button>
        <el-button type="info" @click="allDelete">批量删除 <i class="el-icon-delete-solid"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop='name1' label='编号' width="60"></el-table-column>
          <el-table-column prop='name2' label='手机号码' width="110"></el-table-column>
          <el-table-column prop='name3' label='姓名' min-width="80"></el-table-column>
          <el-table-column prop='name4' label='金额' width="80"></el-table-column>
          <el-table-column prop='name5' label='数据日期' width="100"></el-table-column>
          <el-table-column prop='name6' label='创建人' width="80"></el-table-column>
          <el-table-column prop='name7' label='创建时间' width="160"></el-table-column>
          <el-table-column prop='name8' label='发送状态' width="80"></el-table-column>
          <el-table-column prop='name9' label='发送时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">短信详情</el-button>
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

    <!-- 导入excel -->
    <el-dialog title="导入excel" :visible.sync="excelDisplay" width="600px">
      <el-form ref="alertExcelModelForm" :model="excelModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="请选择文件">
          <!-- 上传action url待修改 -->
          <el-upload class="material-upload" ref="upload" :limit="1" :on-change="uploadChange" :show-file-list="false" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false"
            :on-success="uploadSuccess">
            <el-button slot="trigger" size="mini" type="primary" @click="chooseFile">选取文件</el-button>
            <span class="upload-file-name">{{uploadFileName}}</span>
          </el-upload>
        </el-form-item>
        <el-form-item prop="name2" label="是否开启">
          <el-select v-model="excelModelData.name2" placeholder="请选择">
            <el-option label="最后一个工作表" value="1"></el-option>
            <el-option label="所有一个工作表" value="2"></el-option>
            <el-option label="第一个工作表" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name3" label="是否开启">
          <el-select v-model="excelModelData.name3" placeholder="请选择">
            <el-option label="批量发送短信" value="1"></el-option>
            <el-option label="app升级短信模板" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="excelModelCancel">取 消</el-button>
        <el-button type="primary" @click="excelModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务删除 -->
    <el-dialog title="删除短信" :visible.sync="deleteDisplay" width="600px">
      <div class="dialog-deleted-content">您确定要删除该短信<span>[256]</span>么？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量发送 -->
    <el-dialog title="批量发送" :visible.sync="performDisplay" width="600px">
      发送所有待发送的数据?
      <div slot="footer" class="dialog-footer">
        <el-button @click="performModelCancel">取 消</el-button>
        <el-button type="primary" @click="performModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 日志内容 -->
    <el-dialog title="日志内容" :visible.sync="lookDisplay" width="600px">
      <div class="dialog-look-content">
        尊敬的商户您好，七分钱APP最新版本现已发布，新增收款语音提示、报表查询、部分退款功能，避免因更新带来的不便，请及时到各大应用市场下载升级，谢谢，退订回T
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '256',
  name2: '13822344119',
  name3: '林记我家便利店',
  name4: '0.00',
  name5: '2017-05-05',
  name6: '赖波',
  name7: '2017-05-05 22:32:50',
  name8: '成功',
  name9: '2017-05-05 22:38:02'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      excelDisplay: false,
      excelModelData: {
        name1: null
      },
      // 导入excel
      uploadFileName: '未选择任何文件',
      editorDisplay: false,
      editorModelData: {},
      performDisplay: false, //执行
      performModelData: {},
      deleteDisplay: false, //任务删除
      lookDisplay: false,
      tableData: new Array(5).fill(testData),
      multipleSelection: [],
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
    // 导入excell
    excelModelSubmit() {
      window.console.log(this.excelModelData);
      this.excelDisplay = false;
    },
    excelModelCancel() {
      this.excelDisplay = false;
      // this.resetFormFields('alertexcelModelForm');
    },
    // 选择excel文件的change事件
    uploadChange({ name, raw }) {
      this.uploadFileName = name;
      this.excelModelData.name1 = raw;
    },
    chooseFile() {
      // 上传之前清除文件
      this.$refs.upload.clearFiles();
    },
    // 上传成功时的回调
    uploadSuccess(res) {
      window.console.log(res);
    },
    allAend() {
      window.console.log('批量发送');
      this.performClick();
    },
    allDelete() {
      window.console.log(this.multipleSelection, '批量删除');
    },
    //批量发送
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
    uploadExcel() {
      // 新增
      this.excelDisplay = true;
    },
    // 选中的项
    handleSelectionChange(val) {
      window.console.log(val, 'val');
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang='scss'>
.sms-manage-page {
  .upload-file-name {
    display: inline-block;
    padding-left: 10px;
    min-width: 100px;
    color: #bababa;
  }
}
</style>