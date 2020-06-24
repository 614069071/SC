<template>
  <!-- 码表维护 > 提现控制 -->
  <div class="clock-trading-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="手机号码" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="签约协议编号" prop="name2">
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
          <el-table-column prop='name1' label='客户编号' min-width="80"></el-table-column>
          <el-table-column prop='name2' label='手机号码' min-width="120"></el-table-column>
          <el-table-column prop='name3' label='控制类型' min-width="100"></el-table-column>
          <el-table-column prop='name4' label='签约协议编号' min-width="100"></el-table-column>
          <el-table-column prop='name5' label='每日次数(pc)' min-width="100"></el-table-column>
          <el-table-column prop='name6' label='每笔金额(pc)' min-width="100"></el-table-column>
          <el-table-column prop='name7' label='每月总额(pc)' min-width="130"></el-table-column>
          <el-table-column prop='name8' label='每日次数(mobile)' min-width="130"></el-table-column>
          <el-table-column prop='name9' label='每笔金额(mobile)' min-width="130"></el-table-column>
          <el-table-column prop='name9' label='每月总额(mobile)' min-width="130"></el-table-column>
          <el-table-column prop='name9' label='共同额度' min-width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
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

    <!-- 交易控制新增 -->
    <el-dialog title="交易控制新增" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="name1" label="控制类型" required>
          <el-select v-model="addModelData.name1" placeholder="请选择">
            <el-option label="总控" value="1"></el-option>
            <el-option label="个控" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name2" label="客户编号" required>
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="手机号码" required>
          <el-input v-model="addModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="签约协议编号" required>
          <el-input v-model="addModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="每日次数(pc)" required>
          <el-input v-model="addModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="每笔金额(pc)" required>
          <el-input v-model="addModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="每日总额(pc)" required>
          <el-input v-model="addModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="每月总额(pc)" required>
          <el-input v-model="addModelData.name8"></el-input>
        </el-form-item>
        <el-form-item prop="name9" label="每日次数(mobile)" required>
          <el-input v-model="addModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="每笔金额(mobile)" required>
          <el-input v-model="addModelData.name10"></el-input>
        </el-form-item>
        <el-form-item prop="name11" label="每日总额(mobile)" required>
          <el-input v-model="addModelData.name11"></el-input>
        </el-form-item>
        <el-form-item prop="name12" label="每月总额(mobile)" required>
          <el-input v-model="addModelData.name12"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="是否共同额度" required>
          <el-select v-model="addModelData.name13" placeholder="请选择">
            <el-option label="共用" value="1"></el-option>
            <el-option label="不共用" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 提现控制修改 -->
    <el-dialog title="交易控制" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" :disabled="isLook" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="name1" label="控制类型" required>
          <el-select v-model="editorModelData.name1" placeholder="请选择">
            <el-option label="总控" value="1"></el-option>
            <el-option label="个控" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name2" label="客户编号" required>
          <el-input v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="签约协议编号" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="每日次数(pc)" required>
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="每笔金额(pc)" required>
          <el-input v-model="editorModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="每日总额(pc)" required>
          <el-input v-model="editorModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="每月总额(pc)" required>
          <el-input v-model="editorModelData.name8"></el-input>
        </el-form-item>
        <el-form-item prop="name9" label="每日次数(mobile)" required>
          <el-input v-model="editorModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="每笔金额(mobile)" required>
          <el-input v-model="editorModelData.name10"></el-input>
        </el-form-item>
        <el-form-item prop="name11" label="每日总额(mobile)" required>
          <el-input v-model="editorModelData.name11"></el-input>
        </el-form-item>
        <el-form-item prop="name12" label="每月总额(mobile)" required>
          <el-input v-model="editorModelData.name12"></el-input>
        </el-form-item>
        <el-form-item prop="name13" label="是否共同额度" required>
          <el-select v-model="editorModelData.name13" placeholder="请选择">
            <el-option label="共用" value="1"></el-option>
            <el-option label="不共用" value="2"></el-option>
          </el-select>
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
  name1: '0000',
  name2: '123456789123',
  name3: '总控',
  name4: '',
  name5: '3',
  name6: '5000.00',
  name7: '5000.00',
  name8: '3',
  name9: '5000.00',
  name10: '5000.00',
  name11: '公用'
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
      isLook: false,
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
    lookClick(row) {
      this.editorModelData = row;
      this.editorDisplay = true;
      this.isLook = true;
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