<template>
  <!-- 客户管理 > 客户管理列表 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="客户姓名" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>

          <el-form-item label="状态" prop="name3">
            <el-select v-model="examine.name3" placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
              <el-option label="登录账户冻结" value="3"></el-option>
              <el-option label="注册待激活" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="身份证" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>

          <el-form-item label="注册时间" prop="name5">
            <el-date-picker v-model="examine.name5" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="状态" prop="name6">
            <el-select v-model="examine.name6" placeholder="请选择">
              <el-option label="未认证" value="1"></el-option>
              <el-option label="一级" value="2"></el-option>
              <el-option label="二级" value="3"></el-option>
              <el-option label="三级" value="4"></el-option>
            </el-select>
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
          <el-table-column prop='name1' label='手机号码'></el-table-column>
          <el-table-column prop='name2' label='客户名称'></el-table-column>
          <el-table-column prop='name3' label='身份证号'></el-table-column>
          <el-table-column prop='name4' label='实名认证等级'></el-table-column>
          <el-table-column prop='name5' label='注册时间'></el-table-column>
          <el-table-column prop='name6' label='邮箱'></el-table-column>
          <el-table-column prop='name7' label='客户状态'></el-table-column>

          <el-table-column fixed="right" label="操作" width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查询卡信息</el-button>
              <el-button type="text" size="small" @click="editorClick(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="resetClick(scope.row)">密码重置</el-button>
              <el-button type="text" size="small" @click="smsClick(scope.row)">发送短信</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 查询卡信息 -->
    <el-dialog title="绑定卡信息" :visible.sync="lookDisplay" width="800px">
      <el-table :data="lookModelData" border>
        <el-table-column prop='name1' label='手机号码'></el-table-column>
        <el-table-column prop='name2' label='银行卡名称'></el-table-column>
        <el-table-column prop='name3' label='银行卡号'></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改消费者信息 -->
    <el-dialog title="修改消费者信息" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="证件类型">
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="证件号码">
          <el-input disabled v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="客户姓名" required>
          <el-input disabled v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="邮箱地址">
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="手机号码" required>
          <el-input v-model="editorModelData.name5"></el-input>
        </el-form-item>
        <el-form-item prop="name6" label="客户状态" required>
          <el-select v-model="editorModelData.name6" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
            <el-option label="登录账户冻结" value="3"></el-option>
            <el-option label="注册待激活" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name7" label="修改备注">
          <el-input type="textarea" v-model="editorModelData.name7"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 密码重置 -->
    <el-dialog title="重置消费者密码" :visible.sync="resetDisplay" width="600px">
      <el-form ref="alertResetModelForm" :model="resetModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="任务名称" required>
          <el-select v-model="resetModelData.name1" placeholder="请选择">
            <el-option label="已绑定邮箱" value="1"></el-option>
            <el-option label="客户提供" value="2"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="resetModelData.name1 === '2'">
          <el-form-item prop="name2" label="邮箱">
            <el-input v-model="resetModelData.name2"></el-input>
          </el-form-item>
          <el-form-item prop="name3" label="手机">
            <el-input v-model="resetModelData.name3"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetModelCancel">取 消</el-button>
        <el-button type="primary" @click="resetModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 发送信息 -->
    <el-dialog title="发送信息" :visible.sync="smsDisplay" width="600px">
      <el-form :model="smsModelData" class="alert-model-form" label-width="100px">
        <el-form-item prop="name1" label="手机号码" required>
          <el-input disabled v-model="smsModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="内容" required>
          <el-input type="textarea" v-model="smsModelData.name2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="smsModelCancel">取 消</el-button>
        <el-button type="primary" @click="smsModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '13267200752',
  name2: '重庆火锅',
  name3: '441801199311172672',
  name4: '三级认证',
  name5: '2019-12-03 14:50:30',
  name6: '614199265@qq.com',
  name7: '正常'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      lookDisplay: false,
      resetDisplay: false,
      resetModelData: {},
      lookModelData: [],
      editorDisplay: false,
      editorModelData: {},
      smsDisplay: false, //执行
      smsModelData: {},
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
      window.console.log(row);
    },
    resetModelSubmit() {
      this.$refs['alertResetModelForm'].validate((files, object) => {
        if (files) {
          // 验证通过 发送请求添加数据到数据库
          this.resetDisplay = false;
        } else {
          const keys = Object.keys(object);
          this.$message.error(`${keys[0]}不可为空`);
        }
      });
      window.console.log(this.resetModelData);
    },
    resetModelCancel() {
      this.resetDisplay = false;
      // this.resetFormFields('alertresetModelForm');
    },
    smsModelCancel() {
      this.smsDisplay = false;
    },
    smsModelSubmit() {
      window.console.log(this.smsModelData);
      this.smsDisplay = false;
    },
    smsClick(row) {
      this.smsDisplay = true;
      this.smsModelData = row;
      window.console.log(row);
    },
    //查询
    goToSearch() {
      window.console.log(this.examine, '查询');
    },
    // 查看信息
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    // 重置密码
    resetClick() {
      this.resetDisplay = true;
    },
    download() {
      this.$message('导出报表');
    }
  }
};
</script>

<style lang='scss' scoped></style>