<template>
  <!-- 商户列表操作 (新增1 + 预览0 + 商户更新2 + 商户审核3) 不同字段，对应不同状态-->
  <div class="merchanrts-list-operation-page">
    <h3>服务商信息</h3>
    <el-form :model="basicInfo" label-width="130px" :disabled="isLook" :inline="true" ref="controlQueryForm" :show-message="false">
      <table class="info-item-table" border="1">
        <tr>
          <td colspan="3">
            <el-form-item label="服务商账号" prop="merchantAccount" required>
              <el-input v-model="basicInfo.merchantAccount" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>

      <h3>基本信息</h3>

      <table class="info-item-table" border="1">
        <tr>
          <td>
            <el-form-item label="服务商类型" prop="custType" required>
              <el-select v-model="basicInfo.custType" placeholder="请选择">
                <el-option label="企业" value="1"></el-option>
                <el-option label="小微商户" value="0"></el-option>
                <el-option label="个体户" value="2"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="所属业务人员" prop="custManager" required>
              <el-select v-model="basicInfo.custManager" filterable placeholder="请输入内容">
                <el-option v-for="(item,index) in BusinessPeople" :key="index" :label="item.userName" :value="item.userId" />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="服务商名称" prop="custName" required>
              <el-input v-model="basicInfo.custName" placeholder="请输入商户名称"></el-input>
            </el-form-item>
          </td>
        </tr>

        <tr>
          <td>
            <el-form-item label="服务商简称" prop="shortName" required>
              <el-input v-model="basicInfo.shortName" placeholder="请输入服务商简称"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="服务商邮箱" prop="merchantEmail" required>
              <el-input v-model="basicInfo.merchantEmail" placeholder="请输入服务商邮箱"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="客服号码" prop="contactPhone" required>
              <el-input v-model="basicInfo.contactPhone" placeholder="请输入客服号码"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="服务商地址" prop="province" required class="form-item-address">
              <el-select v-model="basicInfo.province" placeholder="请选择">
                <el-option v-for="(item,index) in province" :key="index" :label="item.provinceName" :value="item.provinceId" />
              </el-select>
            </el-form-item>&nbsp;
            <el-form-item prop="city" required class="form-item-address">
              <el-select v-model="basicInfo.city" placeholder="请选择">
                <el-option v-for="(item,index) in mapCity" :key="index" :label="item.cityName" :value="item.cityId" />
              </el-select>
            </el-form-item>&nbsp;
            <el-form-item prop="country" required class="form-item-address">
              <el-select v-model="basicInfo.country" placeholder="请选择">
                <el-option v-for="(item,index) in mapArea" :key="index" :label="item.areaName" :value="item.areaId" />
              </el-select>
            </el-form-item>&nbsp;
            <el-form-item prop="custAdd" required class="form-item-address">
              <el-input class="address-input" v-model.trim="basicInfo.custAdd" placeholder="详细地址" />
            </el-form-item>
          </td>

          <td>
            <el-form-item label="营业执照编号" prop="businessLicense" required>
              <el-input v-model="basicInfo.businessLicense" placeholder="请输入营业执照编号"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-form-item class="business-Term-choose">
              <span class="item tit">营业执照有效期</span>
              <el-form-item prop="businessTermStart" required>
                <el-date-picker v-model="basicInfo.businessTermStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择" />
              </el-form-item>
              <span class="item">-</span>
              <el-form-item prop="businessTermEnd" class="finite-item">
                <el-date-picker :disabled="setBusinessTermEndFiniteChecked" format="yyyy-MM-dd" type="date" value-format="yyyy-MM-dd" v-model="basicInfo.businessTermEnd" :placeholder="setBusinessTermEndFinite" />
                <el-checkbox v-model="setBusinessTermEndFiniteChecked">长期</el-checkbox>
              </el-form-item>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-form-item prop="businessPhoto" label="营业执照扫描件" required>
              <SiteUpload v-model="basicInfo.businessPhoto" />
            </el-form-item>
          </td>
        </tr>
      </table>
      <h3>法人信息</h3>
      <table class="info-item-table" border="1">
        <tr>
          <td>
            <el-form-item label="法人真实姓名" prop="representativeName" required>
              <el-input v-model="basicInfo.representativeName" placeholder="请输入法人真实姓名"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="法人身份证号码" prop="representativeCertNo" required>
              <el-input v-model="basicInfo.representativeCertNo" placeholder="请输入法人身份证号码"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-form-item prop="certAttribute1" label="法人身份证正面" required>
              <SiteUpload v-model="basicInfo.certAttribute1" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-form-item prop="certAttribute2" label="法人身份证背面" required>
              <SiteUpload v-model="basicInfo.certAttribute2" />
            </el-form-item>
          </td>
        </tr>
      </table>

      <h3>联系信息</h3>
      <table class="info-item-table" border="1">
        <tr>
          <td>
            <el-form-item label="联系人姓名" prop="contactName" required>
              <el-input v-model="basicInfo.contactName" placeholder="请输入法人真是姓名"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="联系人手机号码" prop="contactMobile" required>
              <el-input v-model="basicInfo.contactMobile" placeholder="请输入联系人手机号码"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="推荐人" prop="referrer" required>
              <el-input v-model="basicInfo.referrer" placeholder="请输入推荐人姓名"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="服务商级别" prop="serviceLevel" required>
              <el-input v-model="basicInfo.serviceLevel" placeholder="请输入服务商级别"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <h3>结算信息</h3>
      <table class="info-item-table" border="1">
        <tr>
          <td>
            <el-form-item label="结算账号" prop="compMainAcct" required>
              <el-input v-model="basicInfo.compMainAcct" placeholder="请输入法人结算账号"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="开户人" prop="bankAcctName" required>
              <el-input v-model="basicInfo.bankAcctName" placeholder="请输入开户人"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="开户省份" prop="address" required>
              <el-select v-model="basicInfo.bankProvinceName" placeholder="请选择">
                <el-option v-for="(item,index) in province" :key="index" :label="item.provinceName" :value="item.provinceId"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="开户城市" prop="address" required>
              <el-select v-model="basicInfo.bankCityName" placeholder="请选择">
                <el-option v-for="(item,index) in mapBankCityName" :key="index" :label="item.cityName" :value="item.cityId"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="开户银行" prop="compAcctBank" required>
              <el-select v-model="basicInfo.compAcctBank" filterable placeholder="请输入内容">
                <el-option v-for="(item,index) in bankList" :key="index" :label="item.bankName" :value="item.bankCode" />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="开户支行" prop="branchBank">
              <el-select v-model="basicInfo.branchBank" filterable placeholder="请输入内容">
                <el-option v-for="(item,index) in mapBankChildList" :key="index" :label="item.bankName" :value="item.bankCode" />
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="结算类型" prop="compMainAcctType" required>
              <el-select v-model="basicInfo.compMainAcctType" placeholder="请选择">
                <el-option label="对公" value="01"></el-option>
                <el-option label="对私" value="02"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-form-item prop="openAccount" label="开户许可证" required>
              <SiteUpload v-model="basicInfo.openAccount" />
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>

    <template v-if="type === '0' || type === '3'">
      <h3>操作记录</h3>
      <el-form :model="operationInfo" label-width="130px" :disabled="isLook" :inline="true" ref="controlQueryForm" :show-message="false">
        <table class="info-item-table" border="1">
          <tr>
            <td>
              <el-form-item label="录入人" prop="name1" required>
                <el-input v-model="operationInfo.name1"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="录入时间" prop="name2" required>
                <el-input v-model="operationInfo.name2"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item v-if="type === '0'" label="审核人" prop="name3" required>
                <el-input v-model="operationInfo.name3"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr v-if="type === '0'">
            <td>
              <el-form-item label="审核时间" prop="name4" required>
                <el-input v-model="operationInfo.name4"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="审核记录" prop="name5" required>
                <el-input v-model="operationInfo.name5"></el-input>
              </el-form-item>
            </td>
            <td></td>
          </tr>
        </table>
      </el-form>
    </template>

    <div class="btns">
      <!-- 新增及更新 -->
      <template v-if="type === '1' || type === '2'">
        <el-button type="primary" @click="goToSave">保存</el-button>
      </template>
      <!-- 审核状态 -->
      <template v-if="type === '3'">
        <el-button type="primary" @click="goToPass">审核通过</el-button>
        <el-button type="primary" @click="goToNoPass">审核不通过</el-button>
      </template>
      <el-button type="info" @click="goToBack">关闭</el-button>
    </div>
  </div>
