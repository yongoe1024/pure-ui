// 解决vite svg 路径问题
import 'virtual:svg-icons-register'
import { createApp, type Directive } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import { MotionPlugin } from '@vueuse/motion'
import pinia from '@/store/index'
// 引入 antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// 引入图标组件
import * as Icons from '@ant-design/icons-vue'
// 导入公共样式
import '@/styles/index.scss'

const app = createApp(App)
// 遍历引入图标组件
const IconData: Record<string, Component> = Icons
Object.keys(IconData).forEach((key: string) => {
  app.component(key, IconData[key])
})

// 自定义指令
import * as directives from '@/directive'
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(pinia)
app.use(router)
app.use(MotionPlugin)
app.use(Antd).mount('#app')
