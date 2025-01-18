<template>
  <div class="layout">
    404
    <a-button type="text" @click="$router.back()">返回上页</a-button>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  gap: 20px;
  flex-direction: column;
  font-size: 3rem;
  font-weight: 600;
}
</style>
