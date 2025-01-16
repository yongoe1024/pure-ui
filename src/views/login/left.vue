<template>
  <div class="bg">
    <SvgIcon class="bouncing" name="login" width="300" height="300" />
    <div style="font-size: 1.5rem">开箱即用的大型中后台管理系统</div>
    <div style="font-weight: 300">工程化、高性能、跨组件库的前端模版</div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #070709;
  line-height: 2rem;
  color: white;
  gap: 1rem;
}
.bouncing {
  animation: bounce 3s infinite ease-in-out;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
