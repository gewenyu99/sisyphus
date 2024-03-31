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
import type { Push } from '@/stores/appwriteService';
import { defineProps, reactive, ref, watch } from 'vue';
import { useAppwriteStore } from '@/stores/appwriteService';

const appwrite = useAppwriteStore();

const { boulders, lastUpdated } = storeToRefs(appwrite);

const props = defineProps([
    'push',
    'boulderId',
]);

let month = '';
let year = 0;
const open = ref(false);

const incrementDate = (date: string | number | Date, increment: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + increment);
    return newDate;
};

const fraction = (num: number, max: number) => {
    return num / max;
};

type PushList = { id: any, days: Push[] };

let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const getMonth = (date: string | number | Date) => {
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    return months[new Date(date).getMonth()];
}

const getYear = (date: string | number | Date) => {
    return new Date(date).getFullYear();
}


const state = reactive({
    weeks: parseWeeks() as PushList[],
});


appwrite.$subscribe((mutation, s) => {
    state.weeks = parseWeeks();
});

function parseWeeks() {
    let currentWeek: PushList = { id: 0, days: [] };
    let newWeeks = [] as PushList[];
    const newestDate = new Date(boulders.value[props.boulderId].pushes[0].date);
    // Monday is the first day of the week I don't care what you say

    const dayOfWeek = (newestDate.getDay() + 6) % 7;
    const paddding = [] as Push[];

    for (let i = 0; i < 6 - dayOfWeek; i++) {
        paddding.push({
            date: incrementDate(new Date(newestDate), 7 - dayOfWeek - i).toISOString(),
            distance: 0,
            boulderId: props.boulderId,
        } as Push);
    }

    (boulders.value[props.boulderId].pushes as Push[]).unshift(...paddding);


    for (let i = 0; i < boulders.value[props.boulderId].pushes.length; i++) {
        if (i % 7 === 0 && i !== 0) {
            newWeeks.unshift(currentWeek);
            currentWeek = { id: i, days: [] };
        }
        currentWeek.days.unshift(boulders.value[props.boulderId].pushes[i]);
    }
    return newWeeks;
}

</script>
<template>
    <CreatePush :push="async (distance: number) => { props.push(boulderId, distance) }" :open="open"
        :boulderId="boulderId" @update:open="(state) => { open = state; }" />
    <div class="max-w-full mb-8">
        <Card class="inline-block px-4 py-2 w-full 
            rounded-none sm:rounded-md">
            <CardHeader class="mx-6 mt-4 p-0">
                <div class="grid grid-cols-2">
                    <div>
                        <CardTitle>{{ boulders[boulderId].name }}</CardTitle>
                        <CardDescription>{{ boulders[boulderId].description }}</CardDescription>
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
                <div class="flex">
                    <div class="mr-2">
                        <div class="grid grid-row-8 gap-1">
                            <div class="text-xs font-light ">&nbsp;</div>
                            <div class="text-xs font-light ">&nbsp;</div>
                            <template v-for="(day, index) in daysOfWeek" :key="index">
                                <div class="text-xs font-light">{{ day }}</div>
                            </template>
                        </div>
                    </div>
                    <div class="overflow-scroll flex flex-row-reverse m-0">
                        <div class="grid-container gap-1 text-xs p-0">
                            <template v-for="(week, index) in state.weeks" :key="week.id">
                                <template v-if="getYear(week.days[0].date) !== year">
                                    <div class="font-normal mb-4"
                                        :style="{ gridColumnStart: index + 1, gridRowStart: 1 }">
                                        {{ year = getYear(week.days[0].date) }}
                                    </div>
                                </template>

                                <template v-if="getMonth(week.days[0].date) !== month">
                                    <div class="font-light mb-4"
                                        :style="{ gridColumnStart: index + 1, gridRowStart: 2 }">
                                        {{ month = getMonth(week.days[0].date) }}
                                    </div>
                                </template>

                                <div v-for="(day, dayIndex) in week.days" :key="day.date"
                                    :class="['w-4', 'h-4', 'border-[2px]', 'rounded-sm', 'border-transparent', { 'bg-[#C6E4B6]': day.distance > 0 }]"
                                    :style="{ opacity: day.distance/boulders[boulderId].distance, gridColumnStart: index + 1, gridRowStart: dayIndex + 3 }">
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter class="py-2 justify-end">
                <div class="text-xs font-light">
                    Last updated: {{ lastUpdated }}
                </div>
            </CardFooter>
        </Card>
    </div>
</template>
<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(52, 1rem);
    grid-template-rows: repeat(9, 1rem);
    gap: 0;
}
</style>