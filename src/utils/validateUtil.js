export const validateMail = (rule, value, callback) => {
  var filter = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/;
  // /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else if (filter.test(value)) {
    callback();
  } else {
    callback(new Error('邮箱格式不正确'));
  }
};
export const validateMailVerifyCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用邮箱验证码'));
  } else {
    callback();
  }
};
export const validateMobilePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('负责人手机号不可为空'));
  } else {
    if (value !== '') {
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'));
      }
    }
    callback();
  }
};
export const validateWeixin = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('微信号不能为空'));
  } else {
    var reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的微信号码'));
    } else {
      callback();
    }
  }
};
