// 登录模块
export const login = '/login'; //登录
// 公共接口
export const comAgentList = '/common/agent/list'; //服务商列表
export const comBankList = '/common/bank/list'; //银行列表
export const comBranchbankList = '/common/branchbank/list'; //银行所属支行信息
export const comChannelnameList = '/common/channelname/list'; //通道名信息列表
export const comMerchantList = '/common/merchant/list'; //商户列表
export const comMaterielList = '/common/materiel/list'; //设备列表
export const comPaychannelList = '/common/paychannel/list'; //支付渠道列表
export const comPayprodlList = '/common/payprod/list'; //支付产品列表
export const comProvinceList = '/common/serviceParenter/province/list'; //服务商省份列表
export const comProductList = '/common/product/list'; //产品信息列表
export const comUserList = '/common/user/list'; //所属业务人员列表
export const comUploadPic = '/common/files/uploadPic'; //图片上传
export const comPicPath = '/common/picPath'; //图片地址信息
export const comGetPicPath = '/common/files/getPicPath'; //图片路径入库
export const comChannelIndustry = '/common/channel/industry';//渠道行业信息
export const comMerchantInfo = '/common/merchant/info';//商户信息
export const comChannelMerchantAarea = '/common/channel/merchant/area';//商户渠道地区（注册地址）
export const comChannelBank = '/common/channel/bank';//渠道银行信息
export const comChannelBankArea = '/common/channel/bank/area';//渠道银行地区信息
export const comReportChannel = '/common/report/channel';//报备渠道列表

//系统管理模块
// 部门管理
export const sysDeptList = '/sys/dept/list'; //部门列表
export const sysDeptSave = '/sys/dept/save'; // 新增
export const sysDeptUpdate = '/sys/dept/update'; // 更新
export const sysDeptDelete = '/sys/dept/delete'; //删除

// 菜单功能
export const sysMenuList = '/sys/function/list'; //列表
export const sysMenuAdd = '/sys/function/add'; //添加
export const sysMenuUpdate = '/sys/function/update'; //更新
export const sysMenuDelete = '/sys/function/delete'; //删除

// 角色管理
export const sysRoleList = '/sys/role/list'; //列表
export const sysRoleFn = '/sys/role/function'; //列表
export const sysRoleSave = '/sys/role/save'; //添加
export const sysRoleUpdate = '/sys/role/update'; //更新
export const sysRoleDelete = '/sys/role/delete'; //删除
export const sysRoleFnTree = '/sys/role/findRoleFunctionTree'; //角色权限列表

// 用户管理
export const sysUserList = '/sys/user/list'; //添加
export const sysUserAdd = '/sys/user/add'; //添加
export const sysUserUpdate = '/sys/user/update'; //更新
export const sysUserDelete = '/sys/user/delete'; //删除

// 商户管理模块
export const mcShopList = '/storeManage/list'; //列表
export const mcShopAdd = '/storeManage/add'; //新增
export const mcShopDelete = '/storeManage/delete'; //删除
export const mcShopUpdate = '/storeManage/update'; //修改
export const mcShopCode = '/storeManage/getQRCode'; //获取二维码
// export const mcShopList = '/storeManage/list';//列表
// export const mcShopList = '/storeManage/list';//列表

// 商户列表
export const mcMchList = '/merchantRegister/list'; //列表
export const mcMchAdd = '/merchantRegister/add'; //新增
export const mcMchUpdate = '/merchantRegister/update'; //更新
export const mcMchAudit = '/merchantRegister/audit'; //审核
export const mcMchDetail = '/merchantRegister/detail'; //详细
export const mcAllMchList = '/storeManage/merchantList'; //所有列表

// 商户报备管理
export const mcReportedAdd = '/reported/add'; //商户报备
export const mcReportedDetail = '/reported/detail'; //商户报备资料详细
export const mcReportedList = '/reported/list'; //商户报备列表
export const mcReportedStatus = '/reported/status'; //报备状态查询
export const mcReportedSuiXingDetail = '/reported/suiXing/detail'; //商户报备随行付资料详细
export const mcReportedFileUpload = '/reported/fileUpload'; //商户报备图片上传

