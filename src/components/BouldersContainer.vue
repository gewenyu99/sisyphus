<script setup lang='ts'>
import { Button } from '@/components/ui/button';
import { useBoulders, type Boulder as BoulderType } from '@/stores/boulders';
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import CreateBoulder from '@/components/CreateBoulder.vue'
import { PlusCircle } from 'lucide-vue-next';
import { onBeforeMount } from 'vue';
import Boulder from './Boulder.vue';
import { usePushes } from '@/stores/pushes';

const bouldersStore = useBoulders()
const pushesStore = usePushes()
const { boulders } = storeToRefs(bouldersStore)

onBeforeMount(() => {
    bouldersStore.load()
    pushesStore.load()
})

const open = ref(false)
</script>

<template>
    <div class="flex flex-col items-center sm:mx-8 md:mx-12 lg:mx-16">
        <Boulder v-for="boulder in boulders" :boulderId="boulder.$id"/>
        <Card class="max-w-[74.5rem] w-full inline-block p-2 h-48 
                flex justify-center items-stretch text-slate-400 
                border border-dashed border-x-0
                rounded-none border-slate-400 
                hover:border-y-2 hover:bg-green hover:rounded-none 
                sm:rounded-md sm:hover:rounded-md sm:border-slate-400 
                sm:border-x sm:hover:border-x-2">
            <Button as-child variant="ghost" size="icon" @click="() => { open = true }">
                <div class="flex flex-col grow justify-center items-center h-full">
                    <PlusCircle class="w-8 h-8" />
                    <p class="text-lg">One more boulder</p>
                </div>
            </Button>
        </Card>
        <CreateBoulder :open=open @update:open="(state) => { open = state; }" />
    </div>
</template>