</template>

<script>
import SiteUpload from '@/components/SiteUpload';
import fetch from '@/fetch';

export default {
  components: { SiteUpload },
  data() {
    return {
      type: '',
      isLook: false,
      basicInfo: {
        businessTermStart: '',
        businessTermEnd: ''
      },
      operationInfo: {},
      // 地址选择
      province: [],
      uploadFileName: '未选择任何文件',
      uploadImageSrc: '',
      setBusinessTermEndFinite: '请选择',
      setBusinessTermEndFiniteChecked: false,
      BusinessPeople: [],
      bankList: [],
      mapBankChildList: [],
      businessTermStart: ''
    };
  },
  watch: {
    setBusinessTermEndFiniteChecked(v) {
      if (v) {
        this.basicInfo.businessTermEnd = '';
        this.setBusinessTermEndFinite = '长期';
      } else {
        this.setBusinessTermEndFinite = '请选择';
      }
    },
    'basicInfo.province'() {
      console.log(this.basicInfo);
      const data = Object.assign({}, this.basicInfo);
      data.city = '';
      this.basicInfo = data;
    },
    'basicInfo.city'() {
      const data = Object.assign({}, this.basicInfo);
      data.country = '';
      this.basicInfo = data;
    },
    'basicInfo.bankProvinceName'() {
      const data = Object.assign({}, this.basicInfo);
      data.bankCityName = '';
      this.basicInfo = data;
    },
    // 根据开户银行获取开户支行
    'basicInfo.compAcctBank'(v) {
      const data = {
        channelCode: '',
        queryBean: { bankCode: v }
      };
      if (!v) return;
      this.basicInfo.branchBank = '';
      fetch.comBranchbankList(data).then(({ data }) => {
        this.mapBankChildList = data;
      });
    }
  },
  computed: {
    mapCity(v) {
      const city =
        v.province.find(v => this.basicInfo.province === v.provinceId) || {};
      return city.cityVOS || [];
    },
    mapArea(v) {
      const area = v.mapCity.find(v => this.basicInfo.city === v.cityId) || {};
      return area.areaVOS || [];
    },
    mapBankCityName(v) {
      const city =
        v.province.find(
          v => this.basicInfo.bankProvinceName === v.provinceId
        ) || {};
      return city.cityVOS || [];
    }
  },
  created() {
    // 新增1 + 浏览0 + 修改2 + 审核3
    const { type } = this.$route.params;
    const service_operation_data = this.getStorage('service_operation');
    const otherType = [
      '服务商信息预览',
      '新增服务商',
      '服务商信息更新',
      '服务商审核'
    ];

    if (type === '0' || type === '3') this.isLook = true;

    this.type = type;
    this.basicInfo = service_operation_data;
    console.log(service_operation_data.businessTermStart, 'businessTermStarts');
    this.businessTermStart = service_operation_data.businessTermStart;
    this.$emit('update:changeOtherBreadcrumbItem', otherType[type]);
    this.getProvinceList();
    this.getBankList();
    this.getComUserList();
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    this.$emit('update:changeOtherBreadcrumbItem', '');
  },
  methods: {
    // 省市区列表
    getProvinceList() {
      fetch.comProvinceList().then(({ data = [] }) => {
        this.province = data;
      });
    },
    // 开户银行列表
    getBankList() {
      fetch.comBankList().then(({ data = [] }) => {
        this.bankList = data;
      });
    },
    // 所属业务人员
    getComUserList() {
      fetch.comUserList().then(({ data = [] }) => {
        this.BusinessPeople = data;
      });
    },
    goToSave() {
      window.console.log(this.basicInfo);
    },
    goToPass() {
      window.console.log('通过');
    },
    goToNoPass() {
      window.console.log('不通过');
    },
    goToBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.merchanrts-list-operation-page {
  h3 {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    font-size: 17px;
    background-color: #ccc;
  }

  table,
  td,
  td {
    border: 1px solid rgb(240, 240, 240);
  }

  table {
    border-left: 0;
    border-right: 0;
  }
  overflow-y: scroll;
  overflow-x: hidden;
  .info-item-table {
    width: 100%;
  }
  .el-form-item {
    margin: 0 !important;
  }
  .form-item-address {
    .el-select {
      .el-input {
        width: 130px;
      }
    }
  }
  td {
    text-align: left;
    padding: 6px 0;
    width: 33.33%;
  }
  .address-input {
    width: 250px;
  }

  .btns {
    padding: 20px 0;
    text-align: center;
  }

  .business-Term-choose {
    .item {
      display: inline-block;
      padding: 0 6px 0 0;
      &.tit:before {
        content: '* ';
        color: red;
      }
    }
    .el-form-item {
      width: 140px;
      .el-input__inner {
        width: 134px;
      }
      .el-input {
        width: 140px;
      }
    }

    .finite-item {
      width: 182px;
      .el-checkbox__label {
        padding-left: 0;
      }
    }
  }
}
</style>