<template>
  <svg aria-hidden :width="width" :height="height">
    <use :xlink:href="symbolId" :fill="myFill" :width="width" :height="height" />
  </svg>
</template>

<script lang="ts" setup>
const settingStore = useSettingStore()
/**
 * 输入属性             类型                默认值              是否必选                描述
 *  name              string             undefined              是                  svg图标名字
 *  width             number                19                  否                  svg图标宽度
 *  height            number                19                  否                  svg图标高度
 *  fill              string              #ffffff               否                  svg图标填充颜色
 */
const {
  name,
  width = '19',
  height = '19',
  fill = ''
} = defineProps<{
  name: string
  width?: string
  height?: string
  fill?: string
}>()
const myFill = ref(fill)

// 获取svg图标名称，需要和vite.config.ts中的配置保持一致
const symbolId = computed(() => `#icon-${name}`)
</script>

<style scoped></style>
