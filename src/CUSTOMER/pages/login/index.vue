<template>
  <div
    class="login-background flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-5"
    v-loading="loadingStatus"
  >
    <div
      class="mb-4 w-full max-w-[600px] rounded-2xl bg-white/70 p-5 md:p-10"
      style="box-shadow: 0px 4px 60px 0px #1c628a26"
    >
      <img src="@/CUSTOMER/assets/logo-text.svg" class="mx-auto mb-4" alt="logo" />
      <h2 class="mb-6 text-center text-2xl font-bold text-white md:text-4xl">
        <span
          class="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
        >
          水文監控系統
        </span>
      </h2>
      <el-form :model="loginForm" @submit.prevent="onLogin" class="grid gap-3">
        <div>
          <label for="account" class="mb-1 flex items-center gap-1"> 帳號 </label>
          <div>
            <el-input
              required
              v-model="loginForm.Email"
              placeholder="輸入帳號"
              id="account"
              autocomplete="username"
            />
          </div>
        </div>
        <div>
          <label for="password" class="mb-1 flex items-center gap-1"> 密碼 </label>
          <div>
            <el-input
              required
              v-model="loginForm.Password"
              id="password"
              type="password"
              placeholder="輸入密碼"
              autocomplete="current-password"
              show-password
            />
          </div>
        </div>
        <div>
          <el-checkbox id="saveAccount" v-model="saveAccount">記住帳號</el-checkbox>
        </div>
        <div class="flex items-center justify-center">
          <button
            class="focus:shadow-outline w-full rounded-full bg-gradient-to-r from-primary-500 to-primary-500 px-4 py-3 font-bold text-white hover:from-primary-700 hover:to-primary-700 focus:outline-none"
            type="submit"
          >
            登入
          </button>
          <input type="submit" class="no-show" style="display: none" />
        </div>
      </el-form>
    </div>
    <div class="fixed bottom-6 right-0 px-2 opacity-50">v{{ APP_VERSION }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import loginAPI from './Service/login';
import Logout from '@/CUSTOMER/Service/identity/Logout';
import me from './Service/me';
import { clearAuth } from '@/CUSTOMER/lib/auth';

export default defineComponent({
  name: 'DEFAULT',
  setup() {
    const data = reactive({
      loginForm: {
        Email: '',
        Password: ''
      },
      saveAccount: false,
      loadingStatus: false
    });
    const router = useRouter();
    const refData = toRefs(data);
    // 取得帳號
    function getSavedEmail() {
      return localStorage.getItem('Email');
    }

    // 保存帳號
    function saveEmail(Email: string) {
      localStorage.setItem('Email', Email);
    }

    // 清除帳號
    function clearSavedEmail() {
      localStorage.removeItem('Email');
    }

    const onLogin = async () => {
      if (data.saveAccount) {
        const loginForm_f = data.loginForm as any;
        saveEmail(loginForm_f.Email);
      } else {
        clearSavedEmail();
      }

      await handleLogin();
    };

    const goToHome = () => {
      const from = sessionStorage.getItem('fromPath') || '/histroy';
      router.push(from);
      sessionStorage.removeItem('fromPath');
      // TODO: 預設入口
      // try {
      //   const str = localStorage.getItem('getUserInfo') as string;
      //   const firstPermission = JSON.parse(str).Permissions[0] as { SubjectId: string };
      //   router.push(firstPermission.SubjectId);
      // } catch (error) {
      //   router.push('/iws');
      // }
    };

    const handleLogin = async () => {
      data.loadingStatus = true;

      try {
        await loginAPI(data.loginForm);
        await me();
        goToHome();
      } finally {
        data.loadingStatus = false;
      }
    };

    const APP_VERSION = import.meta.env.VITE_APP_VERSION;

    onMounted(() => {
      clearAuth();
      Logout();
      if (getSavedEmail()) {
        data.loginForm.Email = getSavedEmail() || '';
        data.saveAccount = true;
      }
    });
    return {
      onLogin,
      ...refData,
      APP_VERSION
    };
  }
});
</script>

<style lang="scss" scoped>
.login-background {
  background-image: url('./register_bg.svg');
}
</style>
