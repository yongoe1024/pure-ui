/**
 * axios请求封装
 * @author yongoe
 * @since 2024/8/23
 */
import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'

/**
 * 服务器返回类型
 */
interface R {
  code: number
  message: string
  data: any
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
})

instance.interceptors.request.use(config => {
  const satoken = window.localStorage.getItem('satoken')
  if (satoken) {
    config.headers['satoken'] = satoken
  }
  return config
})

instance.interceptors.response.use(
  response => {
    const responseData: R = response.data
    if (responseData.code === 200) {
      if (responseData.message) {
        message.success(responseData.message)
      }
      return responseData.data
    } else if (responseData.code === 401) {
      // 重新登陆
      window.localStorage.removeItem('satoken')
      router.replace('/login')
    }
    message.error(responseData.message ? responseData.message : '服务器错误')
    return Promise.reject(responseData)
  },
  error => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

class Request {
  get(url: string, params?: any) {
    return instance.get<any, any>(url, { params })
  }

  post(url: string, data?: any) {
    return instance.post<any, any>(url, data)
  }

  put(url: string, data?: any) {
    return instance.put<any, any>(url, data)
  }

  delete(url: string, params?: any) {
    return instance.delete<any, any>(url, { params })
  }
}

export default new Request()
