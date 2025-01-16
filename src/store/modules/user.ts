import { userApi } from '@/api/system/user'
import { defineStore } from 'pinia'
import type { User } from '../type'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({} as User)

  async function init() {
    const userinfo = await userApi.getUserInfo()
    user.value = userinfo
  }

  return { user, init }
})
