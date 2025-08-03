<template>
  <div>
    <h1>Password Login</h1>
    <div>
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginAccount } from '@/api'

const username = ref('')
const password = ref('')

const login = () => {
  loginAccount({ username: username.value, password: password.value }).then(res => {
    console.log(res)
  })
}
</script>