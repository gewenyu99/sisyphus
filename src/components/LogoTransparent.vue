<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import image from "@/assets/logo-md.png"
defineProps({
    size: {
        type: String,
        default: 'md'
    }
})
</script>

<template>
    <Avatar :size="size" style="background: transparent;"> 
        <AvatarImage :src="image" alt="Sisyphus logo" style="background: transparent;"/>
        <AvatarFallback>Sisyphus logo</AvatarFallback>
    </Avatar>
</template>