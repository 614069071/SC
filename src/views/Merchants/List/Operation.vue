<template>
  <div class='merchants-list-operation-pages'>
    <h2>商户信息</h2>
    <el-form :model="basicInfo" label-width="130px" :disabled="isLook" :inline="true" ref="controlQueryForm" :rules="rules" :show-message="false">
      <el-form-item label="商户账号" prop="merchantAccount" required>
        <el-input maxlength="11" v-model.trim="basicInfo.merchantAccount" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <h2>基本信息</h2>
      <el-form-item label="商户类型" prop="custType" required>
        <el-select v-model="basicInfo.custType" placeholder="请选择">
          <el-option label="企业" value="1"></el-option>
          <el-option label="小微商户" value="0"></el-option>
          <el-option label="个体户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户名称" prop="custName" required>
        <el-input v-model.trim="basicInfo.custName" placeholder="请输入商户名称"></el-input>
      </el-form-item>
      <el-form-item label="商户简称" prop="shortName" required>
        <el-input v-model.trim="basicInfo.shortName" placeholder="请输入商户简称"></el-input>
      </el-form-item>
      <el-form-item label="商户邮箱" prop="merchantEmail" required>
        <el-input v-model.trim="basicInfo.merchantEmail" placeholder="请输入商户邮箱"></el-input>
      </el-form-item>
      <el-form-item label="客服号码" prop="contactPhone" required>
        <el-input v-model.trim="basicInfo.contactPhone" placeholder="请输入客服号码"></el-input>
      </el-form-item>
      <br />
      <el-form-item label="商户地址" prop="province" required class="form-item-address">
        <el-select v-model="basicInfo.province" placeholder="请选择">
          <el-option v-for="(item,index) in provinces" :key="index" :label="item.provinceName" :value="item.provinceId" />
        </el-select>
      </el-form-item>
      &nbsp;
      <el-form-item prop="city" required class="form-item-address">
        <el-select v-model="basicInfo.city" placeholder="请选择">
          <el-option v-for="(item,index) in cityList" :key="index" :label="item.cityName" :value="item.cityId" />
        </el-select>
      </el-form-item>
      &nbsp;
      <el-form-item prop="country" required class="form-item-address">
        <el-select v-model="basicInfo.country" placeholder="请选择">
          <el-option v-for="(item,index) in countryList" :key="index" :label="item.areaName" :value="item.areaId" />
        </el-select>
      </el-form-item>
      &nbsp;
      <el-form-item prop="custAdd" required class="form-item-address">
        <el-input class="address-input" v-model.trim="basicInfo.custAdd" placeholder="详细地址" />
      </el-form-item>
      <!--报备-->

      <!-- <el-form-item label="营业执照名称" prop="cprRegNmCn" required>
            <el-input v-model.trim="basicInfo.cprRegNmCn" placeholder="请输入营业执照名称"></el-input>
          </el-form-item>
          <el-form-item label="营业执照编号" prop="businessLicense" required>
            <el-input v-model.trim="basicInfo.businessLicense" placeholder="请输入营业执照编号"></el-input>
          </el-form-item> -->
      <el-form-item label="所属业务人员" prop="custManager">
        <el-select v-model="basicInfo.custManager" filterable placeholder="请输入内容">
          <el-option v-for="(item,index) in comUserList" :key="index" :label="item.userName" :value="item.userId" />
        </el-select>
      </el-form-item>
      <!-- <div class="business-Term-choose">
            <el-form-item prop="businessTermStart" label="营业执照有效期" required>
              <el-date-picker v-model="basicInfo.businessTermStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择" />
            </el-form-item>
            <span class="item">-</span>
            <el-form-item prop="businessTermEnd" class="finite-item" required>
              <el-date-picker :disabled="setBusinessTermEndFiniteChecked" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="basicInfo.businessTermEnd" :placeholder="setBusinessTermEndFinite" />
              <el-checkbox class="pl" v-model="setBusinessTermEndFiniteChecked">长期</el-checkbox>
            </el-form-item>
          </div> -->
      <el-form-item label="所属代理商" prop="agentName">
        <el-select v-model="basicInfo.agentName" filterable placeholder="请输入内容">
          <el-option v-for="(item,index) in comAgentList" :key="index" :label="item.custName" :value="item.merchantCode" />
        </el-select>
      </el-form-item>
      <br />
      <el-form-item prop="businessPhoto" label="营业执照扫描件" required>
        <SiteUpload :src.sync="basicInfo.businessPhoto" />
      </el-form-item>

      <el-form-item prop="doorPhoto" label="门头照照片" required>
        <SiteUpload :src.sync="basicInfo.doorPhoto" />
      </el-form-item>
      <el-form-item prop="shopInterior" label="店内照" required>
        <SiteUpload :src.sync="basicInfo.shopInterior" />
      </el-form-item>

      <el-form-item prop="shopCheckStand" label="店内前台照" required>
        <SiteUpload :src.sync="basicInfo.shopCheckStand" />
      </el-form-item>
      <h2>法人信息</h2>
      <el-form-item label="法人真实姓名" prop="representativeName" required>
        <el-input v-model.trim="basicInfo.representativeName" placeholder="请输入法人真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="法人身份证号码" prop="representativeCertNo" required>
        <el-input v-model="basicInfo.representativeCertNo" placeholder="请输入法人身份证号码"></el-input>
      </el-form-item>

      <div class="business-Term-choose">
        <el-form-item prop="idTermStart" label="身份证有效期" required>
          <el-date-picker v-model="basicInfo.idTermStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择" />
        </el-form-item>
        <span class="item center">-</span>
        <el-form-item prop="idTermEnd" class="finite-item">
          <el-date-picker :disabled="setIdtermEndFiniteChecked" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="basicInfo.idTermEnd" :placeholder="setIdTermTermEndFinite" />
          <el-checkbox class="pl" v-model="setIdtermEndFiniteChecked">长期</el-checkbox>
        </el-form-item>
      </div>

      <el-form-item prop="certAttribute1" label="法人身份证正面" required>
        <SiteUpload :src.sync="basicInfo.certAttribute1" />
      </el-form-item>

      <el-form-item prop="certAttribute2" label="法人身份证背面" required>
        <SiteUpload :src.sync="basicInfo.certAttribute2" />
      </el-form-item>
      <h2>联系信息</h2>
      <el-form-item label="联系人姓名" prop="contactName" required>
        <el-input v-model.trim="basicInfo.contactName" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号码" prop="contactMobile" required>
        <el-input maxlength="11" v-model.trim="basicInfo.contactMobile" placeholder="请输入联系人手机号码"></el-input>
      </el-form-item>
      <h2>结算信息</h2>
      <el-form-item label="结算账号" prop="compMainAcct" required>
        <el-input v-model.trim="basicInfo.compMainAcct" placeholder="请输入法人结算账号"></el-input>
      </el-form-item>
      <el-form-item label="开户人" prop="bankAcctName" required>
        <el-input v-model.trim="basicInfo.bankAcctName" placeholder="请输入开户人"></el-input>
      </el-form-item>
      <el-form-item label="开户省份" prop="bankProvinceName" required>
        <el-select v-model="basicInfo.bankProvinceName" placeholder="请选择">
          <el-option v-for="(item,index) in provinces" :key="index" :label="item.provinceName" :value="item.provinceId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户城市" prop="bankCityName" required>
        <el-select v-model="basicInfo.bankCityName" placeholder="请选择" no-match-text="请选择开户城市">
          <el-option v-for="(item,index) in mapCityList" :key="index" :label="item.cityName" :value="item.cityId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户银行" prop="compAcctBank" required>
        <el-select v-model="basicInfo.compAcctBank" filterable placeholder="请输入内容">
          <el-option v-for="(item,index) in bankList" :key="index" :label="item.bankName" :value="item.bankCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="开户支行" prop="branchBank" required>
        <el-select v-model="basicInfo.branchBank" filterable placeholder="请输入内容">
          <el-option v-for="(item,index) in mapBankChildList" :key="index" :label="item.bankName" :value="item.bankCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="结算类型" prop="compMainAcctType" required>
        <el-select v-model="basicInfo.compMainAcctType" placeholder="请选择">
          <el-option label="对公" value="1"></el-option>
          <el-option label="对私" value="0"></el-option>
        </el-select>
      </el-form-item>
      <br />
      <!-- 预览 -->
      <template v-if="data.type === 'look'">
        <el-form-item prop="bankCardPhoto" label="支付宝直连授权二维码" required>
          <div id="qrcode"></div>
        </el-form-item>

        <el-form-item prop="bankCardPhoto" label="银行卡照" required>
          <SiteUpload :src.sync="basicInfo.bankCardPhoto" />
        </el-form-item>
      </template>

      <!-- 新增 更新 及 审核 -->
      <el-form-item v-else prop="openAccount" label="开户许可证" required>
        <SiteUpload :src.sync="basicInfo.openAccount" />
      </el-form-item>

      <template v-if="data.type === 'perform'">
        <h2>操作记录</h2>
        <el-form-item label="录入人" prop="createName">
          <el-input v-model="basicInfo.createName"></el-input>
        </el-form-item>
        <el-form-item label="录入时间" prop="createTime">
          <el-input v-model="basicInfo.createTime"></el-input>
        </el-form-item>
        <el-form-item v-if="data.type === 'look'" label="审核人" prop="aduitUserName">
          <el-input v-model="basicInfo.aduitUserName"></el-input>
        </el-form-item>

        <template v-if="data.type === 'perform'">
          <el-form-item label="审核时间" prop="auditTime">
            <el-input v-model="basicInfo.auditTime"></el-input>
          </el-form-item>
          <el-form-item label="审核记录" prop="aduitMessage">
            <el-input v-model="basicInfo.aduitMessage"></el-input>
          </el-form-item>
        </template>
      </template>
    </el-form>

    <div class="btns">
      <!-- 新增 -->
      <template v-if="data.type === 'add'">
        <el-button type="primary" @click="addSubmit">新增提交</el-button>
      </template>
      <!-- 更新 -->
      <el-button v-else-if="data.type === 'update'" type="primary" @click="updateSubmit">更新提交</el-button>
      <!-- 审核状态 -->
      <template v-else-if="data.type === 'perform'">
        <el-button type="primary" @click="goToPass">审核通过</el-button>
        <el-button type="primary" @click="goToNoPass">审核不通过</el-button>
      </template>
      <el-button type="info" @click="goToBack">关闭</el-button>
    </div>

    <el-dialog title="审核不通过" :visible.sync="auditInfoDisplay">
      <el-input type="textarea" v-model="auditInfo" placeholder="请输入少于50字的审核意见"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="auditInfoSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';
