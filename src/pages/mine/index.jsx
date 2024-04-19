import { Component } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import Arrow from '@/assets/arrowRight.png';
import {
  listByPageSelf
} from '@/api/group'
import './index.less';

const MENUS = [
  {
    path: '/pages/feedback/index',
    icon: 'icona-icon48xie-stroke1',
    text: '反馈与建议'
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
const baseUrl = 'https://www.music999.cn';


export default class Mine extends Component {
  constructor() {
    super();
    this.state = {
      menus: MENUS,
      isAuth: false,
      mobile: '',
      userInfo: {},
      userName: '',
      titleBarHeight: 48,
      barHeight: 0,
      groupNum: 0,
      isLogin:false
    };
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
    this.getGroupList()
    this.handleGetUserAuthInfo();
  }
   getGroupList = async () => {
    const res = await listByPageSelf({
      offset: 0,
      pageSize: 100,
      groupName: '',
    });
    this.setState({
      groupNum: res.data.list.length
    })
  };
  handleGetUserAuthInfo() {
      let that = this;
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
              if(result.data.code == 0){
                 Taro.setStorageSync('token',result.data.data.token)
                 Taro.setStorageSync('userNick',result.data.data.userNick)
                 Taro.setStorageSync('userId',result.data.data.id)
                 that.setState({
                  userName: result.data.data.userNick,
                  isLogin: true
                 })
                 if(result.data.data.openid == 'ov27X5ZHKCmXLecOAKOtcR7L6tls'){
                  MENUS.push({
                    path: '/pages/shenHe/index',
                    icon: 'iconstroke3',
                    text: '审核'
                  })
                  that.setState({
                    menus: MENUS
                   })
                 }
              }
            });
          } else {
            console.log('登录失败！');
          }
        }
      });
  }

  handleClickMenu = (item) => {
    if (item.path) {
      Taro.navigateTo({
        url: item.path
      });
      return;
    }
  };
  onShareTimeline() {
    return {
      title: '群觅，这里有你想要的群',
      path: '/pages/home/index'
    };
  }
  onShareAppMessage() {
    return {
      title: '群觅，这里有你想要的群',
      path: '/pages/home/index'
    };
  }
  render() {
    const { menus, isAuth, userInfo, isLogin, userName,groupNum } = this.state;
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
              <Text>{userName || '神秘人'}</Text>
              {
                isLogin && <View className='editWrap' onClick={() => {
                  Taro.navigateTo({
                    url: '/pages/setting/userInfo/index'
                  })
                }}>
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
                <Text>我的群币</Text>
                <View className='iconfont icon  icona-icon48jifen'></View>
              </View>
              <View className='num'>{userInfo.point || 0}</View>
            </View>
            <View
              className='lix_coupon_box margin_box'
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/myGroupList/index'
                })
              }}
            >
              <View className='lix_coupon_box_top'>
                <Text>我的微群</Text>
                <View className='iconfont icon  iconwenzhang'></View>
                {/* <Image className="icon" src={ScoreIcon}></Image> */}
              </View>
              <View className='num'>{groupNum || 0}</View>
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
            <Button className='tel_box' openType='contact'> 
              <View className='iconfont tel_icon icona-icon48kefu'></View>
              <Text>商务合作</Text>
            </Button>
            <Button className='tel_box' openType='contact'
            > 
              <View className='iconfont tel_icon icona-pingjiaduihua'></View>
              <Text>联系客服</Text>
            </Button>
          </View>
          <View className='service_time'>服务时间10:00 - 20:00</View>
          <View className='service_time_b'>最终解释权归杭州菁菁网络科技有限公司所有</View>
        </View>
      </View>
    );
  }
}
