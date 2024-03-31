<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'

import { ref } from 'vue'
import Nav from '@/components/Nav.vue'
import Boulder from '@/components/Boulder.vue'
import CreateBoulder from '@/components/CreateBoulder.vue'

import router from '@/router/index'
import { useAppwriteStore } from '@/stores/appwriteService'
import { Plus, PlusCircle } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'

const appwrite = useAppwriteStore();
const { toast } = useToast()

toast({
    title: `Welcome`,
    description: 'One must imagine Sisyphus happy.',
})
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
            <Boulder v-for="boulder in appwrite.boulders" :key="boulder.id" 
            :boulderId="boulder.id" :push="appwrite.pushBoulder"></Boulder>
            <Card class="max-w-[74.5rem] w-full inline-block p-2 h-48 
                flex justify-center items-stretch text-slate-400 
                border border-dashed border-x-0
                rounded-none border-slate-400 
                hover:border-y-2 hover:bg-green hover:rounded-none 
                sm:rounded-md sm:hover:rounded-md sm:border-slate-400 
                sm:border-x sm:hover:border-x-2">
                <Button as-child variant="ghost" size="icon" @click="() => { open = true }">
                    <div class="flex flex-col grow justify-center items-center h-full">
                        <Plus class="w-8 h-8" />
                        <p class="text-lg">One more boulder</p>
                    </div>
                </Button>
            </Card>
            <CreateBoulder :open=open
                @update:open="(state) => { open = state;}" />
        </div>
    </div>
</template>@/stores/appwriteService