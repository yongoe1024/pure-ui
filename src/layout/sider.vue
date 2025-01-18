<template>
  <div>
    <div class="logo">
      <div class="svg"><SvgIcon name="logo" width="20" height="20" /></div>
      <span v-if="!collapsed">PURE UI</span>
    </div>
    <a-config-provider
      :theme="{
        token: token
      }">
      <a-menu
        theme="light"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        :items="menuData"></a-menu>
    </a-config-provider>
  </div>
</template>

<script lang="ts" setup>
const collapsed = inject('collapsed')
const userMenu = useMenuStore()

const selectarr = JSON.parse(window.localStorage.getItem('selectedKeys') || '[]')
// 选择的菜单
const selectedKeys = ref<string[]>(selectarr || [])
const openarr = JSON.parse(window.localStorage.getItem('openKeys') || '[]')
// 打开的菜单
const openKeys = ref<string[]>(openarr || [])
const menuData = ref<MenuProps['items']>(userMenu.menus)
// 菜单打开信息保存
watchEffect(() => {
  window.localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys.value))
  window.localStorage.setItem('openKeys', JSON.stringify(openKeys.value))
})

const token = ref({})
const { setting } = storeToRefs(useSettingStore())
// 主题
watch(
  () => setting.value.theme,
  val => {
    if (val === 'dark') {
      token.value = {
        //菜单选中背景
        colorPrimaryBg: '#384043',
        //菜单选中字体颜色
        colorPrimary: 'rgb(255, 255, 255)'
      }
    } else {
      token.value = {
        //菜单选中背景 浅蓝色
        colorPrimaryBg: 'rgb(221, 231, 251)'
      }
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.logo {
  padding: 0.5rem;
  font-weight: 500;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  line-height: 1;
  .svg {
    margin-left: 20px;
    margin-right: 20px;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
