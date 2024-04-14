import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(isoWeek)
dayjs.extend(updateLocale)

export const getWeek = (week: number) => {
    // Return an array of days in the weeks, 
    // 0 gives this week, -1 last week, 1 next week, etc.
    return [
        dayjs().add(week, 'week').isoWeekday(1),
        dayjs().add(week, 'week').isoWeekday(2),
        dayjs().add(week, 'week').isoWeekday(3),
        dayjs().add(week, 'week').isoWeekday(4),
        dayjs().add(week, 'week').isoWeekday(5),
        dayjs().add(week, 'week').isoWeekday(6),
        dayjs().add(week, 'week').isoWeekday(7),
    ]
}
export const compareDays = (date1: string | Date | Dayjs, date2: string | Date | Dayjs) => {
    const d1 = dayjs(date1);
    const d2 = dayjs(date2);
    return d1.isSame(d2, 'day');
}

export const getToday = () => {
    return dayjs();
}


dayjs.updateLocale('en', {
  monthsShort: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
})