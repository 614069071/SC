<template>
  <!-- 商户管理 > 商户协议管理 -->
  <div class="merchants-protocol-page">
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="130px" :inline="true" ref="controlQueryForm">
          <el-form-item label="协议名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item prop="name2" label="商户">
            <el-col>
              <el-autocomplete v-model="examine.name2" :fetch-suggestions="merchantQuerySearch" placeholder="请输入内容" @select="handleSelect">
              </el-autocomplete>
            </el-col>
          </el-form-item>
          <el-form-item label="协议模板" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="代理商结算" value="1"></el-option>
              <el-option label="测试" value="0"></el-option>
              <el-option label="扫码支付结果" value="0"></el-option>
              <el-option label="测试" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="有效" value="1"></el-option>
              <el-option label="失效" value="2"></el-option>
              <el-option label="待审核" value="3"></el-option>
              <el-option label="审核不通过" value="4"></el-option>
              <el-option label="终止" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        <el-button type="info" @click="download">导出报表<i class="el-icon-download"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border class="tableInner-content">
          <el-table-column prop='name1' label='协议编号' width="90"></el-table-column>
          <el-table-column prop='name2' label='协议名称' width="90"></el-table-column>
          <el-table-column prop='name3' label='商户编号' width="80"></el-table-column>
          <el-table-column prop='name4' label='协议模板' width="80"></el-table-column>
          <el-table-column prop='name5' label='协议内容' min-width="700"></el-table-column>
          <el-table-column prop='name6' label='失效日期' width="100"></el-table-column>
          <el-table-column prop='name7' label='创建人' width="80"></el-table-column>
          <el-table-column prop='name8' label='状态' width="60"></el-table-column>
          <el-table-column prop='name9' label='备注' width="100"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
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

    <!-- 添加商户配置 -->
    <el-dialog title="添加商户配置" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="150px" :show-message="false">
        <el-form-item prop="name1" label="商户">
          <el-col>
            <el-autocomplete v-model="addModelData.name1" :fetch-suggestions="customerQuerySearch" placeholder="请输入商户名或编号" @select="handleSelect">
            </el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item prop="name2" label="协议名称">
          <el-input v-model="addModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="协议模板">
          <el-select v-model="examine.name3" placeholder="请选择">
            <el-option label="代理商结算" value="1"></el-option>
            <el-option label="测试" value="0"></el-option>
            <el-option label="扫码支付结算" value="0"></el-option>
            <el-option label="商户结算" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="备注">
          <el-input type="textarea" v-model="addModelData.name4"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 协议修改 -->
    <el-dialog title="协议修改" :visible.sync="editorDisplay" width="880px">
      <el-form :model="editorModelData" :disabled="isLook" class="editor-model-form" :inline="true" label-width="170px" :show-message="false">
        <el-form-item prop="name1" label="协议名称">
          <el-input v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="商户">
          <el-col>
            <el-autocomplete v-model="editorModelData.name2" :fetch-suggestions="facilitatorQuerySearch" placeholder="请输入内容" @select="handleSelect">
            </el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item prop="name3" label="协议模板">
          <el-select v-model="editorModelData.name3" placeholder="请选择">
            <el-option label="代理商结算" value="1"></el-option>
            <el-option label="测试" value="0"></el-option>
            <el-option label="扫码支付结算" value="0"></el-option>
            <el-option label="商户结算" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name4" label="备注">
          <el-input type="textarea" v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="结算周期">
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="是否跳过假日（Y/N）">
          <el-input v-model="editorModelData.name6"></el-input>
        </el-form-item>
        <el-form-item prop="name7" label="结算卡号">
          <el-input v-model="editorModelData.name7"></el-input>
        </el-form-item>
        <el-form-item prop="name8" label="结算户名">
          <el-input v-model="editorModelData.name8"></el-input>
        </el-form-item>
        <el-form-item prop="name9" label="结算卡开户行及支行信息">
          <el-input v-model="editorModelData.name9"></el-input>
        </el-form-item>
        <el-form-item prop="name10" label="结算卡号">
          <el-input v-model="editorModelData.name10"></el-input>
        </el-form-item>
        <el-form-item prop="name11" label="开户行地址">
          <el-input v-model="editorModelData.name11"></el-input>
        </el-form-item>
        <el-form-item prop="name12" label="客户经理">
          <el-col>
            <el-autocomplete v-model="editorModelData.name12" :fetch-suggestions="customerQuerySearch" placeholder="请输入内容" @select="handleSelect">
            </el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item prop="name13" label="服务商">
          <el-col>
            <el-autocomplete v-model="editorModelData.name13" :fetch-suggestions="merchantQuerySearch" placeholder="请输入内容" @select="handleSelect">
            </el-autocomplete>
          </el-col>
        </el-form-item>
        <el-form-item prop="name14" label="商户简称">
          <el-input v-model="editorModelData.name14"></el-input>
        </el-form-item>
        <el-form-item prop="name15" label="H5支付_费率">
          <el-input v-model="editorModelData.name15"></el-input>
        </el-form-item>
        <el-form-item prop="name16" label="原生H5支付_费率">
          <el-input v-model="editorModelData.name16"></el-input>
        </el-form-item>
        <el-form-item prop="name17" label="APP支付_费率">
          <el-input v-model="editorModelData.name17"></el-input>
        </el-form-item>
        <el-form-item prop="name18" label="扫码支付_费率">
          <el-input v-model="editorModelData.name18"></el-input>
        </el-form-item>
        <el-form-item prop="name19" label="网关支付_费率">
          <el-input v-model="editorModelData.name19"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="!isLook">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务删除 -->
    <el-dialog title="删除任务" :visible.sync="deleteDisplay" width="640px">
      <div class="dialog-deleted-content">您确定要删除<span>[37d809f633434527b6ae4605a178f66a]</span>协议吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { preview } from '@/tools/utils';
