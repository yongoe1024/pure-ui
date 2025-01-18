<template>
  <div class="layout">
    <a-card style="width: 90%; height: 150px; margin-top: 1rem">
      <div class="card">
        <a-avatar v-if="userStore.user.avatar" :size="100" :src="userStore.user.avatar"></a-avatar>
        <a-avatar v-else :size="100">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div class="text">
          <span class="top">
            {{ getTimeOfDay() + '好，' + userStore.user.name }}
          </span>
          <span class="bottom">管理员</span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup name="Home">
const userStore = useUserStore()

/**
 *  获取当前时间段
 */
function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) {
    return '上午'
  } else if (hour < 14) {
    return '中午'
  } else if (hour < 18) {
    return '下午'
  } else {
    return '晚上'
  }
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  & .card {
    display: flex;
    gap: 2rem;
    align-items: center;
    width: 100%;
    height: 100%;
    & .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100px;
      .top {
        font-size: 2rem;
        font-weight: 800;
      }
      .bottom {
        font-size: 0.8rem;
        color: #4b9a8b;
        font-style: italic;
      }
    }
  }
}
</style>
