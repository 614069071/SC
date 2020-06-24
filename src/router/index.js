import Vue from 'vue'
import Router from 'vue-router'
import { flatten } from '@/tools/utils'

Vue.use(Router)

import Home from '@/views/Home/Home'
import Login from '@/views/Login/Login'
import Error from '@/views/Error/Error';
import Welcome from '@/views/Welcome/Welcome'
// 系统管理
import Suser from '@/views/System/Suser/Suser'
const Role = () => import(/* webpackChunkName: "system" */ '@/views/System/Role/Role');
const Menu = () => import(/* webpackChunkName: "system" */ '@/views/System/Menu/Menu');
const Depart = () => import(/* webpackChunkName: "system" */ '@/views/System/Depart/Depart');
const TaskConfig = () => import(/* webpackChunkName: "system" */ '@/views/System/TaskConfig/TaskConfig');
const TaskLog = () => import(/* webpackChunkName: "system" */ '@/views/System/TaskLog/TaskLog');
const SmsLog = () => import(/* webpackChunkName: "system" */ '@/views/System/SmsLog/SmsLog');
const Test = () => import(/* webpackChunkName: "system" */ '@/views/System/Test/Test');
const Auth = () => import(/* webpackChunkName: "system" */ '@/views/System/Market/Auth/Auth');
const Group = () => import(/* webpackChunkName: "system" */ '@/views/System/Market/Group/Group');
// 异常列表
const Account = () => import(/* webpackChunkName: "abnormal" */ '@/views/Abnormal/Account/Account');
const Exchange = () => import(/* webpackChunkName: "abnormal" */ '@/views/Abnormal/Exchange/Exchange');
const Message = () => import(/* webpackChunkName: "abnormal" */ '@/views/Abnormal/Message/Message');
// 工作流管理
const Wuser = () => import(/* webpackChunkName: "Workflow" */ '@/views/Workflow/Wuser/Wuser');
const Wgroup = () => import(/* webpackChunkName: "Workflow" */ '@/views/Workflow/Wgroup/Wgroup');
// 交易管理
const Consumption = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Consumption/Consumption');
const Summary = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Summary/Summary');
const Recharge = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Recharge/Recharge');
const Revocation = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Revocation/Revocation');
const Refund = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Refund/Refund');
const Transfer = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Transfer/Transfer');
const Transactions = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Transactions/Transactions');
const RechargeRe = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/RechargeRe/RechargeRe');
const TransferRe = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/TransferRe/TransferRe');
const Merchants = () => import(/* webpackChunkName: "Trading" */ '@/views/Trading/Merchants/Merchants');
// 聚合支付
const Adaily = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Agent/Adaily/Adaily');
const Agreement = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Agent/Agreement/Agreement');
const Settlement = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Agent/Settlement/Settlement');
const Limit = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Merchants/Limit/Limit');
const Mdaily = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Merchants/Mdaily/Mdaily');
const Rate = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Merchants/Rate/Rate');
const Mrefund = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Merchants/Mrefund/Mrefund');
const Mexchange = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Merchants/Mexchange/Mexchange');
const Olist = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Order/List/List');
const Orefund = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Order/Orefund/Orefund');
const Pchannels = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Product/Channels/Channels');
const Pmanage = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Product/Manage/Manage');
const Exception = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Exception/Exception');
const Arouter = () => import(/* webpackChunkName: "Aggregate" */ '@/views/Aggregate/Router/Router');
// 物料管理
const Mmanage = () => import(/* webpackChunkName: "Material" */ '@/views/Material/Manage/Manage');
// 财务管理
const Fsettlement = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Settlement/Settlement');
const Fquery = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Query/Index');
const Reconcilia = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Reconcilia/Index');
const SourceData = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/SourceData/Index');
const Unionpay = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Unionpay/Index');
const Fabnormal = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Abnormal/Abnormal');
const Kingdee = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Kingdee/Index');
const Citic = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/Citic/Index');
const ReSummary = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/ReSummary/ReSummary');
const ErrorHand = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/ErrorHand/ErrorHand');
const ReSummaryV2 = () => import(/* webpackChunkName: "Financial" */ '@/views/Financial/ReSummaryV2/ReSummary');
// 码表维护
const Holiday = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Holiday/Holiday');
const Poundage = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Poundage/Poundage');
const Bank = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Bank/Bank');
const Certificate = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Certificate/Certificate');
const City = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/City/City');
const Problem = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Problem/Problem');
const Advertising = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Advertising/Advertising');
const Template = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Template/Template');
const Dictionary = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Dictionary/Dictionary');
const Ctrading = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Trading/Trading');
const Withdrawal = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Withdrawal/Withdrawal');
const Branch = () => import(/* webpackChunkName: "Clock" */ '@/views/Clock/Branch/Branch');
// 商户管理
const Gateway = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Gateway/Gateway');
const Protocol = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Protocol/Protocol');
const Mrate = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Rate/Rate');
const Maccount = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Account/Account');
const Mcashier = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Cashier/Cashier');
const Shop = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Shop/Shop');
const Mchannel = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Channel/Channel');
const Mlist = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/List/List');
// const Operation = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/List/Operation');
const Reported = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Reported/Reported');
const Mproduct = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Product/Product');
const Equipment = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Equipment/Equipment');
const Service = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Service/Service');
// const Soperation = () => import(/* webpackChunkName: "Merchants" */ '@/views/Merchants/Service/Operation');
// 客户管理
const Audit = () => import(/* webpackChunkName: "Customer" */ '@/views/Customer/Audit/Audit');
const Aulist = () => import(/* webpackChunkName: "Customer" */ '@/views/Customer/List/List');
const Caccount = () => import(/* webpackChunkName: "Customer" */ '@/views/Customer/Account/Account');
// 短信管理
const Smessage = () => import(/* webpackChunkName: "SMS" */ '@/views/SMS/Message/Message');
// 实名认证
const Clist = () => import(/* webpackChunkName: "Certification" */ '@/views/Certification/List/List');
const Cverify = () => import(/* webpackChunkName: "Certification" */ '@/views/Certification/Verify/Verify');
// 代理商管理
const Agents = () => import(/* webpackChunkName: "Agent" */ '@/views/Agent/Agents/Agents');
const Regist = () => import(/* webpackChunkName: "Agent" */ '@/views/Agent/Regist/Regist');
const MRegist = () => import(/* webpackChunkName: "Agent" */ '@/views/Agent/MRegist/MRegist');

