import Taro, { getStorageSync } from '@tarojs/taro';
import { setLoginReturnUrl } from '@/utils';
import qs from 'qs';
import { getGlobalData,setGlobalData } from '@/utils/global_data'

let baseUrl = 'http://182.254.145.172:8080/';
// let baseUrl = 'http://121.40.138.127:30003';
// if (process.env.ENV === 'test' || process.env.ENV === 'development') {
//   baseUrl = 'http://121.40.138.127:30003';
// }
const noLoginPage = ['/pages/home/index', '/pages/manyou/home/index'];
let isRefreshing = true;
let pendings = [];
// , '/service-market/market/promotion/getPromotionConfig'
const baseUrlArr = ['/service-user/wechat/getQrSceneByCode']
const request = (options = { method: 'GET', data: {}, contentType: 'application/json' }) => {
  const data = {
    ...(options.data || {})
  };
  let headers = {
    'Content-Type': options.contentType || 'application/json',
    // token: "301181dafda04ebc97d3afe40e642000",
    token:  baseUrlArr.includes(options.url) ? getStorageSync('token') : getGlobalData('token'),
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
          const ROUTER = Taro.getCurrentInstance().router;
          const RESPONROUTE = ['/pages/home/index','/pages/mine/index']
          if (res.data.code === 501) {
            if(options.url == '/service-user/user/clearUserInfo' && (RESPONROUTE.includes(ROUTER.path))){
              resolve('清除个人信息');
            }else{
              pendings.push(() => {
                resolve(request({ ...options }));
              });
            }
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
          url: baseUrl + `/service-user/user/v2/isLogin?jsCode=${r.code}`,
          data: qs.stringify({
            jsCode: r.code
          }),
          header: {
            'Content-Type': 'application/json',
            token: getGlobalData('token'),
            locale: 'zh_CN'
          },
          mode: 'cors',
          method: 'POST'
        }).then((result) => {
          if (result.data.code == 200) {
            if (result.data.data) {
              setGlobalData('token', result.data.data);
              isRefreshing = true;
              pendings.map((callback) => {
                callback();
              });
            } else {
              const ROUTER = Taro.getCurrentInstance().router;
              if (!noLoginPage.includes(ROUTER.path)) {
                Taro.showModal({
                  title: '温馨提示',
                  content: '前往授权获取更好体验',
                  success: function (res) {
                    if (res.confirm) {
                      isRefreshing = true;
                      pendings = [];
                      setLoginReturnUrl();
                      Taro.navigateTo({
                        url: '/pages/quickLogin/index'
                      });
                    } else {
                      isRefreshing = true;
                      pendings = [];
                    }
                  }
                });
              } else {
                isRefreshing = true;
                pendings = [];
              }
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
