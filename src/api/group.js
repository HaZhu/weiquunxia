import request from '@/utils/request';
// 创建群
export const groupCreate = (data) =>
  request({
    url: `/group/create`,
    method: 'POST',
    data
  });
// 编辑群
export const editCreate = (data) =>
  request({
    url: `/group/edit`,
    method: 'POST',
    data
  });
// 分页查询群信息
export const groupListByPage = (data) =>
  request({
    url: `/group/listByPage`,
    method: 'POST',
    data
  });
// 分页查询群信息
export const listByPageSelf = (data) =>
  request({
    url: `/group/listByPageSelf`,
    method: 'POST',
    data
  });
// 编辑昵称
export const userEdit = (data) =>
  request({
    url: `/wx/user/edit`,
    method: 'POST',
    data
  });
// 群详情信息
export const groupDetail = (data) =>
  request({
    url: `/group/detail`,
    method: 'GET',
    data
  });
// 标签列表
export const tagList = (data) =>
  request({
    url: `/tag/list`,
    method: 'GET',
    data
});