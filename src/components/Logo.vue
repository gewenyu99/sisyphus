<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import image from "@/assets/logo.png"
defineProps({
    size: {
        type: String,
        default: 'md'
    }
})
</script>

<template>
    <Avatar :size="size"> 
        <AvatarImage :src="image" alt="Sisyphus logo"/>
        <AvatarFallback>Sisyphus logo</AvatarFallback>
    </Avatar>
</template>