<template>
  <div class="layout" :style="{ backgroundColor: token.colorBgContainer }">
    <div class="left">
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      <a-breadcrumb style="margin: 8px 0">
        <a-breadcrumb-item v-show="item.path !== '/' && item.name" v-for="(item, index) in route.matched" :key="index">
          {{ item.name }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="right">
      <!-- 刷新 -->
      <a-button @click="reload" shape="circle" :icon="h(RedoOutlined)"></a-button>
      <!-- 全屏 -->
      <a-button v-if="fullScreen" @click="handleFullScreen" shape="circle" :icon="h(FullscreenExitOutlined)"></a-button>
      <a-button v-else @click="handleFullScreen" shape="circle" :icon="h(FullscreenOutlined)"></a-button>
      <!-- 主题 -->
      <a-button @click="changeTheme" shape="circle">
        <SvgIcon v-if="theme === 'light'" name="dark" width="20" height="20" />
        <SvgIcon v-else name="light" width="20" height="20" />
      </a-button>
      <!-- 语言 -->
      <a-button @click="settingStore.changeLocal" shape="circle">
        <SvgIcon v-if="theme === 'light'" name="local" fill="#000" width="20" height="20" />
        <SvgIcon v-else name="local" fill="#f2f2f2" width="20" height="20" />
      </a-button>
      <!-- 头像 -->
      <a-dropdown>
        <a-avatar v-if="userStore.user.avatar" :size="32" :src="userStore.user.avatar"></a-avatar>
        <a-avatar v-else :size="32">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <span @click="logout">退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RedoOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import useHooks from './utils'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const settingStore = useSettingStore()
let { theme, local } = toRefs(settingStore.setting)
const route = useRoute()

defineProps(['reload'])
const collapsed = inject('collapsed')
const { handleFullScreen, changeTheme, fullScreen } = useHooks()

// 定制主题
import { theme as antdvTheme } from 'ant-design-vue'
import { loginApi } from '@/api/login'
const { useToken } = antdvTheme
const { token } = useToken()

// 退出登录
const $router = useRouter()
async function logout() {
  await loginApi.logout()
  // 重新登陆
  window.localStorage.removeItem('satoken')
  $router.replace('/login')
}
</script>

<style lang="scss" scoped>
.layout {
  height: 50px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
}
.left {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
  }
}
.right {
  margin-right: 1.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
}
</style>
