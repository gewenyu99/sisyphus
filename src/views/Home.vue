<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { ref } from 'vue'
import Nav from '@/components/Nav.vue'
import Boulder from '@/components/Boulder.vue'
import CreateBoulder from '@/components/CreateBoulder.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router/index'
import { useAppwriteStore } from '@/stores/appwriteService'
import { PlusCircle } from 'lucide-vue-next'

const appwrite = useAppwriteStore();
const { toast } = useToast()

const open = ref(false);
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
    <div class="w-screen h-screen max-w-1000 " v-if="appwrite.isLoggedIn">
        <Nav></Nav>
        <div class="flex flex-col items-center sm:mx-8 md:mx-12 lg:mx-16">
            <Boulder></Boulder>
            <Card
                class="max-w-[74.5rem] w-full inline-block px-4 py-2 h-48 border-2 border-dashed </Card>border-slate-400 flex justify-center items-stretch">
                <Button as-child variant="outline" size="icon" class="flex flex-col grow justify-evenly items-center"
                    @click="() => { open = true }">
                    <PlusCircle class="w-16 h-16 text-slate-400" />
                    <p class="text-lg text-muted text-slate-400">One more boulder</p>
                </Button>
                <CreateBoulder :open=open @update:open="(state) => { open = state }"
                    @submit="(boulder) => { appwrite.newBoulder(boulder) }" />
            </Card>
        </div>
    </div>
</template>@/stores/appwriteService