export const lstorage = {
  set: (key, value) => {
    if (typeof value === 'object' && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    localStorage.setItem(key, value);
  },
  get: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : '';
  }
}

export const sstorage = {
  set: (key, value) => {
    if (typeof value === 'object' && value !== null) {
      sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }
    sessionStorage.setItem(key, value);
  },
  get: (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

export const preview = function (file) {
  const fileReader = new FileReader();
  let src = '';
  if (URL.createObjectURL) {
    src = URL.createObjectURL(file);
  } else {
    src = fileReader.readAsDataURL(file);
  }
  return src;
}

export const flatten = function (arr) {
  const arr2 = [];

  function deal(obj) {
    const dealArr = Object.values(obj);
    dealArr.forEach(e => {
      if (Array.isArray(e) && e.length) {
        e.forEach(ele => {
          if (ele.children && ele.children.length) {
            deal(ele);
          } else {
            arr2.push(ele);
          }
        });
      }
    });
  }
  arr.forEach(ele => deal(ele));
  return arr2.flat();
}

// 递归判断列表，把最后的children为空的设为undefined
export const getTreeData = (data) => {
  for (var i = 0; i < data.length; i++) {
    if (data[i].functionTreeVOS && data[i].functionTreeVOS.length) {
      getTreeData(data[i].functionTreeVOS);
    } else {
      data[i].functionTreeVOS = undefined;
    }
  }

  return data;
}

// 将数据展开
export const dealTree = (arr = [], str = '') => {
  let atr = [];
  function deal(arr, str) {
    arr.forEach(({ functionId, functionTreeVOS, checked }) => {
      let str1 = str ? str + '-' + functionId : functionId;
      if (checked && functionTreeVOS && functionTreeVOS.length) {
        deal(functionTreeVOS, str1);
      } else {
        if (checked) {
          atr.push(str1.split('-'));
        }
      }
    });
  }

  deal(arr, str);
  return atr;
}

// 统一格式
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 序列化时间
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-');
}