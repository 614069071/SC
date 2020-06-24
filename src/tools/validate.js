import { Message } from 'element-ui';

export function checkNull(type = '输入', rule, value, callback) {
  if (!value) {
    Message.error(`手机号不能为空`);
    return callback(new Error(`${type}不能为空`));
  }
  callback();
}

//验证银行卡格式
export function isBankCard(rule, value, callback) {
  if (!parseInt(value[0]) || value.length < 8 || value.length > 30) {
    Message.error('请输入正确的银行卡号');
    return callback(new Error('请输入正确的银行卡号'));
  }
  callback();
}
/************************************ 
* (1)电话号码由数字和－组成 /^[1][3589]\d{9}$/;
* (2)电话号码为 7 到 13 位
* (3)手机号码必须为 11 位
************************************/
export function isPhoneNo(rule, value = '', callback) {
  var reg = /^[1][3589]\d{9}$/;

  if (value.length === 11) {
    if (!reg.test(value)) {
      Message.error(`请输入正确的手机号`);
      return callback(new Error(`请输入正确的手机号`));
    } else {
      return callback();
    }
  } else {
    Message.error('请输入正确的11位手机号');
    callback(new Error('请输入正确的11位手机号'));
  }
}

// 邮箱校验
export function isEmail(rule, value = '', callback) {
  var pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  /*var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;*/
  var flag = pattern.test(value);

  if (flag) {
    return callback();
  } else {
    Message.error('请输入正确的邮箱');
    return callback(new Error('请输入正确的邮箱'));
  }
}


/**
 * 验证营业执照注册号
*/
export function isBusCode(rule, value = '', callback) {
  if (value.length == 15) {
    var s = [];
    var p = [];
    var a = [];
    var m = 10;
    p[0] = m;
    for (var i = 0; i < value.length; i++) {
      a[i] = parseInt(value.substring(i, i + 1), m);
      s[i] = (p[i] % (m + 1)) + a[i];
      if (0 == s[i] % m) {
        p[i + 1] = 10 * 2;
      } else {
        p[i + 1] = (s[i] % m) * 2;
      }
    }

    if ((s[14] % m) == 1) {
      //营业执照编号正确! 
      return callback();
    } else {
      //营业执照编号错误!
      Message.error('营业执照编号错误');
      return callback(new Error('营业执照编号错误'));
    }
  } else if (value == '') {
    return callback();
  } else {
    Message.error('请输入正确的营业执照编号');
    return callback(new Error('请输入正确的营业执照编号'));
  }
}

