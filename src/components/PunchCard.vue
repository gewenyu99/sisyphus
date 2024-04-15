<script setup lang='ts'>
import { compareDays, getWeek } from '@/lib/date';
import { usePushes } from '@/stores/pushes';
import { Dayjs } from 'dayjs';
import { ref, computed } from 'vue'
const props = defineProps({
    target: {
        type: Number,
        required: true
    },
    boulderId: {
        type: String,
        required: true
    }
})

import { storeToRefs } from 'pinia'

const { pushes } = storeToRefs(usePushes());

let curYear = getWeek(0)[0].year()
let curMonth = getWeek(0 - 52)[0].format('MMM')

let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const getDay = computed(() => (day: string | Date | Dayjs) => {
    return pushes.value(props.boulderId).find(d => compareDays(d.date, day)) ?? { distance: 0 }
})

</script>
<template>
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
                <template v-for="(week, index) in 52" :key="week">
                    <template v-if="getWeek(week - 52)[0].year() !== curYear">
                        <div class="font-normal mb-4" :style="{ gridColumnStart: index + 1, gridRowStart: 1 }">
                            {{ curYear = getWeek(week - 52)[0].year() }}
                        </div>
                    </template>

                    <template v-if="getWeek(week - 52)[0].format('MMM') !== curMonth">
                        <div class="font-light mb-4" :style="{ gridColumnStart: index + 1, gridRowStart: 2 }">
                            {{ curMonth = getWeek(week - 52)[0].format('MMM')}}
                        </div>
                    </template>

                    <div v-for="(day, dayIndex) in getWeek(week - 52)" :key="day.date"
                        :class="['w-4', 'h-4', 'border-[2px]', 'rounded-sm', 'border-transparent', { 'bg-[#C6E4B6]': getDay(day).distance > 0 }]"
                        :style="{ opacity: getDay(day).distance / target, gridColumnStart: index + 1, gridRowStart: dayIndex + 3 }">
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(52, 1rem);
    grid-template-rows: repeat(9, 1rem);
}
</style>