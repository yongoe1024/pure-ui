import { h } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { ItemType } from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import router from '@/router/index'
import type { Menu } from '../type'
import { generateTree } from '../utils'
import { userinfoApi } from '@/api/userinfo'

const viteModules = import.meta.glob('@/views/**/*.vue')
const IconData: Record<string, Component> = Icons

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<ItemType[]>([])
  const loading = ref<boolean>(false)

  const init = async () => {
    if (loading.value) {
      return
    }
    loading.value = true
    const res: Menu[] = await userinfoApi.getMenu()
    // 格式化菜单
    const menuData = generateTree(res, '0', 'menuId', 'parentId', 'children') as Menu[]
    menus.value = formatMenus(menuData)

    // 格式化路由
    const routeData = generateTree(res, '0', 'menuId', 'parentId', 'children') as Menu[]
    formatRoutes(routeData).forEach((route: any) => {
      router.addRoute('layout', route)
    })
  }

  return { menus, init, loading }
})

const formatMenus = (tree: any[]): ItemType[] => {
  const fmtMenus: ItemType[] = []

  tree.forEach(item => {
    if (item.menuType === '3') {
      return
    }
    // 判断 item.path是不是 http开头
    // 如果是，则渲染为a标签，target='_blank'
    const menuItem: any = {
      key: item.menuId + '',
      icon: () => h(IconData[item.icon || ' ']),
      children: []
    }
    if (item.path.startsWith('http://') || item.path.startsWith('https://')) {
      menuItem.label = h('a', { href: item.path, target: '_blank' }, item.name)
    } else {
      menuItem.label = item.name
      if (item.component) {
        if (item.embedded === '1') {
          menuItem.onClick = () => {
            router.push({
              path: item.path,
              query: item.query ? JSON.parse(item.query) : ''
            })
          }
        } else {
          menuItem.onClick = () => {
            const routeUrl = router.resolve({
              path: item.path,
              query: item.query ? JSON.parse(item.query) : ''
            })
            window.open(routeUrl.href, '_blank')
          }
        }
      }
    }
    if (item.children instanceof Array && item.children.length > 0) {
      menuItem.children = formatMenus(item.children)
    }
    if (item.menuType === '2') {
      delete menuItem.children
    }
    if (!item.icon) {
      delete menuItem.icon
    }
    fmtMenus.push(menuItem)
  })
  return fmtMenus
}

const formatRoutes = (list: Menu[]): RouteRecordRaw[] => {
  const fmtRoutes: RouteRecordRaw[] = []
  list.forEach(item => {
    const routeItem: any = {
      path: item.path,
      children: [],
      name: item.name,
      meta: {
        perms: [],
        query: item.query,
        keepAlive: item.keepAlive,
        menuType: item.menuType,
        icon: item.icon,
        visible: item.visible,
        embedded: item.embedded
      }
    }
    if (item.component) {
      // routeItem.name = item.name
      routeItem.component = viteModules['/src/views' + item.component + '.vue']
    }
    if (item.menuType === '3') {
      return
    }
    if (item.children instanceof Array && item.children.length > 0) {
      item.children.forEach(child => {
        if (child.menuType === '3') {
          routeItem.meta.perms.push(child.permission)
        }
      })

      routeItem.children = formatRoutes(item.children) // 递归
    }
    fmtRoutes.push(routeItem)
  })
  return fmtRoutes
}
