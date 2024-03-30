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

import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
import { useAppwriteStore } from '@/stores/appwriteService'
import Logo from '../components/Logo.vue';
const appwrite = useAppwriteStore();

toast({
    title: `Welcome, ${appwrite.user.name}`,
    description: 'One must imagine Sisyphus happy.',
})

</script>

<template>
    <div class="grid grid-cols-2 border-b mb-8 sm:mx-8 md:mx-12 lg:mx-16">
        <a href="/" class="flex items-center m-4">
            <Logo size="sm" class="mx-2" />
            <h1 class="text-2xl">Sisyphus</h1>
        </a>

        <div class="flex justify-end">
            <DropdownMenu class="m-4 w-56">
                <DropdownMenuTrigger as-child class="m-4">
                    <Button variant="link" class="text-l w-56 p-0 flex justify-start">
                        <ChevronDown class="w-4 h-4 mx-2" />
                        <p class="text-ellipsis overflow-hidden">Welcome, {{ appwrite.user.name }}</p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                    <DropdownMenuItem>
                        <span>Logout</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>@/stores/appwriteService