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
