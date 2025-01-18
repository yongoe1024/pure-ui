import request from '@/utils/request'

export const userApi = {
  /**
   * 分页查询
   */
  page: query => request.get('/system/user/page', query),

  /**
   * 添加
   */
  add: user => request.post('/system/user/add', user),

  /**
   * 修改密码
   */
  updatePassword: (userId, newPassword) =>
    request.post(`/system/user/update/password?userId=${userId}&newPassword=${newPassword}`),

  /**
   * 修改用户
   */
  update: user => request.post('/system/user/update', user),

  /**
   * 删除 - 关联删除 ‘用户岗位’和‘用户角色’
   */
  delete: (ids: number[]) => request.post('/system/user/delete/' + ids)
}
