<template>
  <div>
    <aside class="flex justify-end gap-3">
      |
      <div>
        使用者： <strong class="text-primary">{{ username }}</strong>
      </div>

      <template v-if="$slots.default">
        |
        <slot></slot>
      </template>
    </aside>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useUserInfoStore } from '@/CUSTOMER/pinia/userInfo';

defineEmits(['sidebarChanged']);

const userInfoStore = useUserInfoStore();
const username = computed(() => userInfoStore.userInfo.UserName);
</script>
