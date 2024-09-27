<template>
  <el-dialog :model-value="modelValue" @close="$emit('close')" width="500" title="檢視帳號">
    <el-form
      v-loading="loading"
      :model="data"
      label-position="left"
      label-width="120"
      class="my-form"
    >
      <el-form-item label="帳號">
        {{ data?.UserName }}
      </el-form-item>
      <el-form-item label="名稱">
        {{ data?.ChiName }}
      </el-form-item>
      <el-form-item label="Email">
        {{ data?.Email }}
      </el-form-item>



      <el-form-item label="禁止名單">
        <span :class="data?.Lockout ? 'text-red-500' : ''">
          {{ showLockout(data?.Lockout) }}
        </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Info, { type response, type Permission } from './Service/Info';

defineEmits(['success', 'close']);

interface Prop {
  modelValue: boolean;
  id?: string;
  roles?: Awaited<ReturnType<typeof RolesLists>>;
}
const props = defineProps<Prop>();

const data = ref<response>();
const tableData = ref<Permission[]>();

const loading = ref(false);

const getInfo = async () => {
  try {
    if (!props.id) return;
    loading.value = true;
    const res = await Info(props.id);
    data.value = res;
    tableData.value = res.Permissions;
  } finally {
    loading.value = false;
  }
};

const showRole = (str: string) => {
  return (props.roles || []).find((o) => o.Name === str)?.DisplayNmae || '未知角色';
};



const showLockout = (Lockout?: boolean) => {
  return Lockout ? '已封鎖' : '未封鎖';
};

onMounted(async () => {
  await getInfo();
});
</script>
