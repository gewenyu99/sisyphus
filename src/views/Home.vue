<script setup lang='ts'>

import Nav from '@/components/Nav.vue'
import Boulder from '@/components/Boulder.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router/index'
import { useAppwriteStore } from '@/stores/appwrite'

const appwrite = useAppwriteStore();
const { toast } = useToast()

if (!appwrite.isLoggedIn) {
    router.push('/login');
} else {
    toast({
    title: `Welcome, ${appwrite.user.name}`,
    description: 'One must imagine Sisyphus happy.',
})
}

</script>
<template>
    <div class="w-screen h-screen max-w-1000" v-if="appwrite.isLoggedIn">
        <Nav></Nav>
        <div class="flex flex-col items-center">
            <Boulder></Boulder>
        </div>
    </div>
</template>