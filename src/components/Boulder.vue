<script setup lang='ts'>
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

let month = '';

const incrementDate = (date, increment) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + increment);
    return newDate;
};

const getMax = (array) => {
    return array.reduce((max, p) => p > max ? p : max, array[0]);
};

const fraction = (num, max) => {
    return num / max;
};

const generateRandomArray = () => {
    const jsonArray = [];
    const currentDate = new Date();
    for (let i = 0; i < 366; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber === 0 && Math.random() < 0.2) {
            randomNumber = 0;
        }
        const pastDate = incrementDate(currentDate, (0 - i)).toISOString();
        jsonArray.push({
            date: pastDate,
            number: randomNumber
        });
    }
    return jsonArray;
};
const randomArray = generateRandomArray();

const weeks = [];
let currentWeek = [];
const paddding = []
const max = getMax(randomArray.map((item) => item.number));
const date = new Date(randomArray[0].date);
const dayOfWeek = date.getDay();
for (let i = 0; i < 7 - dayOfWeek; i++) {
    paddding.push({
        date: incrementDate(new Date(), 7 - dayOfWeek - i),
        number: 0
    });
}

randomArray.unshift(...paddding);

randomArray.forEach((item, index) => {
    currentWeek.push(item);
    if (currentWeek.length === 7) {
        weeks.unshift(currentWeek);
        currentWeek = [];
    }
});

let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const getMonth = (date) => {
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    return months[new Date(date).getMonth()];
}
</script>
<template>
    <div class="max-w-full p-4">
        <Card class="inline-block px-4 py-2 w-full sm:w-auto">
            <div class="flex">
                <div class="mr-2">
                    <div class="grid grid-row-8 gap-1">
                        <div class="text-xs font-light ">&nbsp;</div>
                        <template v-for="(day, index) in daysOfWeek" :key="index">
                            <div class="text-xs font-light">{{ day }}</div>
                        </template>
                    </div>
                </div>
                <div class="overflow-scroll">
                    <div class="grid-container gap-1">
                        <template v-for="(week, index) in weeks" :key="index">
                            <template v-if="getMonth(week[0].date) !== month">
                                <div class="text-xs font-light mb-4"
                                    :style="{ gridColumnStart: index + 1, gridRowStart: 1 }">
                                    {{ getMonth(week[0].date) }}
                                    {{ void (month = getMonth(week[0].date)) }}
                                </div>
                            </template>

                            <div v-for="(day, dayIndex) in week" :key="day"
                                :class="['w-4', 'h-4', 'border-[2px]', 'rounded-sm', 'border-transparent', { 'bg-green-500': day.number > 0 }]"
                                :style="{ opacity: fraction(day.number, max), gridColumnStart: index + 1, gridRowStart: dayIndex + 2 }">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
<style>
.grid-container {
    display: grid;
    grid-template-columns: repeat(52, 1rem);
    grid-template-rows: repeat(8, 1rem);
    gap: 0;
}
</style>