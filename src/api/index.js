import request from '@/utils/request';
// 是否有手机号
export const hasMobile = (data) =>
  request({
    url: `/service-user/user/hasMobile`,
    method: 'POST',
    data
  });
// 手机号一键登录
export const login = (data) =>
  request({
    url: `/service-user/user/login`,
    method: 'POST',
    data
  });
// 获取用户信息
export const getUserInfo = (data) =>
  request({
    url: `/service-user/user/my/personalDetails`,
    method: 'GET',
    data
  });
// 获取用户实名信息
export const getUserAuthInfo = (data) =>
  request({
    url: `/service-user/user/getUserInfo`,
    method: 'GET',
    data
  });
// 获取用户实名信息
export const clearUserInfo = (data) =>
  request({
    url: `/service-user/user/clearUserInfo`,
    method: 'GET',
    errHideMsg: true,
    data
  });
// 客服电话
export const getServiceTel = (data) =>
  request({
    url: `/service-user/user/my/set`,
    method: 'GET',
    data
  });
// 实名
export const realname = (data) =>
  request({
    url: `/service-user/user/realname`,
    method: 'POST',
    data
  });

// 我的积分
export const getMyPoint = (data) =>
  request({
    url: `/service-third/third/point/list`,
    method: 'POST',
    data
  });
// 我的积分
export const getPointStatus = (data) =>
  request({
    url: `/service-third/third/wechat/getPointStatus`,
    method: 'GET',
    data
  });
// 我的订单
export const getMyOrder = (data) =>
  request({
    url: `/service-market/market/activity/order/order/list`,
    method: 'GET',
    data
  });
// 我的订单
export const getMyOrderV2 = (data) =>
  request({
    url: `/service-market/market/activity/order/order/list/v2`,
    method: 'GET',
    data
  });
// 删除我的订单
export const deleteOrder = (data) =>
  request({
    url: `/service-market/market/activity/order/order/deleteById`,
    method: 'POST',
    data
  });
  export const deleteOrderV2 = (data) =>
  request({
    url: `/service-market/market/activity/order/order/deleteById/v2`,
    method: 'POST',
    data
  });
// 取消我的订单
export const cancelOrder = (data) =>
  request({
    url: `/service-market/market/activity/order/cancel`,
    method: 'POST',
    data
  });
// 取消我的订单
export const cancelOrderV2 = (data) =>
  request({
    url: `/service-market/market/activity/order/cancel/v2`,
    method: 'POST',
    data
  });
// 获取订单详情
export const getOrderDetail = (data) =>
  request({
    url: `/service-market/market/activity/order/detail`,
    method: 'GET',
    data
  });
// 获取订单详情
export const getOrderDetailV2 = (data) =>
  request({
    url: `/service-market/market/activity/order/detail/v2`,
    method: 'GET',
    data
  });
// 活动列表
export const getActvList = (data) =>
  request({
    url: `/service-market/market/activity/list`,
    method: 'GET',
    data
  });
// 获取活动日期
export const getActvDate = (data) =>
  request({
    url: `/service-market/market/activity/date`,
    method: 'GET',
    data
  });
// 获取活动详情
export const getActvDetail = (data) =>
  request({
    url: `/service-market/market/activity/details`,
    method: 'GET',
    data
  });
// 查询待支付订单
export const getWaitPay = (data) =>
  request({
    url: `/service-market/market/activity/order/getWaitPay`,
    method: 'GET',
    data
  });
// 查询待支付订单
export const getWaitPayV2 = (data) =>
  request({
    url: `/service-market/market/activity/order/getWaitPay/v2`,
    method: 'GET',
    data
  });
// 查询票务日期
export const getTicketDate = (data) =>
  request({
    url: `/service-market/market/activity/ticket/date`,
    method: 'GET',
    data
  });
// 根据日期查询票务详情
export const getTicketDetails = (data) =>
  request({
    url: `/service-market/market/activity/ticket/details`,
    method: 'GET',
    data
  });
// app端点击预约
export const toReserve = (data) =>
  request({
    url: `/service-market/market/activity/order/toReserve`,
    method: 'POST',
    data
  });
// 获得票务购买价格
export const getTicketBuyPrice = (data) =>
  request({
    url: `/service-market/market/activity/getTicketBuyPrice`,
    method: 'GET',
    data
  });
