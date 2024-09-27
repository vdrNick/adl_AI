<template>
  <div>
    <button @click="dialogChangePassword = true" class="menu-btn">變更密碼</button>
    <button @click="logout" class="menu-btn">登出</button>
    <changePassword
      :model-value="dialogChangePassword"
      @close="dialogChangePassword = false"
    ></changePassword>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { clearAuth } from '@/CUSTOMER/lib/auth';
import changePassword from './changePassword.vue';
import Logout from '@/CUSTOMER/Service/identity/Logout';
import { useRouter } from 'vue-router';

const router = useRouter();

const dialogChangePassword = ref(false);

const logout = async () => {
  clearAuth();
  router.push('/');
  Logout();
};
</script>

<style lang="scss" scoped src="./menu.scss"></style>