import QrCode from 'qrcodejs2';
import SiteUpload from '@/components/SiteUpload';

let QrCodeEle = null;

export default {
  props: ['data'],
  components: { SiteUpload },
  data() {
    return {
      rules: {
        // merchantAccount: [{ validator: isPhoneNo, trigger: 'blur' }],
        // contactMobile: [{ validator: isPhoneNo, trigger: 'blur' }],
        // merchantEmail: [{ validator: isEmail, trigger: 'blur' }],
        // businessLicense: [{ validator: isBusCode, trigger: 'blur' }]
      },
      basicInfo: {
        merchantAccount: '',
        custType: '',
        custName: '',
        shortName: '',
        merchantEmail: '',
        contactPhone: '',
        province: '',
        city: '',
        country: '',
        custAdd: '',
        businessLicense: '',
        businessTermStart: '',
        businessTermEnd: '',
        custManager: '',
        agentName: '',
        businessPhoto: '',
        doorPhoto: '',
        shopInterior: '',
        shopCheckStand: '',
        representativeName: '',
        representativeCertNo: '',
        idTermStart: '',
        idTermEnd: '',
        certAttribute1: '',
        certAttribute2: '',
        contactName: '',
        contactMobile: '',
        compMainAcct: '',
        bankAcctName: '',
        bankProvinceName: '',
        bankCityName: '',
        compAcctBank: '',
        branchBank: '',
        compMainAcctType: '',
        openAccount: '',
        suiXingMerchantType: '',
        cprRegNmCn: ''
      },
      isLook: false,
      setBusinessTermEndFiniteChecked: false,
      setBusinessTermEndFinite: '请选择',
      // 注册地址
      provinces: [], //新增及更新地址
      // 开户省份
      mapCityList: [],
      // 开户银行
      bankList: [],
      mapBankChildList: [],
      // 地址选择
      cityList: [],
      countryList: [],
      setIdtermEndFiniteChecked: false,
      setIdTermTermEndFinite: '请选择',
      comAgentList: [],
      comUserList: [],
      auditInfoDisplay: false,
      auditInfo: ''
    };
  },
  created() {
    // 新增:add + 预览:look + 商户更新:update + 商户审核:perform
    const provinces = this.getStorage('provinces') || [];
    const bankList = this.getStorage('bankList') || [];

    this.provinces = provinces;
    this.bankList = bankList;
    this.getComAgentList();
    this.getComUserList();
  },
  watch: {
    data: {
      handler(nv = { custId: '', type: '' }, ov = { custId: '', type: '' }) {
        this.init(nv, ov);
      },
      immediate: true
    },
    setBusinessTermEndFiniteChecked(v) {
      if (v) {
        this.basicInfo.businessTermEnd = '';
        this.setBusinessTermEndFinite = '长期';
      } else {
        this.setBusinessTermEndFinite = '请选择';
      }
    },
    setIdtermEndFiniteChecked(v) {
      if (v) {
        this.basicInfo.idTermEnd = '';
        this.setIdTermTermEndFinite = '长期';
      } else {
        this.setIdTermTermEndFinite = '请选择';
      }
    },
    'basicInfo.province'(nv, ov) {
      if (nv === ov) return;
      const info = this.basicInfo;
      const city = this.provinces.find(e => nv === e.provinceId) || {};
      if (ov) info.city = '';

      // console.log(city.cityVOS);
      this.cityList = city.cityVOS || [];
    },
    'basicInfo.city'(nv, ov) {
      if (nv === ov) return;
      const info = this.basicInfo;
      const area = this.cityList.find(e => nv === e.cityId) || {};
      if (ov) info.country = '';
      this.countryList = area.areaVOS || [];
    },
    'basicInfo.country'(nv, ov) {
      if (nv === ov) return;
      // this.basicInfo.custAdd = '';
    },
    'basicInfo.bankProvinceName'(nv, ov) {
      if (nv === ov) return;
      const city = this.provinces.find(e => nv === e.provinceId) || {};

      if (ov) this.basicInfo.bankCityName = '';
      console.log(city);
      this.mapCityList = city.cityVOS || [];
    },
    // 根据开户银行获取开户支行
    'basicInfo.compAcctBank'(nv, ov) {
      if (nv === ov) return;
      if (!nv) return;

      const data = {
        channelCode: '',
        queryBean: { bankCode: nv }
      };

      if (ov) this.basicInfo.branchBank = '';
      fetch.comBranchbankList(data).then(({ data }) => {
        this.mapBankChildList = data;
      });
    }
  },
  methods: {
    init(nv, ov) {
      const form = this.$refs.controlQueryForm;

      if (nv.type !== ov.type) {
        if (nv.type === 'add') {
          this.isLook = false;
          form && form.resetFields();
        } else if (nv.type === 'look') {
          this.isLook = true;
        } else if (nv.type === 'update') {
          this.isLook = false;
        } else if (nv.type === 'perform') {
          this.isLook = true;
        }
      }

      if (nv.custId !== ov.custId && nv.type !== 'add') {
        this.getMcMchDetail({ custId: nv.custId });
      }
    },
    // 获取商户详情
    getMcMchDetail(v) {
      fetch.mcMchDetail(v).then(res => {
        const data = res.data;
        if (data) {
          if (data.businessTermEnd === '长期') {
            data.businessTermEnd = '';
            this.setBusinessTermEndFiniteChecked = true;
          }

          if (data.idTermEnd === '长期') {
            data.idTermEnd = '';
            this.setIdtermEndFiniteChecked = true;
          }

          const nData = Object.assign({}, this.basicInfo, data);

          this.basicInfo = nData;
          this.basicInfo.merchantAccount = nData.mobile;
          this.basicInfo.editMerchantAccount = true;

          const getPicData = { ...v, authId: res.data.authId };

          this.getPicPath(getPicData);
        }
      });
    },
    //新增提交
    addSubmit() {
      const data = Object.assign({}, this.basicInfo);

      if (this.setBusinessTermEndFiniteChecked) {
        data.businessTermEnd = '长期';
      }

      if (this.setIdtermEndFiniteChecked) {
        data.idTermEnd = '长期';
      }

      const form = this.$refs['controlQueryForm'];
      console.log(data, 'this.basicInfo');

      this.checkFormSubmit(form, () => {
        fetch
          .mcMchAdd(data)
          .then(res => {
            return this.setPicPath(res.data.custId);
          })
          .then(res => {
            this.$message(res.msg);
            this.$emit('update:visible', false);
            this.$emit('updateList');
          })
          .catch(err => {
            this.$message(err.msg);
            console.log(err);
          });
      });
    },
    // 更新
    updateSubmit() {
      const data = Object.assign({}, this.basicInfo);

      if (this.setBusinessTermEndFiniteChecked) {
        data.businessTermEnd = '长期';
      }

      if (this.setIdtermEndFiniteChecked) {
        data.idTermEnd = '长期';
      }

      const form = this.$refs['controlQueryForm'];
      console.log(data, 'this.basicInfo');

      this.checkFormSubmit(form, () => {
        fetch
          .mcMchUpdate(data)
          .then(res => {
            return this.setPicPath(data.custId);
          })
          .then(res => {
            this.$emit('update:visible', false);
            this.$emit('updateList');
            this.$message(res.msg);
          })
          .catch(err => {
            this.$message(err.msg);
            console.log(err);
          });
      });
    },
    // 生成支付宝二维码
    qrcode(id = '') {
      const link = `https://openauth.alipay.com/oauth2/appToAppAuth.htm?&application_type=WEBAPP,MOBILEAPP&
      custId=${id}&app_id=2018013002109989&redirect_uri=https://www.qifenqian.com/enterprise/pub/alipayauth.do`;

      this.$nextTick(() => {
        document.getElementById('qrcode').innerHTML = '';
        QrCodeEle && QrCodeEle.clear();
        QrCodeEle = new QrCode('qrcode', {
          width: 124,
          height: 124, // 高度
          text: link // 二维码内容
        });
        console.log('QrCodeEle2', QrCodeEle);
      });
    },
    // 审核通过
    goToPass() {
      const { merchantCode = '' } = this.basicInfo;
      const data = { merchantCode, status: '00' };

      fetch
        .mcMchAudit(data)
        .then(res => {
          this.$message(res.msg);
          this.$emit('update:visible', false);
          this.$emit('updateList');
        })
        .catch(err => {
          console.log(err);
          this.$emit('update:visible', false);
          this.$message('审核失败');
        });
    },
    // 审核不通过
    goToNoPass() {
      this.auditInfoDisplay = true;
    },
    // 图片入库
    setPicPath(id) {
      const {
        openAccount,
        certAttribute1,
        certAttribute2,
        businessPhoto,
        bankCardPhotoPath = '',
        shopInterior,
        shopCheckStand,
        doorPhoto
      } = this.basicInfo;

      const data = {
        custId: id,
        picturePath: {
          openAccountPath: openAccount, //开户许可证
          idCardOPath: certAttribute1, //身份证正面照
          idCardFPath: certAttribute2, //身份证背面照
          bussinessPath: businessPhoto, //商户营业执照
          bankCardPath: bankCardPhotoPath, //开户银行照
          shopInteriorPath: shopInterior, //店内照
          shopCheckStandPath: shopCheckStand, //店内前台照
          doorPhotoPath: doorPhoto //门头照
        }
      };

      return fetch.comGetPicPath(data);
    },
    getPicPath(data) {
      fetch.comPicPath(data).then(res => {
        const {
          openAccountPath,
          idCardOPath,
          idCardFPath,
          bussinessPath,
          bankCardPath,
          shopInteriorPath,
          shopCheckStandPath,
          doorPhotoPath
        } = res.data;

        //   openAccountPath: openAccount, //开户许可证
        //   idCardOPath: legalCertAttribute1, //身份证正面照
        //   idCardFPath: legalCertAttribute2, //身份证背面照
        //   bussinessPath: businessPhoto, //商户营业执照
        //   bankCardPath: bankCardPhotoPath, //开户银行照
        //   shopInteriorPath: shopInterior, //店内照
        //   shopCheckStandPath: shopCheckStand, //店内前台照
        //   doorPhotoPath: doorPhoto //门头照

        const data = {
          openAccount: openAccountPath,
          certAttribute1: idCardOPath,
          certAttribute2: idCardFPath,
          businessPhoto: bussinessPath,
          bankCardPhotoPath: bankCardPath,
          shopInterior: shopInteriorPath,
          shopCheckStand: shopCheckStandPath,
          doorPhoto: doorPhotoPath
        };

        const nBasicInfo = Object.assign({}, this.basicInfo, data);
        this.basicInfo = nBasicInfo;
      });
    },
    // 操作取消
    goToBack() {
      this.$emit('update:visible', false);
    },
    // 代理商
    getComAgentList() {
      fetch.comAgentList().then(({ data = [] }) => {
        console.log(data, 'comAgentList');
        this.comAgentList = data;
      });
    },
    // 所属业务人员
    getComUserList() {
      fetch.comUserList().then(({ data = [] }) => {
        console.log(data, 'comUserList');
        this.comUserList = data;
      });
    },
    // 审核不通过意见提交
    auditInfoSubmit() {
      const { merchantCode = '' } = this.basicInfo;
      const data = { merchantCode, status: '99', auditInfo: this.auditInfo };
      fetch.mcMchAudit(data).then(res => {
        this.$message(res.msg || '审核异常');
      });
      this.$emit('update:visible', false);
      this.auditInfoDisplay = false;
    }
  }
};
</script>

<style lang='scss'>
</style>