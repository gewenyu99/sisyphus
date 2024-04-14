<script setup lang='ts'>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ChevronDown } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'

import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
import Logo from '../components/Logo.vue';
import { useAuthStore } from '@/stores/auth';
import router from '@/router'
const auth = useAuthStore();

const logout = async () => {
    await auth.logout();
    router.push('/login');
    toast({
        title: 'Goodbye',
        description: 'Hope to see you soon.',
    })
}

</script>

<template>
    <div class="grid grid-cols-2 border-b mb-8 sm:mx-8 md:mx-12 lg:mx-16">
        <a href="/" class="flex items-center m-4">
            <Logo size="sm" class="mx-2" />
            <h1 class="text-2xl">Sisyphus</h1>
        </a>

        <div class="flex justify-end" v-if="auth.user">
            <DropdownMenu class="m-4 w-56">
                <DropdownMenuTrigger as-child class="m-4">
                    <Button variant="link" class="text-l w-56 p-0 flex justify-start">
                        <ChevronDown class="w-4 h-4 mx-2" />
                        <p class="text-ellipsis overflow-hidden">Welcome, {{ auth.user.name }}</p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                    <DropdownMenuItem @click="logout">
                        <span>Logout</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="flex justify-end" v-else>
            <Skeleton class="m-4 w-56" />
        </div>
    </div>
</template>