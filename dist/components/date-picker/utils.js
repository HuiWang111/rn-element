import dayjs from 'dayjs';
import { isNil } from '../../utils';
export function getPanelDays(year = dayjs().year(), m = dayjs().month()) {
    const month = m + 1;
    const currentMonthDays = getMonthDays(year, month, month);
    const currentMonthDayCount = currentMonthDays.length;
    const [previousYear, previousMonth] = getPrevious(year, month);
    const needPreviousMonthDayCount = currentMonthDays[0].day - 1;
    const previousMonthDays = getMonthDays(previousYear, previousMonth, month, needPreviousMonthDayCount, true);
    const [nextYear, nextMonth] = getNext(year, month);
    let needNextMonthDayCount = 7 - currentMonthDays[currentMonthDayCount - 1].day;
    if (currentMonthDayCount + needPreviousMonthDayCount + needNextMonthDayCount < 42) {
        needNextMonthDayCount += 7;
    }
    const nextMonthDays = getMonthDays(nextYear, nextMonth, month, needNextMonthDayCount);
    return [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ];
}
export function getMonthDays(year, month, compareMonth, count, tail) {
    const dateStr = year + '-' + fill(month);
    const dayInstance = dayjs(dateStr);
    if (!dayInstance.isValid()) {
        console.info(`[getMonthDays] ${dateStr} is not a validate date`);
        return [];
    }
    const dayCount = dayInstance.daysInMonth();
    const days = new Array(dayCount)
        .fill(undefined)
        .map((o, i) => {
        const date = i + 1;
        const format = dateStr + '-' + fill(date);
        const day = dayjs(format).day();
        return {
            format,
            day: day === 0 ? 7 : day,
            month,
            year,
            date,
            isCurrentMonth: month === compareMonth
        };
    });
    if (isNil(count)) {
        return days;
    }
    if (tail) {
        return days.slice(dayCount - count, dayCount);
    }
    return days.slice(0, count);
}
export function getPrevious(year, month) {
    const isFirstMonth = month === 1;
    return [
        isFirstMonth ? year - 1 : year,
        isFirstMonth ? 12 : month - 1
    ];
}
export function getNext(year, month) {
    const isLastMonth = month === 12;
    return [
        isLastMonth ? year + 1 : year,
        isLastMonth ? 1 : month + 1
    ];
}
function fill(n) {
    return (n > 9 ? '' : '0') + n;
}
