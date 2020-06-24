<template>
  <!-- 随行付 报备 -->
  <div class='merchants-list-report-page'>
    <el-form :model="performInfoData" ref="alertPerformModelForm" class="alert-perform-model-form" label-width="140px" :inline="true" :show-message="false">
      <h2>商户信息</h2>
      <el-form-item prop="merchantCode" label="商户编号" required>
        <el-input v-model.trim="performInfoData.merchantCode" />
      </el-form-item>
      <el-form-item prop="custName" label="商户名称" required>
        <el-input v-model.trim="performInfoData.custName" />
      </el-form-item>
      <h2>基本信息</h2>
      <el-form-item prop="mecTypeFlag" label="商户类型" required>
        <el-select v-model="performInfoData.mecTypeFlag">
          <el-option label="普通商户" value="00"></el-option>
          <el-option label="连锁总店" value="01"></el-option>
          <el-option label="连锁分店" value="02"></el-option>
          <el-option label="1+n总店" value="03"></el-option>
          <el-option label="1+n分店" value="04"></el-option>
        </el-select>
      </el-form-item>

      <template v-if="performInfoData.mecTypeFlag === '02' || performInfoData.mecTypeFlag === '04'">
        <el-form-item prop="parentMno" label="所属总店商户编号" required>
          <el-input v-model.trim="performInfoData.parentMno" placeholder="请输入所属总店商户编号(对应随行付商户号)" />
        </el-form-item>
        <el-form-item prop="independentModel" label="分店是否独立结算" required>
          <el-select v-model="performInfoData.independentModel" placeholder="结算方式">
            <el-option label="独立结算" value="00"></el-option>
            <el-option label="统一结算" value="01"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <el-form-item class="el-form-item-other" label="商户行业信息" required>
        <el-form-item prop="category" required>
          <el-select v-model="performInfoData.category" placeholder="请选择">
            <el-option v-for="item in channelIndustryP" :key="item.id" :label="item.categoryName" :value="item.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="industryCode">
          <el-select v-model="performInfoData.industryCode" placeholder="请选择">
            <el-option v-for="item in channelIndustryC" :key="item.id" :label="item.industryName" :value="item.industryCode" />
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item prop="suiXingMerchantType" label="是否有证商户" required>
        <el-select v-model="performInfoData.suiXingMerchantType" placeholder="请选择">
          <el-option label="有证商户" value="01"></el-option>
          <el-option label="无证商户" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="el-form-item-select-24" label="注册地址" required>
        <el-form-item required>
          <el-select v-model="performInfoData.merchantProvince" placeholder="请选择省">
            <el-option v-for="(item,index) in registerProvinces" :key="index" :label="item.areaName" :value="item.areaId" />
          </el-select>
        </el-form-item>
        <el-form-item required>
          <el-select v-model="performInfoData.merchantCity" placeholder="请选择市">
            <el-option v-for="(item,index) in registeredCitys" :key="index" :label="item.areaName" :value="item.areaId" />
          </el-select>
        </el-form-item>
        <el-form-item required>
          <el-select v-model="performInfoData.merchantArea" placeholder="请选择区">
            <el-option v-for="(item,index) in registeredAreas" :key="index" :label="item.areaName" :value="item.areaId" />
          </el-select>
        </el-form-item>
        <el-form-item required>
          <el-input v-model.trim="performInfoData.cprRegAddr" placeholder="详细地址" />
        </el-form-item>
      </el-form-item>

      <template v-if="performInfoData.suiXingMerchantType === '01'">
        <el-form-item prop="cprRegNmCn" label="营业执照名称" required>
          <el-input v-model.trim="performInfoData.cprRegNmCn" />
        </el-form-item>

        <el-form-item class="el-form-item-24" label="营业执照有效期" required>
          <el-form-item prop="businessEffectiveTerm" required>
            <el-date-picker v-model="performInfoData.businessEffectiveTerm" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择" />
          </el-form-item>
          <el-form-item prop="businessTerm" class="finite-item" required>
            <el-date-picker :disabled="setControlBusinessTermEndFiniteChecked" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="performInfoData.businessTerm" :placeholder="setControlBusinessTermEndFinite" />
          </el-form-item>
          <el-checkbox class="pl" v-model="setControlBusinessTermEndFiniteChecked">长期</el-checkbox>
        </el-form-item>

        <el-form-item prop="registCode" label="营业执照编号" required>
          <el-input v-model.trim="performInfoData.registCode" />
        </el-form-item>
      </template>

      <br />
      <el-form-item prop="businessPhoto" label="营业执照照片" required>
        <SiteUpload2 :src.sync="performInfoData.businessPhoto" />
      </el-form-item>
      <el-form-item prop="doorPhoto" label="门头照照片" required>
        <SiteUpload2 :src.sync="performInfoData.doorPhoto" />
      </el-form-item>
      <el-form-item prop="shopInterior" label="店内照" required>
        <SiteUpload2 :src.sync="performInfoData.shopInterior" />
      </el-form-item>
      <el-form-item prop="shopCheckStand" label="店内前台照" required>
        <SiteUpload2 :src.sync="performInfoData.shopCheckStand" />
      </el-form-item>
      <el-form-item prop="qualification" label="特殊资质照" required>
        <SiteUpload2 :src.sync="performInfoData.qualification" />
      </el-form-item>
      <h2>法人信息</h2>
      <el-form-item prop="representativeName" label="法人真实姓名" required>
        <el-input v-model.trim="performInfoData.representativeName" />
      </el-form-item>
      <el-form-item prop="mobileNo" label="手机号码" required>
        <el-input v-model.trim="performInfoData.mobileNo" />
      </el-form-item>
      <el-form-item prop="representativeCertType" label="法人证件类型" required>
        <el-select v-model="performInfoData.representativeCertType" placeholder="">
          <el-option value="00" label="身份证" />
          <el-option value="03" label="军人证" />
          <el-option value="04" label="警擦证" />
          <el-option value="05" label="港澳居民往来内地通行证" />
          <el-option value="06" label="台湾居民来往大陆通行证" />
          <el-option value="07" label="护照" />
          <el-option value="98" label="单位证件" />
          <el-option value="06" label="其他证件" />
        </el-select>
      </el-form-item>
      <el-form-item prop="representativeCertNo" label="法人身份证号码" required>
        <el-input v-model.trim="performInfoData.representativeCertNo" />
      </el-form-item>
      <br />
      <el-form-item prop="legalCertAttribute1" label="法人身份证正面" required>
        <SiteUpload2 :src.sync="performInfoData.legalCertAttribute1" />
      </el-form-item>
      <el-form-item prop="legalCertAttribute2" label="法人身份证背面" required>
        <SiteUpload2 :src.sync="performInfoData.legalCertAttribute2" />
      </el-form-item>
      <h2>结算信息</h2>
      <el-form-item prop="actNm" label="结算账户信息" required>
        <el-input v-model.trim="performInfoData.actNm" />
      </el-form-item>
      <el-form-item prop="bankCardNo" label="结算账号" required>
        <el-input v-model.trim="performInfoData.bankCardNo" />
      </el-form-item>
      <el-form-item prop="bankProvince" label="开户省份" required>
        <el-select v-model="performInfoData.bankProvince" placeholder="">
          <el-option v-for="(item,index) in bankProvinces" :key="index" :label="item.provinceName" :value="item.provinceId" />
        </el-select>
      </el-form-item>
      <el-form-item prop="bankCity" label="开户城市" required>
        <el-select v-model="performInfoData.bankCity" placeholder="">
          <el-option v-for="(item,index) in accountCitys" :key="index" :label="item.cityName" :value="item.cityId" />
        </el-select>
      </el-form-item>
      <el-form-item prop="suiXinBank" label="开户银行" required>
        <el-select v-model="performInfoData.suiXinBank" filterable placeholder="请输入内容">
          <el-option v-for="(item,index) in bankList" :key="index" :label="item.bankName" :value="item.bankCode" />
        </el-select>
      </el-form-item>
      <el-form-item prop="interBankName" label="开户支行" required>
        <el-select v-model="performInfoData.interBankName" filterable placeholder="请输入内容" @change="checkInterBankName">
          <!-- <el-select v-model="performInfoData.interBankName" filterable placeholder="请输入内容"> -->
          <el-option v-for="(item,index) in mapControlBankChildList" :key="index" :label="item.bankName" :value="item.bankName" />
        </el-select>
      </el-form-item>
      <el-form-item prop="actType" label="结算类型" required>
        <el-select v-model="performInfoData.actType" placeholder="请选择">
          <el-option label="对公" value="00" />
          <el-option label="对私" value="01" />
        </el-select>
      </el-form-item>
      <el-form-item prop="rate" label="结算费率" required>
        <el-col :span="22">
          <el-input v-model.trim="performInfoData.rate" />
        </el-col>
        <el-col :span="2" class="right">%</el-col>
      </el-form-item>
      <el-form-item prop="certifyNo" label="账户人身份证号码" required>
        <el-input v-model.trim="performInfoData.certifyNo" />
      </el-form-item>
      <br />
      <el-form-item prop="letterOfAuth" label="非法人结算授权函" required>
        <SiteUpload2 :src.sync="performInfoData.letterOfAuth" />
      </el-form-item>
      <el-form-item prop="openAccount" label="开户许可证" required>
        <SiteUpload2 :src.sync="performInfoData.openAccount" />
      </el-form-item>
      <el-form-item prop="bankCardPhoto" label="银行卡正面照" required>
        <SiteUpload2 :src.sync="performInfoData.bankCardPhoto" />
      </el-form-item>
      <el-form-item prop="settleCertAttribute1" label="结算人身份证正面" required>
        <SiteUpload2 :src.sync="performInfoData.settleCertAttribute1" />
      </el-form-item>
      <el-form-item prop="settleCertAttribute2" label="结算人身份证反面" required>
        <SiteUpload2 :src.sync="performInfoData.settleCertAttribute2" />
      </el-form-item>
    </el-form>

    <div class="merchants-list-report-page-footer">
      <el-button @click="performInfoModelCancel">取 消</el-button>
      <el-button type="primary" @click="performInfoModelSubmit">提交报备</el-button>
    </div>
  </div>