const AgentsList = () => import( /* webpackChunkName: "Agent" */ '@/views/Agent/AgentsList/AgentsList');
const AgentsCheckList = () => import( /* webpackChunkName: "Agent" */ '@/views/Agent/AgentsCheckList/AgentsCheckList');
const AgentsReport = () => import( /* webpackChunkName: "Agent" */ '@/views/Agent/AgentsReport/AgentsReport');
const AgentsProtocol = () => import( /* webpackChunkName: "Agent" */ '@/views/Agent/AgentsProtocol/AgentsProtocol');
const AgentsMerchantsCheck = () => import( /* webpackChunkName: "Agent" */ '@/views/Agent/AgentsMerchantsCheck/AgentsMerchantsCheck');
const ServiceGisterCheck = () => import( /* webpackChunkName: "Agent" */ '@/views/Agent/ServiceGisterCheck/ServiceGisterCheck');



// UAT 后台菜单
export const uatRouter = [
  {
    name: '系统管理',
    path: '',
    children: [
      { name: '用户管理', path: '/system/suser', component: Suser },
      { name: '角色管理', path: '/system/role', component: Role },
      { name: '菜单管理', path: '/system/menu', component: Menu },
      { name: '部门管理', path: '/system/depart', component: Depart },
      { name: '任务调度配置', path: '/system/taskconfig', component: TaskConfig },
      { name: '任务调度日志', path: '/system/tasklog', component: TaskLog },
      { name: '短信邮件日志', path: '/system/smslog', component: SmsLog }
    ]
  },
  {
    name: '交易管理',
    path: '',
    children: [
      { name: '消费查询', path: '/trading/consumption', component: Consumption },
      { name: '商户交易汇总 ', path: '/trading/summary', component: Summary },
      { name: '充值查询', path: '/trading/recharge', component: Recharge },
      { name: '交易撤销', path: '/trading/revocation', component: Revocation },
      { name: '退款管理', path: '/trading/refund', component: Refund },
      { name: '转账管理', path: '/trading/transfer', component: Transfer },
      { name: '交易汇总查询', path: '/trading/transactions', component: Transactions },
      { name: '充值撤销管理', path: '/trading/rechargere', component: RechargeRe },
      { name: '转账撤销管理', path: '/trading/transferre', component: TransferRe },
      { name: '商户转账管理', path: '/trading/merchants', component: Merchants }
    ]
  },
  {
    name: '物料管理',
    path: '',
    children: [{ name: '物料管理', path: '/material/manage', component: Mmanage }]
  },
  {
    name: '聚合支付',
    path: '',
    children: [
      {
        name: '订单信息',
        path: '',
        children: [
          { name: '订单列表', path: '/aggregate/order/list', component: Olist },
          { name: '退款列表', path: '/aggregate/order/refund', component: Orefund }
        ]
      },
      { name: '订单异常列表', path: '/aggregate/exception', component: Exception },
      {
        name: '商户交易管理',
        path: '',
        children: [
          { name: '商户交易汇总', path: '/aggregate/merchants/mexchange', component: Mexchange }
        ]
      }
    ]
  },
  {
    name: '财务管理',
    path: '',
    children: [
      { name: '商户结算', path: '/financial/settlement', component: Fsettlement },
      { name: '财务查询', path: '/financial/query', component: Fquery },
      { name: '交广科技对账结果', path: '/financial/reconcilia', component: Reconcilia },
      { name: '渠道源数据', path: '/financial/source', component: SourceData },
      { name: '银联对账结果', path: '/financial/unionpay', component: Unionpay },
      { name: '财务异常处理', path: '/financial/abnormal', component: Fabnormal },
      { name: '金蝶财务', path: '/financial/kingdee', component: Kingdee },
      { name: '中信对账结果查询', path: '/financial/citic', component: Citic },
      { name: '对账汇总', path: '/financial/summary', component: ReSummary },
      { name: '差错处理', path: '/financial/error', component: ErrorHand },
      { name: '对账汇总（V2）', path: '/financial/summaryv2', component: ReSummaryV2 }
    ]
  },
  {
    name: '码表维护',
    path: '',
    children: [
      { name: '节假日管理', path: '/clock/holiday', component: Holiday },
      { name: '手续费管理', path: '/clock/poundage', component: Poundage },
      { name: '银行信息管理', path: '/clock/bank', component: Bank },
      { name: '证件管理', path: '/clock/certificate', component: Certificate },
      { name: '城市信息管理', path: '/clock/city', component: City },
      { name: '问题管理列表', path: '/clock/problem', component: Problem },
      { name: '首页广告维护', path: '/clock/advertising', component: Advertising },
      { name: '协议模板维护', path: '/clock/template', component: Template },
      { name: '数据字典', path: '/clock/dictionary', component: Dictionary },
      { name: '交易控制', path: '/clock/trading', component: Ctrading },
      { name: '提现控制', path: '/clock/withdrawal', component: Withdrawal },
      { name: '支行信息管理', path: '/clock/branch', component: Branch }
    ]
  },
  {
    name: '商户管理',
    path: '',
    children: [
      { name: '商户网关维护', path: '/merchants/gateway', component: Gateway },
      { name: '商户协议管理', path: '/merchants/protocol', component: Protocol },
      { name: '费率管理', path: '/merchants/rate', component: Mrate },
      { name: '商户账户管理', path: '/merchants/account', component: Maccount },
      { name: '收银员', path: '/merchants/cashier', component: Mcashier },
      { name: '门店管理', path: '/merchants/shop', component: Shop },
      { name: '商户渠道列表', path: '/merchants/mchannel', component: Mchannel },
      { name: '商户列表', path: '/merchants/list', component: Mlist },
      { name: '商户报备列表', path: '/merchants/reported', component: Reported },
      { name: '商户产品管理', path: '/merchants/product', component: Mproduct },
      { name: '商户设备管理', path: '/merchants/equipment', component: Equipment },
      { name: '服务商列表', path: '/merchants/service', component: Service }
    ]
  },
  {
    name: '客户管理',
    path: '',
    children: [
      { name: '证件审核管理', path: '/customer/audit', component: Audit },
      { name: '客户管理列表', path: '/customer/list', component: Aulist },
      { name: '客户账户管理', path: '/customer/account', component: Caccount }
    ]
  },
  {
    name: '短信管理',
    path: '',
    children: [{ name: '短信管列表', path: '/sms/message', component: Smessage }]
  },
  {
    name: '实名认证', path: '/system/user',
    children: [
      { name: '实名认证文件列表', path: '/certification/list', component: Clist },
      { name: '实名认证验证明细', path: '/certification/verify', component: Cverify }
    ]
  },
  {
    name: '代理商管理', path: '',
    children: [
      { name: '微商户列表', path: '/agent/agents', component: Agents },
      { name: '代理商注册', path: '/agent/regist', component: Regist },
      { name: '代理商商户注册', path: '/agent/mregist', component: MRegist },
      { name: '代理商列表', path: '/agent/agentList', component: AgentsList },
      { name: '代理商审核列表', path: '/agent/AgentsCheckList', component: AgentsCheckList },
      { name: '代理商报表', path: '/agent/AgentsReport', component: AgentsReport },
      { name: '代理商协议管理', path: '/agent/AgentsProtocol', component: AgentsProtocol },
      { name: '代理商商户审核列表', path: '/agent/AgentsMerchantsCheck', component: AgentsMerchantsCheck },
      { name: '服务商注册审核(新)', path: '/agent/ServiceGisterCheck', component: ServiceGisterCheck }
    ]
  }
];

