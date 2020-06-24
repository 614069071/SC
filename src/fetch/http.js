import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { Loading, Message } from 'element-ui';
import { lstorage } from '@/tools/utils';

const isProd = process.env.NODE_ENV === 'production';
const cancelToken = axios.CancelToken;
const source = cancelToken.source();

axios.defaults.baseURL = isProd ? '/v2' : 'api';
axios.defaults.timeout = 60000;

axios.interceptors.request.use(
  config => {
    const url = config.url;
    const isLogin = /login/g.test(url);

    if (isLogin) {
      return config;
    } else {
      if (store.state.token) {
        config.headers.token = store.state.token;
        config.headers.loginId = store.state.userinfo.loginId;
        return config;
      } else {
        router.push('/login');
      }
    }
  },
  err => Promise.reject(err)
)

axios.interceptors.response.use(response => {
  const newToken = response.headers.newtoken

  if (newToken) {
    store.commit('setToken', newToken);
    const userinfo = lstorage.get('userinfo');
    userinfo.token = newToken;
    lstorage.set('userinfo', userinfo);
  }

  if (response.data.code === '888') {
    Message.warning({
      message: '会话超时，请重新登录',
      onClose() {
        router.push('/login');
      }
    });
  }

  if (response.data.code != '200') {
    Message.warning(response.data.msg);
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Message.error('错误请求')
        break
      case 401:
        Message.error('未授权，请重新登录')
        break
      case 403:
        Message.error('拒绝访问')
        break
      case 404:
        Message.error('请求错误,未找到该资源')
        break
      case 405:
        Message.error('请求方法未允许')
        break
      case 408:
        Message.error('请求超时')
        break
      case 500:
        Message.error('服务器端出错')
        break
      case 501:
        Message.error('网络未实现')
        break
      case 502:
        Message.error('网络错误')
        break
      case 503:
        Message.error('服务不可用')
        break
      case 504:
        Message.error('网络超时')
        break
      case 505:
        Message.error('http版本不支持该请求')
        break
      default:
        Message.error(`连接错误${err.response.status}`)
    }
  } else {
    Message.error('连接到服务器失败')
  }
  return Promise.reject(err.response)
})

export default ({
  url = '',
  method = 'post',
  data = {},
  name = '',
  params = {}
}) => {
  const getData = { url, method, params, name, cancleToken: source.token };
  const posData = { url, method, data, params, name, cancleToken: source.token };
  const _ops = method.toUpperCase() === 'GET' ? getData : posData;
  const loading = Loading.service();

  return new Promise((resolve, reject) => {
    axios(_ops)
      .then(res => {
        resolve(res.data);
        loading.close();
        console.groupCollapsed(`[${method.toUpperCase()}] [${name}] `, res.data);
        console.log(`%c${JSON.stringify(_ops, '\t')}`, 'font-style:italic;color:red');
        console.log(`%c${JSON.stringify(data, params, null, '\t')}`, 'font-style:italic;color:#666');
        console.log(`%c${JSON.stringify(res.data, null, '\t')}`, 'color:green');
        console.groupEnd();
      })
      .catch(err => {
        reject(err);
        loading.close();
        console.log(`[${method}] [${name}] `, err && err.statusText);
      })
  })
}
