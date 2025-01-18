import request from '@/utils/request'

export const userinfoApi = {
  /**
   * 获取当前登录用户信息
   */
  getUserInfo: () => request.get('/system/userinfo/info'),
  /**
   * 修改个人信息
   */
  updateUserInfo: () => request.put('/system/userinfo/update'),
  /**
   * 修改密码
   */
  updatePassword: () => request.put('/system/userinfo/password'),
  /**
   * 查询个人菜单
   */
  getMenu: () => request.get('/system/userinfo/menu')
}
