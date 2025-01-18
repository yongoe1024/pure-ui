import { defineStore } from 'pinia'
import type { User } from '../type'
import { userinfoApi } from '@/api/userinfo'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({} as User)

  async function init() {
    const userinfo = await userinfoApi.getUserInfo()
    user.value = userinfo
  }

  return { user, init }
})
