import fetch from './http'
import * as api from './api'

const HTTP = {
  // 公共接口
  comBankList: () => fetch({ url: api.comBankList, name: '银行列表' }),
  comProvinceList: () => fetch({ url: api.comProvinceList, name: '服务商省份列表' }),
  comBranchbankList: data => fetch({ url: api.comBranchbankList, data, name: '银行所属支行信息' }),
  comAgentList: () => fetch({ url: api.comAgentList, name: '服务商列表' }),
  comUserList: () => fetch({ url: api.comUserList, name: '所属业务人员列表' }),
  comProductList: () => fetch({ url: api.comProductList, name: '产品信息列表' }),
  comPaychannelList: () => fetch({ url: api.comPaychannelList, name: '支付渠道列表' }),
  comPayprodlList: () => fetch({ url: api.comPayprodlList, name: '支付产品列表' }),
  comMerchantList: () => fetch({ url: api.comMerchantList, name: '商户列表' }),
  comMaterielList: () => fetch({ url: api.comMaterielList, name: '设备列表' }),
  comChannelnameList: () => fetch({ url: api.comChannelnameList, name: '通道名信息列表' }),
  comUploadPic: data => fetch({ url: api.comUploadPic, data, name: '图片上传' }),
  comPicPath: data => fetch({ url: api.comPicPath, data, name: '图片地址信息' }),
  comGetPicPath: data => fetch({ url: api.comGetPicPath, data, name: '图片入库' }),
  comChannelIndustry: data => fetch({ url: api.comChannelIndustry, data, name: '渠道行业信息' }),
  comMerchantInfo: data => fetch({ url: api.comMerchantInfo, data, name: '商户信息' }),
  comChannelMerchantAarea: data => fetch({ url: api.comChannelMerchantAarea, data, name: '商户渠道地区（注册地址）' }),
  comChannelBank: data => fetch({ url: api.comChannelBank, data, name: '渠道银行信息' }),
  comChannelBankArea: data => fetch({ url: api.comChannelBankArea, data, name: '渠道银行地区信息' }),
  comReportChannel: data => fetch({ url: api.comReportChannel, data, name: '报备渠道列表' }),
  // 登录模块
  login: data => fetch({ url: api.login, data, name: '登录' }),
  // 部门管理
  sysDeptList: (data, params) => fetch({ url: api.sysDeptList, data, params, name: '部门列表' }),
  sysDeptSave: data => fetch({ url: api.sysDeptSave, data, name: '部门新增' }),
  sysDeptUpdate: data => fetch({ url: api.sysDeptUpdate, data, name: '部门更新' }),
  sysDeptDelete: data => fetch({ url: api.sysDeptDelete, data, name: '部门删除' }),
  // 菜单管理
  sysMenuList: (data, params) => fetch({ url: api.sysMenuList, data, params, name: '菜单列表' }),
  sysMenuAdd: data => fetch({ url: api.sysMenuAdd, data, name: '添加菜单' }),
  sysMenuUpdate: data => fetch({ url: api.sysMenuUpdate, data, name: '修改菜单' }),
  sysMenuDelete: data => fetch({ url: api.sysMenuDelete, data, name: '删除菜单' }),
  // 角色管理
  sysRoleList: (data, params) => fetch({ url: api.sysRoleList, data, params, name: '角色列表' }),
  sysRoleFn: data => fetch({ url: api.sysRoleFn, data, name: '角色功能列表' }),
  sysRoleSave: data => fetch({ url: api.sysRoleSave, data, name: '添加角色' }),
  sysRoleUpdate: data => fetch({ url: api.sysRoleUpdate, data, name: '修改角色' }),
  sysRoleDelete: data => fetch({ url: api.sysRoleDelete, data, name: '删除角色' }),
  sysRoleFnTree: data => fetch({ url: api.sysRoleFnTree, data, name: '角色权限列表' }),
  // 用户管理
  sysUserList: (data, params) => fetch({ url: api.sysUserList, data, params, name: '用户列表' }),
  sysUserAdd: data => fetch({ url: api.sysUserAdd, data, name: '添加用户' }),
  sysUserUpdate: data => fetch({ url: api.sysUserUpdate, data, name: '修改用户' }),
  sysUserDelete: data => fetch({ url: api.sysUserDelete, data, name: '删除用户' }),
  // 商户管理
  // 门店管理
  mcShopList: (data, params) => fetch({ url: api.mcShopList, data, params, name: '门店列表' }),
  mcShopAdd: data => fetch({ url: api.mcShopAdd, data, name: '门店新增' }),
  mcShopDelete: data => fetch({ url: api.mcShopDelete, data, name: '门店删除' }),
  mcShopUpdate: data => fetch({ url: api.mcShopUpdate, data, name: '门店修改' }),
  mcShopCode: data => fetch({ url: api.mcShopCode, data, name: '获取二维码' }),
  // 商户列表
  mcMchList: (data, params) => fetch({ url: api.mcMchList, data, params, name: '商户列表' }),
  mcMchAdd: data => fetch({ url: api.mcMchAdd, data, name: '新增商户' }),
  mcMchAudit: data => fetch({ url: api.mcMchAudit, data, name: '商户审核' }),
  mcMchUpdate: data => fetch({ url: api.mcMchUpdate, data, name: '商户更新' }),
  mcMchDetail: data => fetch({ url: api.mcMchDetail, data, name: '商户详细' }),
  mcAllMchList: () => fetch({ url: api.mcAllMchList, name: '商户所有列表' }),
  // 商户报备管理
  mcReportedList: (data, params) => fetch({ url: api.mcReportedList, data, params, name: '商户报备列表' }),
  mcReportedAdd: data => fetch({ url: api.mcReportedAdd, data, name: '商户报备新增' }),
  mcReportedDetail: data => fetch({ url: api.mcReportedDetail, data, name: '商户报备资料详细' }),
  mcReportedStatus: data => fetch({ url: api.mcReportedStatus, data, name: '报备状态查询' }),
  mcReportedSuiXingDetail: data => fetch({ url: api.mcReportedSuiXingDetail, data, name: '商户报备随行付资料详细' }),
  mcReportedFileUpload: data => fetch({ url: api.mcReportedFileUpload, data, name: '商户报备图片上传' }),
  // 收银员
  mcCashierList: (data, params) => fetch({ url: api.mcCashierList, data, params, name: '收银员列表' }),
  mcCashierAdd: data => fetch({ url: api.mcCashierAdd, data, name: '收银员新增' }),
  mcCashierUpdate: data => fetch({ url: api.mcCashierUpdate, data, name: '收银员更新' }),
  mcCashierDelete: data => fetch({ url: api.mcCashierDelete, data, name: '收银员删除' }),
  // 商户网关维护
  mcGatewayList: (data, params) => fetch({ url: api.mcGatewayList, data, params, name: '商户网关列表' }),
  mcGatewayAdd: data => fetch({ url: api.mcGatewayAdd, data, name: '商户网关新增' }),
  mcGatewayUpdate: data => fetch({ url: api.mcGatewayUpdate, data, name: '商户网关更新' }),
  mcGatewayDelete: data => fetch({ url: api.mcGatewayDelete, data, name: '商户网关删除' }),
  // 费率管理
  mcRuleList: (data, params) => fetch({ url: api.mcRuleList, data, params, name: '费率列表' }),
  mcRuleAdd: data => fetch({ url: api.mcRuleAdd, data, name: '费率新增' }),
  mcRuleUpdate: data => fetch({ url: api.mcRuleUpdate, data, name: '费率更新' }),
  mcRuleDelete: data => fetch({ url: api.mcRuleDelete, data, name: '费率删除' }),
  // 商户渠道列表
  mcChannelActivate: data => fetch({ url: api.mcChannelActivate, data, name: '编辑渠道激活' }),
  mcChannelAdd: data => fetch({ url: api.mcChannelAdd, data, name: '编辑渠道保存或者更新' }),
  mcChannelDeactivate: data => fetch({ url: api.mcChannelDeactivate, data, name: '编辑渠道下线' }),
  mcChannelDetail: (data, params) => fetch({ url: api.mcChannelDetail, data, params, name: '渠道详情列表' }),
  mcChannelUpdate: data => fetch({ url: api.mcChannelUpdate, data, name: '编辑渠道列表' }),
  mcChannelList: (data, params) => fetch({ url: api.mcChannelList, data, params, name: '渠道列表' }),
  // 商户产品管理
  mcProductList: (data, params) => fetch({ url: api.mcProductList, data, params, name: '商户产品列表' }),
  mcProductAdd: data => fetch({ url: api.mcProductAdd, data, name: '商户产品新增' }),
  mcProductUpdate: data => fetch({ url: api.mcProductUpdate, data, name: '商户产品更新' }),
  mcProductDelete: data => fetch({ url: api.mcProductDelete, data, name: '商户产品删除' }),
  mcProductAudit: data => fetch({ url: api.mcProductAudit, data, name: '商户产品审核' }),
  // 商户设备管理
  mcEquipmentList: (data, params) => fetch({ url: api.mcEquipmentList, data, params, name: '商户设备列表' }),
  mcEquipmentNewList: (data, params) => fetch({ url: api.mcEquipmentNewList, data, params, name: '商户设备信息列表' }),
  mcEquipmentAdd: data => fetch({ url: api.mcEquipmentAdd, data, name: '商户设备新增' }),
  mcEquipmentUpdate: data => fetch({ url: api.mcEquipmentUpdate, data, name: '商户设备更新' }),
  mcEquipmentDelete: data => fetch({ url: api.mcEquipmentDelete, data, name: '商户设备删除' }),
  // 服务商列表
  mcServiceAdd: (data, params) => fetch({ url: api.mcServiceAdd, data, params, name: '服务商新增' }),//服务商新增
  mcServiceAudit: data => fetch({ url: api.mcServiceAudit, data, name: '服务商审核' }),//服务商审核
  mcServiceDetail: data => fetch({ url: api.mcServiceDetail, data, name: '服务商详情' }),//服务商详情
  mcServiceList: data => fetch({ url: api.mcServiceList, data, name: '服务商列表' }),//服务商列表
  mcServiceUpdate: data => fetch({ url: api.mcServiceUpdate, data, name: '服务商更新' }),//服务商更新
  // 聚合支付
  // 订单信息 订单列表
  agOrderList: (data, params) => fetch({ url: api.agOrderList, data, params, name: '订单列表' }),
  agOrderNext: data => fetch({ url: api.agOrderNext, data, name: '续作' }),
  agOrderExcList: data => fetch({ url: api.agOrderExcList, data, name: '订单异常列表' }),
  agOrderExcDetail: data => fetch({ url: api.agOrderExcDetail, data, name: '订单异常明细' }),
  //退款列表
  agRefundList: (data, params) => fetch({ url: api.agRefundList, data, params, name: '退款订单列表' }),
  // 商户交易汇总
  agMcTradeList: (data, params) => fetch({ url: api.agMcTradeList, data, params, name: '商户交易汇总列表' }),
  agMcTradeTotal: data => fetch({ url: api.agMcTradeTotal, data, name: '商户交易汇总' }),
};

export default HTTP;