import merchantOptions from '@/tools/merchant';
import customerOptions from '@/tools/customer';
import facilitatorOptions from '@/tools/facilitator';

const testData = {
  name1: '37d809f633434527b6ae4605a178f66a',
  name2: '龙沙区步步高练歌厅',
  name3: 'P2019102911195400006',
  name4: '扫码支付结算',
  name5:
    '结算周期:period:T+1@_@是否跳过假日(Y/N):isSkipHoliday:Y@_@结算卡号:bankCardNo:6217922703798174@_@结算户名:bankCardName:李昊@_@结算卡开户行及支行信息:bankName:上海浦东发展银行股份有限公司齐齐哈尔分行@_@开户行地址:openAddressRec:黑龙江省齐齐哈尔市龙沙区南马路318号@_@联行号:CNAPS:310264000010@_@客户经理:custManager:189@_@服务商:serviceProvider:8d612e8fccbb4b5991ce1d097fa781c9@_@商户简称:merchantName:中国城@_@H5支付_费率:h5.gateway.pay_rate:@_@原生H5支付_费率:h5_t.gateway.pay_rate:@_@APP支付_费率:mobile.plugin.pay_rate:@_@扫码支付_费率:onecode.coll.pay_rate:0.38%@_@网关支付_费率:pc.gateway.pay_rate:@_@',
  name6: '9999-01-01',
  name7: '曾招郡	',
  name8: '有效',
  name9: ''
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
      restaurants: [],
      editorDisplay: false,
      editorModelData: {},
      isLook: false,
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
    // 商户候选操作
    merchantQuerySearch(queryString, cb) {
      var restaurants = merchantOptions;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    // 客户经理候选
    customerQuerySearch(queryString, cb) {
      var restaurants = customerOptions;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    // 服务商候选
    facilitatorQuerySearch(queryString, cb) {
      var restaurants = facilitatorOptions;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant =>
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    // getOptions() {
    //   return merchant;
    // },
    // 选中候选中的项
    handleSelect(item) {
      window.console.log(item, 'item');
    },
    editorClick(row) {
      this.editorDisplay = true;
      this.isLook = false;
      // this.editorModelData = row;
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
    lookClick() {
      this.editorDisplay = true;
      this.isLook = true;
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
    },
    download() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss'>
.merchants-protocol-page {
  .el-autocomplete {
    width: 100%;
  }
  .tableInner-content {
    .el-button {
      margin-left: 0;
    }
  }

  .editor-model-form {
    .el-input__inner,
    .el-textarea__inner {
      width: 240px;
    }
  }
}
</style>