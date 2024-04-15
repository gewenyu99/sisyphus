<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card'

import { storeToRefs } from 'pinia'

import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';
import LogoTransparent from './LogoTransparent.vue';
import CreatePush from './CreatePush.vue';
import { defineProps, onMounted, reactive, ref, watch } from 'vue';
import { useBoulders } from '@/stores/boulders';
import PunchCard from './PunchCard.vue';
import { on } from 'events';


const props = defineProps({
    boulderId: {
        type: String,
        required: true
    }
});

const { boulder } = storeToRefs(useBoulders());

const open = ref(false);

</script>
<template>
    <CreatePush :open="open" :distance="boulder(boulderId)?.distance ?? 0"
        :boulderId="boulderId" @update:open="(state: boolean) => { open = state; }" />
    <div class="max-w-full mb-8">
        <Card class="inline-block px-4 py-2 w-full 
            rounded-none sm:rounded-md">
            <CardHeader class="mx-6 mt-4 p-0">
                <div class="grid grid-cols-2">
                    <div>
                        <CardTitle>{{ boulder(boulderId)?.name }}</CardTitle>
                        <CardDescription>{{ boulder(boulderId)?.description }}</CardDescription>
                    </div>
                    <div class="flex flex-col items-end">
                        <Button variant="outline" class="hover:bg-[#D0F0C0]" @click="() => { open = true }">
                            <LogoTransparent size="xs" class="mr-2" />
                            <p>Push</p>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <Separator class="w-auto mx-6 mb-2 mt-4" />
            <CardContent class="pb-0">
                <PunchCard :boulderId="boulderId" :target="boulder(boulderId)?.distance ?? 0" />
            </CardContent>
            <CardFooter class="py-2 justify-end">
            </CardFooter>
        </Card>
    </div>
</template>