// 去支付，获取微信支付参数
export const toPay = (data) =>
  request({
    url: `/service-market/market/activity/order/toPay`,
    method: 'POST',
    data
  });
// 去支付，获取微信支付参数
export const toPayV2 = (data) =>
  request({
    url: `/service-market/market/activity/order/toPay/v2`,
    method: 'POST',
    data
  });
// 分享权限
export const hasSharePermission = (data) =>
  request({
    url: `/service-market/market/promotion/hasSharePermission`,
    method: 'POST',
    data
  });
// 查询活动的邀请成功列表
export const getPromotionSuccessList = (data) =>
  request({
    url: `/service-market/market/promotion/getPromotionSuccessList`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data
  });
// 查询分享活动的信息
export const getPromotionInfo = (data) =>
  request({
    url: `/service-market/market/promotion/getPromotionInfo`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data
  });
// 获取职业类别
export const getProfessionList = (data) =>
  request({
    url: `/service-market/market/promotion/getProfessionList`,
    method: 'GET',
    data
  });
// 邀请赠票
export const promotionInvite = (data) =>
  request({
    url: `/service-market/market/promotion/promotionInvite`,
    method: 'POST',
    contentType: 'application/json',
    data
  });
// 分享成功接口
export const shareWeixinFriendCount = (data) =>
  request({
    url: `/service-market/market/promotion/shareWeixinFriendCount`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data
  });
// 判断手机号已经接受邀请
export const isAcceptArtInvition = (data) =>
  request({
    url: `/service-market/market/promotion/isAcceptArt`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data
  });
// 用户中心分享权限列表
export const getPermissionConfigList = (data) =>
  request({
    url: `/service-market/market/promotion/getPermissionConfigList`,
    method: 'GET',
    data
  });
// 用户中心分享权限列表
export const getPromotionConfig = (data) =>
  request({
    url: `/service-market/market/promotion/getPromotionConfig`,
    method: 'GET',
    data
  });
// 用户中心分享权限列表
export const isJNBYOrOoeliEmployee = (data) =>
  request({
    url: `/service-market/market/promotion/isJNBYOrOoeliEmployee`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data
  });
// 发送短信
export const sendSms = (data) =>
  request({
    url: `/service-user/user/sms/sendSms`,
    method: 'POST',
    data
  });
// APP登录/注册入口,支持手机号登录
export const loginV2 = (data) =>
  request({
    url: `/service-user/user/v2/login`,
    method: 'POST',
    data
  });
// 校验老手机号是否正确
export const checkOriginPhone = (data) =>
  request({
    url: `/service-user/user/v2/check/origin/phone`,
    method: 'POST',
    data
  });
// 换绑手机号
export const updatePhone = (data) =>
  request({
    url: `/service-user/user/v2/update/phone`,
    method: 'POST',
    data
  });
// 用户是否填写过邀请活动信息
export const getUserInviteExtendInfo = (data) =>
  request({
    url: `/service-market/market/promotion/getUserInviteExtendInfo`,
    method: 'GET',
    data
  });
// 换绑手机号
export const getPhone = (data) =>
  request({
    url: `/service-user/user/getPhone`,
    method: 'POST',
    data
  });
// 提交建议
export const adviceSave = (data) =>
  request({
    url: `/service-user/advice/save`,
    method: 'POST',
    data
  });
// 删除账户
export const userRemove = (data) =>
  request({
    url: `/service-user/user/remove`,
    method: 'POST',
    data
  });
// 保存用户信息
export const userSave = (data) =>
  request({
    url: `/service-user/user/save`,
    method: 'POST',
    data
  });
// 查询邀请赠票信息
export const getPromotionInviteInfo = (data) =>
  request({
    url: `/service-market/market/promotion/getPromotionInviteInfo`,
    method: 'GET',
    data
  });
// 消息提醒
export const subscribeMessage = (code) => {
  request({
    url: `/service-user/user/subscribeMessage?code=${code}`,
    method: 'POST'
  });
};

// 页面埋点
export const requestRecord = (data) => {
  request({
    url: `/service-user/user/requestRecord`,
    method: 'POST',
    data
  });
};

export const userLogout = (data) =>
  request({
    url: `/service-user/user/logout`,
    method: 'POST',
    data
  });