// 收银员
export const mcCashierList = '/merchant/cashierManage/list'; //收银员列表
export const mcCashierAdd = '/merchant/cashierManage/add'; //收银员新增
export const mcCashierUpdate = '/merchant/cashierManage/update'; //收银员更新
export const mcCashierDelete = '/merchant/cashierManage/delete'; //收银员删除

//商户网关维护
export const mcGatewayList = '/merchantincontrol/list'; //商户网关列表
export const mcGatewayAdd = '/merchantincontrol/add'; //商户网关新增
export const mcGatewayUpdate = '/merchantincontrol/update'; //商户网关更新
export const mcGatewayDelete = '/merchantincontrol/delete'; //商户网关删除

//费率管理
export const mcRuleList = '/rule/list'; //费率列表
export const mcRuleAdd = '/rule/add'; //费率新增
export const mcRuleUpdate = '/rule/update'; //费率更新
export const mcRuleDelete = '/rule/delete'; //费率删除

// 商户渠道列表
export const mcChannelActivate = '/channel/activate'; //编辑渠道激活
export const mcChannelAdd = '/channel/add'; //编辑渠道保存或者更新
export const mcChannelDeactivate = '/channel/deactivate'; //编辑渠道下线
export const mcChannelDetail = '/channel/detail'; //渠道详情列表
export const mcChannelUpdate = '/channel/edit'; //编辑渠道列表
export const mcChannelList = '/channel/list'; //渠道列表

//商户产品管理
export const mcProductList = '/merchant/product/list'; //商户产品列表
export const mcProductAdd = '/merchant/product/add'; //商户产品新增
export const mcProductUpdate = '/merchant/product/update'; //商户产品更新
export const mcProductDelete = '/merchant/product/delete'; //商户产品删除
export const mcProductAudit = '/merchant/product/audit'; //商户产品审核

//商户设备管理
export const mcEquipmentList = '/merchant/equipment/list'; //商户设备列表
export const mcEquipmentNewList = '/merchant/equipment/newlist'; //商户设备信息列表
export const mcEquipmentAdd = '/merchant/equipment/add'; //商户设备新增
export const mcEquipmentUpdate = '/merchant/equipment/update'; //商户设备更新
export const mcEquipmentDelete = '/merchant/equipment/delete'; //商户设备删除
export const mcEquipmentAudit = '/merchant/equipment/audit'; //商户设备审核

// 服务商列表
export const mcServiceAdd = '/serviceParenter/add'; //服务商新增
export const mcServiceAudit = '/serviceParenter/audit'; //服务商审核
export const mcServiceDetail = '/serviceParenter/detail'; //服务商详情
export const mcServiceList = '/serviceParenter/list'; //服务商列表
export const mcServiceUpdate = '/serviceParenter/update'; //服务商更新

//聚合支付
//订单信息
//订单列表
export const agOrderList = '/aggregatepayment/orderinfo/orderinfolist'; //订单列表
export const agOrderExport = '/aggregatepayment/orderinfo/orderInfoExport'; //订单报表导出
export const agOrderExcList = '/aggregatepayment/orderinfo/orderExceptionList'; //订单异常列表
export const agOrderNext = '/aggregatepayment/orderinfo/nextstepoperation'; //续作
export const agOrderExcDetail = '/aggregatepayment/orderinfo/detailException'; //订单异常明细

// 退款列表
export const agRefundExport = '/aggregatepayment/orderinfo/orderRefundExport'; //退款订单报表导出
export const agRefundList = '/aggregatepayment/orderinfo/orderRefundList'; //退款订单列表

// 商户交易汇总
export const agMcTradeExport = '/merchanttrade/export'; //商户交易汇总导出
export const agMcTradeList = '/merchanttrade/list'; //商户交易汇总列表
export const agMcTradeTotal = '/merchanttrade/total'; //商户交易汇总
