<script setup>
import { ref } from 'vue'
import { useAppwriteStore } from '@/stores/appwrite'
import { useRouter } from 'vue-router'

const appwrite = useAppwriteStore()
const router = useRouter()

if (appwrite.authState === 'complete') {
    router.push('/boulders') // Navigate to /boulders
}
</script>

<template>
  <div class="flex flex-col items-start w-full m-0 p-4">
    <router-link to="/create-account" class="text-black mt-2 text-lg underline font-normal">
      Create account
    </router-link>
    <router-link to="/login" class="text-black mt-2 text-lg underline font-normal">
      Login
    </router-link>
  </div>
</template>
