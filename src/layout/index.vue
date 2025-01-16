<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider class="sider" v-model:collapsed="collapsed" breakpoint="lg" theme="light">
      <Sider :collapsed="collapsed"></Sider>
    </a-layout-sider>
    <a-layout class="content" :style="{ transition: 'all 0.3s', marginLeft: collapsed ? '80px' : '200px' }">
      <Header :reload="reload"></Header>

      <a-layout-content v-if="showContent" v-motion-slide-visible-once-left class="router-view">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>

      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup name="Layout">
import Sider from './sider.vue'
import Header from './header.vue'
import Footer from './footer.vue'
import { useUserStore } from '@/store/modules/user'

const collapsed = ref<boolean>(false)
const showContent = ref<boolean>(true)

provide('collapsed', collapsed)

onMounted(async () => {
  useUserStore().init()
})

/**
 * 刷新页面
 */
function reload() {
  showContent.value = false
  nextTick(() => {
    showContent.value = true
  })
}
</script>

<style scoped lang="scss">
.sider {
  z-index: 100;
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.content {
  overflow: auto;
}
.router-view {
  padding: 8px;
  border-radius: 8px;
}
</style>
