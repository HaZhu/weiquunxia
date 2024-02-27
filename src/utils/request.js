import Taro, { getStorageSync } from '@tarojs/taro';
import { setLoginReturnUrl } from '@/utils';
import qs from 'qs';

let baseUrl = 'https://www.music999.cn';
// let baseUrl = 'http://121.40.138.127:30003';
// if (process.env.ENV === 'test' || process.env.ENV === 'development') {
//   baseUrl = 'http://121.40.138.127:30003';
// }
let isRefreshing = true;
let pendings = [];
const request = (options = { method: 'GET', data: {}, contentType: 'application/json' }) => {
  const data = {
    ...(options.data || {})
  };
  let headers = {
    'Content-Type': options.contentType || 'application/json',
    token:  Taro.getStorageSync('token'),
    locale: 'zh_CN'
  };
  return new Promise((resolve, reject) => {
    Taro.request({
      url: (options.baseUrl || baseUrl) + options.url,
      data: options.contentType === 'application/x-www-form-urlencoded' ? qs.stringify(data) : data,
      header: headers,
      mode: 'cors',
      method: options.method.toUpperCase()
    })
      .then((res) => {
        const { statusCode} = res;
        if (statusCode !== 200 || (res.data.code && res.data.code !== 200)) {
          if (res.data.code === 501) {
            pendings.push(() => {
              resolve(request({ ...options }));
            });
            if (isRefreshing) {
              updateToken(options);
              isRefreshing = false;
            }
          } else {
            if(options.errHideMsg){
               resolve(res.data);
            }else{
              setTimeout(() => {
                Taro.showToast({
                  title: res.data && res.data.msg ? res.data.msg : `网络请求错误`,
                  icon: 'none',
                  duration: 3000
                });
              }, 200);
            }
          }
        } else {
          resolve(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
};

const updateToken = () => {
  Taro.login({
    success: function (r) {
      if (r.code) {
        Taro.request({
          url: baseUrl + `/wx/user/login?code=${r.code}`,
          header: {
            'Content-Type': 'application/json',
            locale: 'zh_CN'
          },
          mode: 'cors',
          method: 'GET'
        }).then((result) => {
          if (result.data.code == 200) {
            if (result.data.data) {
              Taro.setStorageSync('token', result.data.data);
              isRefreshing = true;
              pendings.map((callback) => {
                callback();
              });
            } else {
              isRefreshing = true;
              pendings = [];
            }
          }
        });
      } else {
        console.log('登录失败！');
      }
    }
  });
};
export default request;
