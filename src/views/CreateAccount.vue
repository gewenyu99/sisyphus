<script setup>
import { ref } from 'vue'
import { useAppwriteStore } from '@/stores/appwrite'
import { useRouter } from 'vue-router'

const appwrite = useAppwriteStore()
const router = useRouter() // Get access to the router instance

const email = ref('');
const password = ref('');
const name = ref('');

if (appwrite.authState === 'complete') {
    router.push('/boulders') // Navigate to /boulders
}

const handleCreateAccount = async (event) => {
    event.preventDefault();
    if (appwrite.authState === 'none') {
        let response = await appwrite.createAccount(email.value, password.value, name.value);
    }
    else if ((appwrite.authState === 'created')) {
        console.log(appwrite.user.profile)
    }
    else if ((appwrite.authState === 'complete')) {
        console.log(appwrite.user.profile)
    }
}
</script>

<template>
<form class="flex flex-col container mt-4" @submit.prevent="handleCreateAccount">
        <input type="text" v-model="name" placeholder="Name"
            class="border-b border-sisyphus-grey bg-transparent text-sisyphus-grey px-4 py-2 mb-2 outline-none placeholder-sisyphus-grey-light">
        <input type="email" v-model="email" placeholder="Email"
            class="border-b border-sisyphus-grey bg-transparent text-sisyphus-grey px-4 py-2 mb-2 outline-none placeholder-sisyphus-grey-light">
        <input type="password" v-model="password" placeholder="Password"
            class="border-b border-sisyphus-grey bg-transparent text-sisyphus-grey px-4 py-2 mb-2 outline-none placeholder-sisyphus-grey-light">
        <button type="submit" class="bg-sisyphus-grey text-white border border-gray-300 rounded px-6 py-3 mt-2">
            Create account
        </button>
    </form>
    <div class="flex justify-start w-full mt-4"> <!-- Add mt-4 or any other number to increase the space -->
        <router-link to="/login" class="text-black mt-2 text-lg underline font-normal">
            Already have an account?
        </router-link>
    </div>
</template>