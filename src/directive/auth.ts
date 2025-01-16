import router from '@/router'
import type { Directive } from 'vue'

export const hasPerms: Directive = {
  mounted(el, binding) {
    // 传入的权限数组
    const arr: string[] = binding.value
    const perms = (router.currentRoute.value.meta.perms as Array<string>) || []
    for (let index = 0; index < perms.length; index++) {
      if (arr.includes(perms[index])) {
        return
      }
    }
    el.parentNode.removeChild(el)
  }
}
