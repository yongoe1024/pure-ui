import { defineStore } from 'pinia'
import type { Setting } from '../type'

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
//在根节点添加class
if (systemTheme === 'dark') document.documentElement.classList.add('dark')

export const useSettingStore = defineStore('setting', () => {
  const setting = ref<Setting>({
    theme: systemTheme,
    local: 'zh-CN'
  })

  function changeTheme() {
    if (setting.value.theme === 'light') {
      setting.value.theme = 'dark'
    } else {
      setting.value.theme = 'light'
    }
  }

  function changeLocal() {
    if (setting.value.local === 'zh-CN') {
      setting.value.local = 'en'
    } else {
      setting.value.local = 'zh-CN'
    }
  }

  return { setting, changeTheme, changeLocal }
})
