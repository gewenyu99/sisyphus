<script setup lang='ts'>

import { ref } from 'vue'
import Nav from '@/components/Nav.vue'

import { useToast } from '@/components/ui/toast'
import BouldersContainer from '@/components/BouldersContainer.vue';

const { toast } = useToast()

toast({
    title: `Welcome`,
    description: 'One must imagine Sisyphus happy.',
})
const open = ref(false);

</script>
<template>
    <div class="w-screen h-screen max-w-1000">
        <Nav></Nav>
        <BouldersContainer></BouldersContainer>
    </div>
</template>