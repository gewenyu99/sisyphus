<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue';
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
mode.value = 'light';

import { useAppwriteStore } from '@/stores/appwriteService';

const appwrite = useAppwriteStore();

import { onBeforeMount } from 'vue';
import { LoaderCircleIcon } from 'lucide-vue-next';

onBeforeMount(async () => {
  await appwrite.init()
});
</script>
<template>
  <Toaster />
  <div class="flex items-center justify-center h-screen w-screen">
    <RouterView v-if="appwrite.load">
    </RouterView>
    <LoaderCircleIcon v-else class="w-12 h-12 text-primary-500 animate-spin" />
  </div>
</template>
