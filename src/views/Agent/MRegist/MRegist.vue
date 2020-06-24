<template>
  <!-- 代理商管理>代理商商户注册 -->
  <div class='agent-mregist-page'>
    <h3>商户注册</h3>
    <el-form :model="examine" label-width="250px" :inline="false" class="agent-regist-form" ref="controlQueryForm" :show-message="false">
      <el-form-item label="商户类型" prop="name1" required>
        <el-select v-model="examine.name1" placeholder="请选择">
          <el-option label="个体户" value="1"></el-option>
          <el-option label="企业" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户二维码编号" prop="name2">
        <el-input v-model="examine.name2"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="name3" required>
        <el-input v-model="examine.name3"></el-input>
      </el-form-item>
      <el-form-item label="商户名称" prop="name4" required>
        <el-input v-model="examine.name4"></el-input>
      </el-form-item>
      <el-form-item label="商户简称" prop="name5" required>
        <el-input v-model="examine.name5"></el-input>
      </el-form-item>
      <el-form-item label="商户角色" prop="name6" required>
        <el-select v-model="examine.name6" placeholder="请选择">
          <el-option label="线上商户" value="1"></el-option>
          <el-option label="线下商户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业类目" prop="name7" required>
        <el-select v-model="examine.name7.name1" placeholder="请选择类目类别">
          <!-- <el-option label="" value="1"></el-option> -->
        </el-select>
        &nbsp;
        <el-select v-model="examine.name7.name2" placeholder="请选择类目">
          <!-- <el-option label="" value="1"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="省市地区" prop="address" required class="form-item-address">
        <el-select v-model="examine.address.name1" placeholder="请选择">
          <el-option v-for="(item,index) in province" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        &nbsp;
        <el-select v-model="examine.address.name2" placeholder="请选择">
          <el-option v-for="(item,index) in city" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        &nbsp;
        <el-select v-model="examine.address.name3" placeholder="请选择">
          <el-option v-for="(item,index) in area" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商户地址" prop="name8" required>
        <el-input v-model="examine.name8"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="name9" required>
        <el-input v-model="examine.name9"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name10" required>
        <el-input v-model="examine.name10"></el-input>
      </el-form-item>
      <el-form-item label="营业执照注册号或统一社会信用代码" prop="name11">
        <el-input v-model="examine.name11"></el-input>
      </el-form-item>
      <el-form-item label="营业期限" prop="name13">
        起始：
        <el-date-picker v-model="examine.name13.name1" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        终止：
        <el-date-picker v-model="examine.name13.name2" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        &nbsp;<el-checkbox v-model="examine.name13.name3" label="1">长期</el-checkbox>
      </el-form-item>
      <el-form-item prop="name14" label="营业执照扫描件">
        <SiteUpload v-model="examine.name14" />
      </el-form-item>
      <el-form-item prop="name15" label="手持身份证图片正面" required>
        <SiteUpload v-model="examine.name15" />
      </el-form-item>
      <el-form-item prop="name16" label="身份证图片背面" required>
        <SiteUpload v-model="examine.name16" />
      </el-form-item>
      <el-form-item prop="name17" label="银行卡照">
        <SiteUpload v-model="examine.name17" />
      </el-form-item>
      <el-form-item prop="name18" label="门头照" required>
        <SiteUpload v-model="examine.name18" />
      </el-form-item>
      <el-form-item prop="name19" label="证件类型" required>
        <el-select v-model="examine.name19" placeholder="请选择">
          <el-option label="大陆居民身份证" value="1"></el-option>
          <el-option label="香港居民身份证" value="2"></el-option>
          <el-option label="澳门居民身份证" value="3"></el-option>
          <el-option label="台湾居民身份证" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name20" label="身份证号码" required>
        <el-input v-model="examine.name20"></el-input>
      </el-form-item>
      <el-form-item prop="name21" label="身份证有效期" required>
        <el-input v-model="examine.name21" placeholder="法人身份证号码有效期"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" class="submit-btn" @click="onSubmit">注册</el-button>
  </div>
</template>

<script>
import SiteUpload from '@/components/SiteUpload';

export default {
  name: 'MRegist',
  components: { SiteUpload },
  data() {
    return {
      examine: {
        name7: {},
        address: {},
        name13: {}
      },
      // 地址选择
      province: [{ name: '广东', value: '0' }],
      city: [{ name: '深圳', value: '0' }],
      area: [{ name: '南山', value: '0' }]
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
.agent-mregist-page {
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
      // width: 50%;
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
