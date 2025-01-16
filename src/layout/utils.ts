import { useSettingStore } from '@/store/modules/setting'

export default function useHooks() {
  const settingStore = useSettingStore()
  const fullScreen = ref<boolean>(false)

  /**
   * 切换全屏
   */
  function handleFullScreen() {
    if (fullScreen.value) {
      fullScreen.value = false
      document.exitFullscreen()
    } else {
      fullScreen.value = true
      document.documentElement.requestFullscreen()
    }
  }

  /**
   * 切换主题
   */
  function changeTheme(e) {
    // 获取到 transition API 实例
    const transition = document.startViewTransition(() => {
      settingStore.changeTheme()
      document.documentElement.classList.toggle('dark')
    })

    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = e

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY))
      const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]
      const isDark = document.documentElement.classList.contains('dark')
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: isDark ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
        }
      )
    })
  }

  return { handleFullScreen, changeTheme, fullScreen }
}
