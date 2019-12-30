import { AvailableTime } from './model';

const formatterTime = Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric'
});

export function formatTime(time?: string | number | Date) {
    return formatterTime.format(new Date(time));
}

export const WeekDay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

export function timeSection({ day, start_time, end_time }: AvailableTime) {
    return `${WeekDay[day - 1]} ${formatTime(start_time)} ~ ${formatTime(
        end_time
    )}`;
}
