import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
import { baseRoutes } from './data'
import { isPathMatch } from './utils'

// 隐藏加载logo
NProgress.configure({ showSpinner: false })

const router = createRouter({
  // 默认hash模式
  history: createWebHashHistory(),
  routes: baseRoutes
})

const whiteList = ['/login', '/register']

const isWhiteList = path => {
  return whiteList.some(pattern => isPathMatch(pattern, path))
}

// 路由前置守卫
router.beforeEach(async (to, _from, next) => {
  const menuStore = useMenuStore()
  NProgress.start()
  if (window.localStorage.getItem('satoken')) {
    // 已登录
    if (!menuStore.loading) {
      // 菜单未加载
      await menuStore.init()
      // 动态添加路由，解决菜单未加载完，页面刷新404的问题
      router.addRoute({
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        redirect: '/404'
      })
      next({ ...to, replace: true })
    } else {
      // 禁止访问登录页
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    }
  } else {
    // 未登录
    if (isWhiteList(to.path)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(to => {
  // 动态修改标题
  let title = import.meta.env.VITE_APP_TITLE
  if (to.name) {
    title = `${title}-${to.name as string}`
  }
  document.title = title
  NProgress.done()
  const menuStore = useMenuStore()
  // 如果已加载菜单，重新登录时刷新页面，清空信息
  if (to.path === '/login' && menuStore.loading) {
    router.clearRoutes()
    window.location.reload()
  }
})
export default router
