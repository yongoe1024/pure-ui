<template>
  <a-config-provider
    :locale="setting.local === 'en' ? enUS : zhCN"
    :theme="{
      token: token,
      algorithm: algorithm
    }">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { useSettingStore } from '@/store/modules/setting'

// 系统配置：语言、主题
const { setting } = storeToRefs(useSettingStore())
// 主题算法，默认白天
const algorithm = ref(theme.defaultAlgorithm)

const token = ref({})

// 主题
watch(
  () => setting.value.theme,
  val => {
    if (val === 'dark') {
      algorithm.value = theme.darkAlgorithm
      token.value = {
        // 底色
        colorBgLayout: 'rgb(20,22,26)',
        // 容器颜色
        colorBgContainer: 'rgb(28,30,34)'
      }
    } else if (val === 'light') {
      algorithm.value = theme.defaultAlgorithm
      token.value = {
        colorText: '#333'
      }
    }
  },
  {
    immediate: true
  }
)
// 语言，dayjs时间需要单独设置
watch(
  () => setting.value.local,
  val => {
    if (val === 'en') {
      dayjs.locale('en')
    } else if (val === 'zh-CN') {
      dayjs.locale('zh-cn')
    }
  },
  {
    immediate: true
  }
)
</script>

<style></style>
