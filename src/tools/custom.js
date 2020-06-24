// 自定义插件
/* eslint-disable */
const custom = {
  install(vm, options) {
    vm.prototype.getStorage = key => {
      const value = localStorage.getItem(key);
      return JSON.parse(value) || '';
    }

    vm.prototype.setStorage = (key, value) => {
      if (typeof value === 'object' && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
      }
      localStorage.setItem(key, value);
    }
  }
}
/* eslint-enable*/
export default custom;