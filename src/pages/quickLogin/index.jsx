import { useState, useRef } from 'react';
import { View, Text,  Button } from '@tarojs/components';
import Taro, { useRouter, useDidHide } from '@tarojs/taro';
import BackIcon from '@/components/BackIcon';
import { getPhone, getPromotionInviteInfo } from '@/api';
import qs from 'qs';
import { setGlobalData } from '@/utils/global_data'
import { getLoginReturnUrl, showToast } from '@/utils';

import './index.less';

const QuickLogin = () => {
  const params = useRouter().params;
  const [agree, setAgree] = useState(false);
  const timerRef = useRef();
  const handleLogin = () => {
    Taro.navigateTo({
      url: `/pages/login/index?${qs.stringify(params)}`
    });
  };
  const handleShareActivity = async () => {
    // 如果用户已经登录
    let { code, data } = await getPromotionInviteInfo({ activityId: params.activityId, inviteCode: params.code });
    if (code === 200) {
      if (data.isAcceptInvitation != 1) {
        // 已经接受过赠票，点击微信内分享进入小程序时直接自动跳转到订单二维码页面
        Taro.reLaunch({
          url: `/pages/orderDetail/index?orderId=${data.orderId}`
        });
      } else {
        Taro.reLaunch({
          url: `/pages/shareCoupon/home/index?${qs.stringify(params)}`
        });
      }
    }
  };
  // 登录成功回调
  const loginSuccessCallback = () => {
    // 有邀请码
    if (params.code) {
      handleShareActivity();
    } else {
      getLoginReturnUrl();
    }
  };
  const handleGetPhone = (e) => {
    if (!agree) {
      showToast('请先阅读并同意协议');
      return;
    }
    const { encryptedData, code, iv } = e.detail;
    if(!code){
      showToast('手机号未授权');
      return 
    }
    const shopId = Taro.getStorageSync('shopId') || '';
    Taro.login({
      success: function (res) {
        if (res.code) {
          getPhone({
            sign: iv,
            encryptedData,
            shopId,
            code,
            jsCode: res.code
          }).then((result) => {
            showToast('授权成功');
            setGlobalData('token',result.data)
            loginSuccessCallback();
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  };
  useDidHide(() => {
    timerRef.current && clearInterval(timerRef.current);
  });
  return (
    <View className='mine_wrap_unlogin'>
      <BackIcon></BackIcon>
      <View className='over_wrap'>
        <Button open-type='getPhoneNumber' onGetPhoneNumber={handleGetPhone} className='login_btn'>
          手机号快捷登录
        </Button>
        {/* <View className='phone_login' onClick={handleLogin}>
          手机账号登录注册
        </View> */}
      </View>
      <View className='agreement'>
        <View
          onClick={() => {
            setAgree(!agree);
          }}
          className={`iconfont agree_icon ${agree ? 'iconfill' : 'iconstroke'}`}
        ></View>
        我已阅读并同意
        <Text
          className='xieyi'
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/agreement/index?type=3&title=用户协议`
            });
          }}
        >
          《用户协议》
        </Text>
        和
        <Text
          className='xieyi'
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/agreement/index?type=1&title=隐私政策`
            });
          }}
        >
          《隐私政策》
        </Text>
      </View>
    </View>
  );
};

export default QuickLogin;
