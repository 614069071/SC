<template>
  <!-- 码表维护 > 协议模板维护 -->
  <div class="clock-template-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="模板名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="协议模板类型" prop="name2">
            <el-input v-model="examine.name2"></el-input>
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
          <el-table-column prop='name1' label='协议模板编号' width="150"></el-table-column>
          <el-table-column prop='name2' label='协议模板名称' width="100"></el-table-column>
          <el-table-column prop='name3' label='协议模板类型' width="100"></el-table-column>
          <el-table-column prop='name4' label='协议模板内容' min-width="400"></el-table-column>
          <el-table-column prop='name5' label='商户类型' width="80"></el-table-column>
          <el-table-column prop='name6' label='生效日期' width="100"></el-table-column>
          <el-table-column prop='name7' label='失效日期' width="80"></el-table-column>
          <el-table-column prop='name8' label='版本号' width="60"></el-table-column>
          <el-table-column prop='name9' label='备注' width="80"></el-table-column>
          <el-table-column prop='name10' label='状态' width="60"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
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
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="110px" :show-message="false">
        <el-form-item prop="name1" label="协议模板名称" required>
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="协议模板类型" required>
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item label="商户类型" prop="name3" required>
          <el-select v-model="examine.name3" placeholder="请选择">
            <el-option label="普通商户" value="1"></el-option>
            <el-option label="代理商" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="版本号" required>
          <el-input v-model="addModelData.name4"></el-input>
        </el-form-item>
        <el-form-item label="生效日期" prop="name5" required>
          <el-date-picker v-model="examine.name5" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="name6" label="协议模板内容" required>
          <el-input type="textarea" v-model="addModelData.name6" placeholder="请填写协议模板内容（必填）"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="备注">
          <el-input type="textarea" v-model="addModelData.name7"></el-input>
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
        <el-form-item prop="name1" label="协议模板编号" required>
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="协议模板名称" required>
          <el-input disabled v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="协议模板类型" required>
          <el-input v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item label="商户类型" prop="name4" required>
          <el-select v-model="examine.name4" placeholder="请选择">
            <el-option label="普通商户" value="1"></el-option>
            <el-option label="代理商" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name5" label="版本号" required>
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item label="生效日期" prop="name6" required>
          <el-date-picker disabled v-model="examine.name6" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="name7" required>
          <el-date-picker disabled v-model="examine.name7" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="name8" required>
          <el-select v-model="examine.name8" placeholder="请选择">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name9" label="协议模板内容" required>
          <el-input type="textarea" v-model="editorModelData.name9" placeholder="请填写协议模板内容（必填）"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="备注">
          <el-input type="textarea" v-model="editorModelData.name10"></el-input>
        </el-form-item>
      </el-form>
      <div class="editor-tips">（协议模板结算费率不用设置，后台自动根据产品添加。）</div>
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
  name1: 'f7bfbb27443c4f49ad1a71016a52905e',
  name2: '代理商-代付	',
  name3: '代理商-代付	',
  name4:
    'period:结算周期,isSkipHoliday:是否跳过假日(Y/N),bankCardNo:结算卡号,bankCardName:结算户名,compAcctBank:结算卡开户行信息,bankName:结算卡支行信息,openAddressRec:开户行地址,CNAPS:联行号,payType:付款方式',
  name5: '代理商户	',
  name6: '2017/11/21',
  name7: '',
  name8: 'V1.0		',
  name9: '',
  name10: '有效'
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
.clock-template-page {
  .editor-tips {
    text-align: center;
    color: #f00;
  }
}
</style>