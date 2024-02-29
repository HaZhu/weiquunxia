export default {
  pages: [
    'pages/home/index', //首页
    'pages/mine/index', //我的
    'pages/myGroupList/index', //首页
    'pages/login/index', //登录页面
    'pages/smsCode/index', //短信页面
    'pages/newPhone/index', //更换手机页面
    'pages/feedback/index', //反馈与建议
    'pages/agreement/index', //隐私条款
    'pages/membershipCode/index', //会员码
    'pages/quickLogin/index', //快捷登录
    'pages/codePage/index', //二维码中转页面
    'pages/createGroup/index', //二维码中转页面
    'pages/edittGroup/index', //二维码中转页面
  ],
  subpackages: [
    {
      root: 'pages/setting',
      pages: ['index', 'accountSave/index', 'userInfo/index', 'about/index', 'userInfoResult/index']
    }
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff'
  },
  tabBar: {
    borderStyle: 'white',
    color: '#B4B9C1',
    selectedColor: '#2E2E2E',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/home_active.png',
        selectedIconPath: './assets/home.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/tabbar_mine.png',
        selectedIconPath: './assets/tabbar_mine_select.png'
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序使用',
    },
  },
  plugins: {
   
  },
  lazyCodeLoading: 'requiredComponents'
};
