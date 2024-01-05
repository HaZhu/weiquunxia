import { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Arrow from '@/assets/arrowRight.png';
import { getUserAuthInfo,getServiceTel } from '@/api';
import { setLoginReturnUrl,  setRequestRecord,  ShareIcon } from '@/utils/index';

import ShareLogoIcon from '@/assets/logo.png';
import './index.less';

const MENUS = [
  {
    path: '/pages/feedback/index',
    icon: 'icona-icon48xie-stroke1',
    text: '反馈与建议'
  },
  {
    path: '/pages/chooseType/index',
    icon: 'icona-icon128yishu',
    text: '赠票管理',
    id: 'ticket'
  },
  {
    path: '/pages/setting/index',
    icon: 'icona-icon48shezhi',
    text: '设置'
  }
];
const getTimeState = () => {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 设置默认文字
  let text = ``;
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    text = `早上好,`;
  } else if (hours > 10 && hours <= 14) {
    text = `中午好,`;
  } else if (hours > 14 && hours <= 18) {
    text = `下午好,`;
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好,`;
  }
  // 返回当前时间段对应的状态
  return text;
};

export default class Mine extends Component {
  constructor() {
    super();
    this.state = {
      menus: MENUS,
      isAuth: false,
      mobile: '',
      userInfo: {},
      titleBarHeight: 48,
      barHeight: 0,
    };
  }
  componentDidMount() {
    setRequestRecord();
  }
  componentDidShow() {
    const { statusBarHeight, platform } = Taro.getSystemInfoSync();
    if (platform == 'ios') {
      this.setState({
        barHeight: 44
      });
    }
    this.setState({
      barHeight: statusBarHeight
    });
    this.handleGetUserAuthInfo();
    this.handleGetServiceTel()
  }
  handleGetUserAuthInfo() {
    getUserAuthInfo().then((res) => {
      if (res.code === 200) {
        this.setState({
          userInfo: res.data
        });
        Taro.setStorageSync('userInfo', res.data);
        this.isLogin = true;
      } 
    })
  }
 openKefu = () => {
    Taro.openCustomerServiceChat({
      extInfo: {url: 'https://work.weixin.qq.com/kfid/kfc0dd51752a4264de6'},
      corpId: 'ww4f80bbb63adc3abd',
      success() {}
    })
  }
  handleClickMenu = (item) => {
    if (!this.isLogin) {
      // 获取一下当前页面路径及参数
      setLoginReturnUrl(item);
      Taro.navigateTo({
        url: '/pages/quickLogin/index'
      });
      return;
    }
    if (item.path) {
      Taro.navigateTo({
        url: item.path
      });
      return;
    }
  };
  handleGetServiceTel = () => {
    getServiceTel().then((res) => {
      if (res.code === 200) {
        this.setState({
          mobile: res.data.mobile
        });
        Taro.setStorageSync('serviceTel', res.data.mobile);
      }
    });
  };
  onShareTimeline() {
    return {
      title: '目里丨邀你参与精彩活动',
      imageUrl: ShareLogoIcon,
      path: '/pages/home/index'
    };
  }
  onShareAppMessage() {
    return {
      title: '目里丨邀你参与精彩活动',
      imageUrl: ShareIcon,
      path: '/pages/home/index'
    };
  }
  render() {
    const { menus, isAuth, userInfo, mobile } = this.state;
    return (
      <View className='mine_wrap'>
        <View className='mine_container' style={{ paddingTop: this.state.titleBarHeight + this.state.barHeight + 'px' }}>
          <View className='user_info'>
            <View className='user_info_title'>{getTimeState()}</View>
            <View
              className='user_name'
              onClick={() => {
                this.handleClickMenu({});
              }}
            >
              <Text>{userInfo.nickName ? userInfo.nickName : '点击登录'}</Text>
              {
                userInfo.nickName && <View className='editWrap'>
                    <View className='iconfont icona-icon48xie-stroke1'></View>
                </View>
              }
              
            </View>
          </View>
          <View className='lix_coupon_wrap'>
            <View
              className='lix_coupon_box'
            >
              <View className='lix_coupon_box_top'>
                <Text>里享币</Text>
                <View className='iconfont icon  icona-icon48jifen'></View>
              </View>
              <View className='num'>{userInfo.point || 0}</View>
            </View>
            <View
              className='lix_coupon_box margin_box'
            >
              <View className='lix_coupon_box_top'>
                <Text>卡券</Text>
                <View className='iconfont icon  icona-icon48youhuiquan'></View>
                {/* <Image className="icon" src={CouponIcon}></Image> */}
              </View>
              <View className='num'>{userInfo.couponCount || 0}</View>
            </View>
            <View
              className='lix_coupon_box'
            >
              <View className='lix_coupon_box_top'>
                <Text>订单</Text>
                <View className='iconfont icon  iconwenzhang'></View>
                {/* <Image className="icon" src={ScoreIcon}></Image> */}
              </View>
              <View className='num'>{userInfo.orderCount || 0}</View>
            </View>
          </View>
          <View className='menus'>
            {menus.map((item) => {
              return item.id === 'ticket' && !isAuth ? null : (
                <View className='menu' hoverClass='hover_light' key={item.text} onClick={() => this.handleClickMenu(item)}>
                  <View className='menu_left'>
                    <View className={`iconfont icon  ${item.icon}`}></View>
                    {item.text}
                  </View>
                  <View className='menu_right'>
                    <Image className='arrow' src={Arrow}></Image>
                  </View>
                </View>
              );
            })}
          </View>
          <View className='tel_wrap'>
            <View className='tel_box' onClick={() => this.openKefu()}> 
              <View className='iconfont tel_icon icona-icon48kefu'></View>
              <Text>在线客服</Text>
            </View>
            <View className='tel_box' onClick={() => {
                Taro.makePhoneCall({
                  phoneNumber: mobile
                });
            }}
            > 
              <View className='iconfont tel_icon icona-pingjiaduihua'></View>
              <Text>服务热线</Text>
            </View>
          </View>
          <View className='service_time'>服务时间10:00 - 20:00</View>
        </View>
      </View>
    );
  }
}
