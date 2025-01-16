<template>
  <div class="loginbox">
    <h2 id="simpleUsage"></h2>
    <p>请输入您的账户信息以开始管理项目</p>
    <a-form v-motion-slide-visible-once-top class="form" ref="formRef" :model="form" :rules="rules" @keyup.enter="handleSubmit">
      <a-form-item name="username">
        <a-input size="large" v-model:value="form.username" autocomplete="off" placeholder="账号">
          <template v-slot:prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password size="large" v-model:value="form.password" autocomplete="off" placeholder="密码">
          <template v-slot:prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button :loading="loading" size="large" type="primary" @click="handleSubmit()">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import TypeIt from 'typeit'
import { loginApi } from '@/api/login'
import { Rule } from 'ant-design-vue/es/form/interface'
import { openNotification } from './utils'

const $router = useRouter()

onMounted(() => {
  new TypeIt('#simpleUsage', {
    strings: ['欢迎回来 👋🏻'],
    speed: 100,
    cursor: false
  }).go()
})

const formRef = ref()
const loading = ref<boolean>(false)
const form = ref({
  username: '',
  password: ''
})

const rules: Record<string, Rule[]> = reactive({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ]
})

/**
 * 登录提交
 */
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    try {
      loading.value = true
      const token = await loginApi.login({
        username: form.value.username,
        password: form.value.password
      })
      window.localStorage.setItem('satoken', token)
      openNotification()
      $router.replace('/')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.loginbox {
  padding: 2rem;
  background-color: rgb(20, 22, 26);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  color: #fff;
  h2 {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  & form {
    margin-top: 2rem;
    width: 100%;
  }
  & button {
    width: 100%;
  }
  & input {
    width: 100%;
  }
}
</style>
