import { SmileOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'

/**
 *  获取当前时间段
 */
export function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) {
    return '上午'
  } else if (hour < 14) {
    return '中午'
  } else if (hour < 18) {
    return '下午'
  } else {
    return '晚上'
  }
}

/**
 *  打开通知,欢迎回来
 */
export const openNotification = () => {
  notification.open({
    message: `Hi，${getTimeOfDay()}好`,
    description: '欢迎回来',
    icon: () => h(SmileOutlined, { style: 'color: #00CC00' })
  })
}
