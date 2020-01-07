import axios from 'axios'

const basePath = 'http://localhost:8090'
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${basePath}${url}`,
    data: params,
    transformRequest: [function (datas) {
      //Do whatever you want to transform the data
      let ret = ''
      for (let data in datas) {
        ret += encodeURIComponent(data) + '=' + encodeURIComponent(datas[data]) + '&'
      }
      return ret;
    }],
    headers: {
      //跨域
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