</template>

<script>
import fetch from '@/fetch';
import SiteUpload2 from '@/components/SiteUpload2';

const channelIndustryList = {};

export default {
  name: 'suixin',
  props: ['code'],
  components: { SiteUpload2 },
  data() {
    return {
      performInfoData: {
        merchantCode: '',
        custName: '',
        mecTypeFlag: '',
        category: '',
        industryCode: '',
        suiXingMerchantType: '',
        merchantProvince: '',
        merchantCity: '',
        merchantArea: '',
        cprRegAddr: '',
        cprRegNmCn: '',
        businessEffectiveTerm: '',
        businessTerm: '',
        registCode: '',
        businessPhoto: '',
        doorPhoto: '',
        shopInterior: '',
        shopCheckStand: '',
        qualification: '',
        representativeName: '',
        mobileNo: '',
        representativeCertType: '',
        representativeCertNo: '',
        legalCertAttribute1: '',
        legalCertAttribute2: '',
        actNm: '',
        bankCardNo: '',
        bankProvince: '',
        bankCity: '',
        suiXinBank: '',
        interBankName: '',
        actType: '',
        rate: '',
        certifyNo: '',
        letterOfAuth: '',
        openAccount: '',
        bankCardPhoto: '',
        settleCertAttribute1: '',
        settleCertAttribute2: ''
      },
      channelIndustryP: [], //商户行业信息
      channelIndustryC: [], //渠道行业信息
      registerProvinces: [], //注册地址
      registeredCitys: [],
      registeredAreas: [],
      bankProvinces: [], //开户省份
      accountCitys: [],
      bankList: [], //开户银行
      mapControlBankChildList: [],
      setControlBusinessTermEndFiniteChecked: false, //营业执照有效期
      setControlBusinessTermEndFinite: '请选择' //设置营业执照长期
    };
  },
  created() {},
  watch: {
    code: {
      handler() {
        const bankList = this.getStorage('bankList') || [];
        const form = this.$refs.alertPerformModelForm;

        form && form.resetFields();
        this.bankList = bankList;
        this.getReportData();
        this.getAccountBanlList();
        this.getComChannelIndustryCategory();
      },
      immediate: true
    },
    // 注册地址
    'performInfoData.merchantProvince'(nv, ov) {
      if (nv === ov) return;
      if (ov) this.performInfoData.merchantCity = '';
      const data = { parentAreaId: nv, channelCode: 'SUIXING_PAY' };
      fetch.comChannelMerchantAarea(data).then(res => {
        this.registeredCitys = res.data || [];
      });
    },
    'performInfoData.merchantCity'(nv, ov) {
      console.log(nv, ov);
      if (nv === ov) return;
      if (ov) this.performInfoData.merchantArea = '';
      const data = { parentAreaId: nv, channelCode: 'SUIXING_PAY' };
      fetch.comChannelMerchantAarea(data).then(res => {
        this.registeredAreas = res.data || [];
      });
    },
    'performInfoData.merchantArea'(nv, ov) {
      if (nv === ov) return;
      this.performInfoData.cprRegAddr = '';
    },
    // 开户省份
    'performInfoData.bankProvince'(nv, ov) {
      if (nv === ov) return;
      if (ov) this.performInfoData.bankCity = '';
      const data = { parentAreaId: nv, channelCode: 'SUIXING_PAY' };
      fetch.comChannelBankArea(data).then(res => {
        this.accountCitys = res.data || [];
      });
    },
    // 根据开户银行获取开户支行
    'performInfoData.suiXinBank'(nv, ov) {
      if (nv === ov) return;

      const data = {
        channelCode: 'SUIXING_PAY',
        queryBean: {
          bankCode: nv,
          cityCode: this.performInfoData.bankCity || ''
        }
      };
      if (ov) this.performInfoData.interBankName = '';
      fetch.comBranchbankList(data).then(res => {
        this.mapControlBankChildList = res.data;
      });
    },
    'performInfoData.category'(nv, ov) {
      if (nv === ov) return;
      const data = { channelCode: 'SUIXING_PAY', parentIndustryId: nv };
      if (ov) this.performInfoData.industryCode = '';
      if (channelIndustryList[nv]) {
        this.channelIndustryC = channelIndustryList[nv];
        return;
      }
      this.getComChannelIndustry(data);
    },
    // 操作部分
    setControlBusinessTermEndFiniteChecked(v) {
      if (v) {
        this.performInfoData.businessTermEnd = '';
        this.setControlBusinessTermEndFinite = '长期';
      } else {
        this.setControlBusinessTermEndFinite = '请选择';
      }
    }
  },
  methods: {
    // 获取详细信息
    getReportData() {
      const data = { merchantCode: this.code };

      this.getComChannelBankArea();

      // 获取对应渠道地址
      fetch
        .comChannelMerchantAarea({ channelCode: 'SUIXING_PAY' })
        .then(({ data = [] }) => {
          this.registerProvinces = data || [];
        });

      // 商户信息
      fetch.comMerchantInfo(data).then(res => {
        const mapPerformInfoData = {
          mecTypeFlag: '00',
          suiXingMerchantType: '01',
          representativeCertType: '00',
          merchantCode: res.data.merchantCode,
          custName: res.data.shortName,
          cprRegAddr: res.data.custAdd,
          businessEffectiveTerm: res.data.businessTermStart,
          businessTerm: res.data.businessTermEnd,
          registCode: res.data.businessLicense,
          representativeName: res.data.representativeName,
          mobileNo: res.data.mobile,
          representativeCertNo: res.data.representativeCertNo,
          bankCardNo: res.data.compMainAcct
        };

        const mapData = Object.assign(
          {},
          this.performInfoData,
          mapPerformInfoData
        );

        this.performInfoData = mapData;
      });

      this.performDisplay = false;
      this.performInfoDisplay = true;
    },
    // 银行开户省份
    getComChannelBankArea() {
      fetch.comChannelBankArea({ channelCode: 'SUIXING_PAY' }).then(res => {
        this.bankProvinces = res.data || [];
      });
    },
    // 商户行业信息
    getComChannelIndustryCategory() {
      fetch
        .comChannelIndustry({
          channelCode: 'SUIXING_PAY',
          parentIndustryId: ''
        })
        .then(res => {
          this.channelIndustryP = res.data;
        });
    },
    // 提交报备
    performInfoModelSubmit() {
      const data = Object.assign({}, this.performInfoData);

      if (this.setControlBusinessTermEndFiniteChecked) {
        data.businessTerm = '长期';
      }

      const form = this.$refs['alertPerformModelForm'];

      this.checkFormSubmit(form, () => {
        this.uploadPerformImage(taskCode => {
          data.taskCode = taskCode;
          const mapData = {
            reportDetailInfo: JSON.stringify(data),
            tdMerchantReport: {
              channelNo: 'SUIXING_PAY',
              merchantCode: this.code
            }
          };

          fetch
            .mcReportedAdd(mapData)
            .then(res => {
              this.$message(res.msg);
              this.performDisplay = false;
            })
            .catch(err => {
              console.log(err);
              this.$message('报备异常');
              this.performDisplay = false;
            });
        });
      });
    },
    performInfoModelCancel() {
      this.$emit('update:visible', false);
    },
    // 渠道行业信息
    getComChannelIndustry(data) {
      fetch.comChannelIndustry(data).then(res => {
        channelIndustryList[data.categoryId] = res.data;
        // console.log(channelIndustryList);
        this.channelIndustryC = res.data || [];
      });
    },
    // 报备开户支行选择
    checkInterBankName(v) {
      const item = this.mapControlBankChildList.find(e => e.bankName === v);
      this.performInfoData.lbnkNo = item.branchBankCode;
      console.log(item);
    },
    // 上传报备图片
    uploadPerformImage(callback) {
      const fd = new FormData();
      const {
        businessPhoto,
        legalCertAttribute1,
        legalCertAttribute2,
        bankCardPhoto,
        doorPhoto,
        shopInterior,
        shopCheckStand,
        qualification,
        letterOfAuth,
        openAccount,
        settleCertAttribute1,
        settleCertAttribute2
      } = this.performInfoData;

      fd.append('businessPhoto', businessPhoto);
      fd.append('legalCertAttribute1', legalCertAttribute1);
      fd.append('legalCertAttribute2', legalCertAttribute2);
      fd.append('bankCardPhoto', bankCardPhoto);
      fd.append('doorPhoto', doorPhoto);
      fd.append('shopInterior', shopInterior);
      fd.append('shopCheckStand', shopCheckStand);
      fd.append('qualification', qualification);
      fd.append('letterOfAuth', letterOfAuth);
      fd.append('openAccount', openAccount);
      fd.append('settleCertAttribute1', settleCertAttribute1);
      fd.append('settleCertAttribute2', settleCertAttribute2);
      fd.append('merchantCode', this.code);

      console.log('fd', fd);

      fetch.mcReportedFileUpload(fd).then(res => {
        if (res.code === 200) {
          callback && callback(res.data);
        }
      });
    },
    // 获取开户子银行
    getAccountBanlList() {
      fetch
        .comBankList({ channelCode: 'SUIXING_PAY' })
        .then(({ data = [] }) => {
          this.mapControlBankChildList = data;
        });
    }
  }
};
</script>

<style lang='scss'>
.merchants-list-report-page-footer {
  margin-top: 20px;
  text-align: right;
}
</style>