// 菜单列表
export const menuRouter = [
  {
    name: '系统管理',
    path: '',
    children: [
      { name: '用户管理', path: '/system/suser', component: Suser },
      { name: '角色管理', path: '/system/role', component: Role },
      { name: '菜单管理', path: '/system/menu', component: Menu },
      { name: '部门管理', path: '/system/depart', component: Depart },
      { name: '任务调度配置', path: '/system/taskconfig', component: TaskConfig },
      { name: '任务调度日志', path: '/system/tasklog', component: TaskLog },
      { name: '短信邮件日志', path: '/system/smslog', component: SmsLog },
      { name: '测试', path: '/system/test', component: Test },
      {
        name: '市场部管理',
        path: '',
        children: [
          { name: '市场部权限', path: '/abnormal/market/auth', component: Auth },
          { name: '市场部分组管理', path: '/abnormal/market/group', component: Group }
        ]
      }
    ]
  },
  {
    name: '异常列表',
    path: '',
    children: [
      { name: '交广科技开户未明列表', path: '/abnormal/account', component: Account },
      { name: '交广科技交易未明列表', path: '/abnormal/exchange', component: Exchange },
      { name: '异常信息列表', path: '/abnormal/message', component: Message }
    ]
  },
  {
    name: '工作流管理',
    path: '',
    children: [
      { name: '工作流用户', path: '/workflow/wuser', component: Wuser },
      { name: '工作流用户组', path: '/workflow/wgroup', component: Wgroup }
    ]
  },
  {
    name: '交易管理',
    path: '',
    children: [
      { name: '消费查询', path: '/trading/consumption', component: Consumption },
      { name: '商户交易汇总', path: '/trading/summary', component: Summary },
      { name: '充值查询', path: '/trading/recharge', component: Recharge },
      { name: '交易撤销', path: '/trading/revocation', component: Revocation },
      { name: '退款管理', path: '/trading/refund', component: Refund },
      { name: '客户转账', path: '/trading/transfer', component: Transfer },
      { name: '交易汇总查询', path: '/trading/transactions', component: Transactions },
      { name: '充值撤销管理', path: '/trading/rechargere', component: RechargeRe },
      { name: '转账撤销管理', path: '/trading/transferre', component: TransferRe },
      { name: '商户转账', path: '/trading/merchants', component: Merchants }
    ]
  },
  {
    name: '聚合支付',
    path: '',
    children: [
      {
        name: '代理商交易管理',
        path: '',
        children: [
          { name: '代理商每日汇集', path: '/aggregate/agent/adaily', component: Adaily },
          { name: '代理商协议', path: '/aggregate/agent/Agreement', component: Agreement },
          { name: '代理商结算', path: '/aggregate/agent/Settlement', component: Settlement }
        ]
      },
      {
        name: '商户交易管理',
        path: '',
        children: [
          { name: '渠道金额限制', path: '/aggregate/merchants/limit', component: Limit },
          { name: '商户每日汇集数据', path: '/aggregate/merchants/mdaily', component: Mdaily },
          { name: '商户产品费率', path: '/aggregate/merchants/rate', component: Rate },
          { name: '商户退款', path: '/aggregate/merchants/refund', component: Mrefund },
          { name: '商户交易汇总', path: '/aggregate/merchants/mexchange', component: Mexchange }
        ]
      },
      {
        name: '订单信息',
        path: '',
        children: [
          { name: '订单列表', path: '/aggregate/order/list', component: Olist },
          { name: '退款列表', path: '/aggregate/order/refund', component: Orefund }
        ]
      },
      {
        name: '产品渠道',
        path: '',
        children: [
          { name: '支付渠道管理', path: '/aggregate/product/list', component: Pchannels },
          { name: '支付产品管理', path: '/aggregate/product/manage', component: Pmanage }
        ]
      },
      { name: '订单异常列表', path: '/aggregate/exception', component: Exception },
      { name: '渠道路由', path: '/aggregate/router', component: Arouter }
    ]
  },
  {
    name: '物料管理',
    path: '/system/user',
    children: [{ name: '物料管理', path: '/system/user' }]
  },
  {
    name: '财务管理',
    path: '/system/user',
    children: [
      { name: '商户结算', path: '/system/user' },
      { name: '财务查询', path: '/system/user' },
      { name: '交广科技对账结果', path: '/system/user' },
      { name: '渠道源数据', path: '/system/user' },
      { name: '银联对账结果', path: '/system/user' },
      { name: '财务异常处理', path: '/system/user' },
      { name: '金蝶财务', path: '/system/user' },
      { name: '中信对账结果查询', path: '/system/user' },
      { name: '代理商结算', path: '/system/user' },
      { name: '对账汇总', path: '/system/user' },
      { name: '差错处理', path: '/system/user' },
      { name: '对账汇总（V2）', path: '/system/user' }
    ]
  },
  {
    name: '交广科技信息查询',
    path: '/system/user',
    children: [
      { name: '持卡人信息', path: '/system/user' },
      { name: '卡账号信息', path: '/system/user' },
      { name: '交广科技交易结果', path: '/system/user' },
      { name: '交广科技应收应付查询', path: '/system/user' },
      { name: '交广科技对账/清算文件', path: '/system/user' }
    ]
  },
  {
    name: '银联交易查询',
    path: '/system/user',
    children: [
      { name: '银联交易结果查询', path: '/system/user' },
      { name: '银联交易应付查询', path: '/system/user' },
      { name: '银联对账/清算文件', path: '/system/user' }
    ]
  },
  {
    name: '码表维护',
    path: '/system/user',
    children: [
      { name: '节假日管理', path: '/system/user' },
      { name: '手续费管理', path: '/system/user' },
      { name: '银行信息管理', path: '/system/user' },
      { name: '证件管理', path: '/system/user' },
      { name: '城市信息管理', path: '/system/user' },
      { name: '问题管理列表', path: '/system/user' },
      { name: '首页广告维护', path: '/system/user' },
      { name: '协议模板维护', path: '/system/user' },
      { name: '数据字典', path: '/system/user' },
      { name: '交易控制', path: '/system/user' },
      { name: '提现控制', path: '/system/user' },
      { name: '支行信息管理', path: '/system/user' },
      { name: '渠道管理', path: '/system/user' },
      { name: '渠道控制管理', path: '/system/user' },
      { name: '渠道路由管理', path: '/system/user' },
      { name: '代付垫资费率信息管理', path: '/system/user' }
    ]
  },
  {
    name: '商户管理',
    path: '/system/user',
    children: [
      { name: '商户网关维护', path: '/system/user' },
      { name: '商户协议管理', path: '/system/user' },
      { name: '后台商户注册审核列表', path: '/system/user' },
      { name: '费率管理', path: '/system/user' },
      { name: '商户注册', path: '/system/user' },
      { name: '商户账户管理', path: '/system/user' },
      { name: '前台商户注册审核表', path: '/system/user' },
      { name: '商户列表', path: '/system/user' },
      { name: '代理商签约', path: '/system/user' },
      { name: '收银员', path: '/system/user' },
      { name: '门店管理', path: '/system/user' },
      { name: '商户报备查询', path: '/system/user' },
      { name: '商户报备', path: '/system/user' },
      {
        name: '商户渠道管理',
        path: '/system/user',
        children: [{ name: '商户渠道列表', path: '/system/user' }]
      },
      { name: '商户列表1', path: '/system/user' },
      { name: '商户列表（新）', path: '/system/user' },
      { name: '商户报备（新）', path: '/system/user' },
      { name: '商户报备选择', path: '/system/user' },
      { name: '商户交易详细', path: '/system/user' },
      { name: '商户列表（最新）', path: '/system/user' },
      { name: '服务商列表（最新）', path: '/system/user' },
      { name: '商户录入管理', path: '/system/user' },
      { name: '商户报备列表', path: '/system/user' },
      { name: '商户产品管理', path: '/system/user' },
      { name: '商户设备管理', path: '/system/user' },
      { name: '服务商列表', path: '/system/user' }
    ]
  },
  {
    name: '客户管理',
    path: '/system/user',
    children: [
      { name: '证件审核管理', path: '/system/user' },
      { name: '客户管理列表', path: '/system/user' },
      { name: '客户账户管理', path: '/system/user' }
    ]
  },
  {
    name: '我的工作空间',
    path: '/system/user',
    children: [
      { name: '我的申请单', path: '/system/user' },
      { name: '我的待办任务', path: '/system/user' },
      { name: '我的已审核', path: '/system/user' },
      { name: '所有任务', path: '/system/user' }
    ]
  },
  {
    name: '科目管理',
    path: '/system/user',
    children: [
      { name: '科目信息', path: '/system/user' },
      { name: '科目配置信息', path: '/system/user' },
      { name: '科目汇总', path: '/system/user' },
      { name: '内部账户管理', path: '/system/user' }
    ]
  },
  {
    name: '调账管理',
    path: '/system/user',
    children: [
      { name: '待办', path: '/system/user' },
      { name: '单边调账经办', path: '/system/user' },
      { name: '调账查询', path: '/system/user' },
      { name: '单边调账查询', path: '/system/user' }
    ]
  },
  {
    name: '短信管理',
    path: '/system/user',
    children: [{ name: '短信管列表', path: '/system/user' }]
  },
  {
    name: 'APP管理',
    path: '/system/user',
    children: [
      { name: 'APP登录页广告管理', path: '/system/user' },
      { name: '信用卡申请链接管理', path: '/system/user' }
    ]
  },
  {
    name: '社交',
    path: '/system/user',
    children: [
      { name: '红包列表', path: '/system/user' },
      { name: '红包详细信息列表', path: '/system/user' },
      { name: '红包对账结果', path: '/system/user' }
    ]
  },
  {
    name: '代理商管理', path: '/system/user',
    children: [
      { name: '代理商商户注册', path: '/system/user' },
      { name: '代理商商户列表', path: '/system/user' },
      { name: '代理商注册', path: '/system/user' },
      { name: '代理商列表', path: '/system/user' },
      { name: '代理商审核列表', path: '/system/user' },
      { name: '代理商报表', path: '/system/user' },
      { name: '代理商商户审核列表', path: '/system/user' },
      { name: '代理商协议管理', path: '/system/user' },
      { name: '代理商产品审核', path: '/system/user' },
      { name: '代理商商户审核', path: '/system/user' },
      { name: '服务商注册审核', path: '/system/user' },
      { name: '服务商注册审核(新)', path: '/system/user' }
    ]
  },
  {
    name: '实名认证', path: '/system/user',
    children: [
      { name: '文件列表', path: '/system/user' },
      { name: '验证明细', path: '/system/user' }
    ]
  },
  {
    name: '聚合支付对账', path: '/system/user',
    children: [
      { name: '对账文件列表', path: '/system/user' },
      { name: '对账结果', path: '/system/user' },
      { name: '渠道对账文件下载', path: '/system/user' }
    ]
  },
  {
    name: '学生管理', path: '/system/user',
    children: [{ name: '学生信息', path: '/system/user' }]
  },
  {
    name: '代付管理', path: '/system/user',
    children: [
      { name: '批量代付', path: '/system/user' },
      { name: '代付查询', path: '/system/user' },
      { name: '代付账户管理', path: '/system/user' },
      { name: '代付审核', path: '/system/user' },
      { name: '开通代付审核', path: '/system/user' },
      { name: '代付统计报表', path: '/system/user' },
      { name: '代付记录', path: '/system/user' },
      { name: '充值审核', path: '/system/user' },
      { name: '代付列表', path: '/system/user' },
      { name: '新增代付', path: '/system/user' },
      { name: '凭证审核列表(新)', path: '/system/user' },
      { name: '代付产品列表', path: '/system/user' },
      { name: '代付详细列表', path: '/system/user' },
      { name: '代付收益', path: '/system/user' },
      { name: '商户渠道', path: '/system/user' }
    ]
  }
];

// const menuRoutes = [...flatten(menuRouter), { path: '/welcome', component: Welcome }];//sitmg

const menuRoutes = [...flatten(uatRouter)];//uat

// 默认路由
const staticRouter = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/system',
    component: Home,
    children: menuRoutes.concat({ path: '/welcome', component: Welcome })
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*', component: Home, children: [
      { path: '*', component: Error },
      { path: '/error', component: Error }
    ]
  }
];

export default new Router({
  routes: staticRouter
})
