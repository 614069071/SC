<template>
  <!-- 代理商管理>代理商注册 -->
  <div class='agent-regist-page'>
    <h3>代理商注册</h3>
    <el-form :model="examine" label-width="120px" :inline="true" class="agent-regist-form" ref="controlQueryForm">
      <el-form-item label="代理商类型" prop="name1" required>
        <el-select v-model="examine.name1" placeholder="请选择">
          <el-option label="个人" value="1"></el-option>
          <el-option label="企业" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="name2" required>
        <el-input v-model="examine.name2"></el-input>
      </el-form-item>
      <el-form-item label="代理商名称" prop="name3" required>
        <el-input v-model="examine.name3"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="name4" required>
        <el-input v-model="examine.name4"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name5" required>
        <el-input v-model="examine.name5"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="name8" required>
        <el-select v-model="examine.name8" placeholder="请选择">
          <el-option label="大陆居民身份证" value="1"></el-option>
          <el-option label="香港居民身份证" value="2"></el-option>
          <el-option label="澳门居民身份证" value="3"></el-option>
          <el-option label="台湾居民身份证" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号码" prop="name9">
        <el-input v-model="examine.name9"></el-input>
      </el-form-item>
      <br />
      <el-form-item prop="name6" label="开户许可证" required>
        <SiteUpload v-model="examine.name6" />
      </el-form-item>
      <el-form-item prop="name7" label="开户许可证" required>
        <SiteUpload v-model="examine.name7" />
      </el-form-item>
    </el-form>

    <el-button type="primary" class="submit-btn" @click="onSubmit">注册</el-button>
  </div>
</template>

<script>
import SiteUpload from '@/components/SiteUpload';

export default {
  name: 'Regist',
  components: { SiteUpload },
  data() {
    return {
      examine: {}
    };
  },
  created() {},
  methods: {
    onSubmit() {
      window.console.log(this.examine);
    }
  }
};
</script>

<style lang='scss'>
.agent-regist-page {
  // text-align: center;
  overflow: auto;
  h3 {
    height: 30px;
    line-height: 30px;
    background-color: #ccc;
    text-align: center;
    font-size: 18px;
  }
  .agent-regist-form {
    margin-top: 10px;
    .el-form-item {
      min-width: 510px;
      width: 50%;
      margin: 0;
    }
    .el-input__inner {
      min-width: 215px;
      max-width: 300px;
    }
  }
  .submit-btn {
    width: 100px;
    margin: 20px auto;
  }
}
</style>
