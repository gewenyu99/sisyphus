<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue';
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
mode.value = 'light';

</script>
<template>
  <Toaster />
    <div class="flex items-center justify-center h-screen w-screen">
      <RouterView />
    </div>
</template>
