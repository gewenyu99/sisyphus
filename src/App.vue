<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.png';

import { useAppwriteStore } from '@/stores/appwrite'

const appwrite = useAppwriteStore()
appwrite.init()

</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="rounded-xl flex flex-col justify-center items-center">
      <header>
        <nav class="border-gray-200 rounded flex items-space-between w-full p-0 m-0">
          <img :src="logo" class="h-32 m-0 p-0" alt="Sisyphus Logo" />
          <span class="self-center text-black text-5xl font-semibold whitespace-nowrap">SISYPHUS</span>
        </nav>
      </header>
      <RouterView />
    </div>
  </div>
</template>