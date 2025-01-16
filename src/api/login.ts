import request from '@/utils/request'

export const loginApi = {
  /**
   * 登录
   */
  login: (data: any) => request.post('/auth/login', data),
  /**
   * 退出登录
   */
  logout: () => request.post('/auth/logout'),
  /**
   * 注册
   */
  register: () => request.post('/auth/register')
}
