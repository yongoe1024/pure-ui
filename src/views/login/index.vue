<template>
  <div class="layout">
    <div class="logo">
      <SvgIcon name="logo" width="30" height="30" />
      <div>PURE UI</div>
    </div>
    <a-row>
      <a-col :xs="0" :sm="0" :md="14" :lg="14" :xl="18">
        <Left></Left>
      </a-col>
      <a-col :xs="24" :sm="24" :md="10" :lg="10" :xl="6">
        <Right></Right>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup name="Login">
import Left from './left.vue'
import Right from './right.vue'
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  .logo {
    z-index: 10;
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 500;
    font-size: 1.25rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    gap: 1rem;
  }
}
</style>
