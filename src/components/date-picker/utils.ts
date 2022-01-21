import dayjs from 'dayjs'
import { IDateInformation } from './interface'
import { isNil } from '../../utils'

export function getPanelDays(
    year: number = dayjs().year(),
    m: number = dayjs().month(),
): IDateInformation[] {
    const month = m + 1
    const currentMonthDays = getMonthDays(year, month, month)
    const currentMonthDayCount = currentMonthDays.length

    const [previousYear, previousMonth] = getPrevious(year, month)
    const needPreviousMonthDayCount = currentMonthDays[0].day - 1
    
    const previousMonthDays = getMonthDays(previousYear, previousMonth, month, needPreviousMonthDayCount, true)

    const [nextYear, nextMonth] = getNext(year, month)
    let needNextMonthDayCount = 7 - currentMonthDays[currentMonthDayCount - 1].day
    if (currentMonthDayCount + needPreviousMonthDayCount + needNextMonthDayCount < 42) {
        needNextMonthDayCount += 7
    }
    const nextMonthDays = getMonthDays(nextYear, nextMonth, month, needNextMonthDayCount)

    return [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ]
}

/**
 * @param year 查询年份
 * @param month 查询月份
 * @param count 需要的天数
 * @param tail 是否从尾部截取
 */
export function getMonthDays(
    year: number,
    month: number,
    compareMonth: number,
    count?: number,
    tail?: boolean
): IDateInformation[] {
    const dateStr = year + '-' + fill(month)
    const dayInstance = dayjs(dateStr)
    
    if (!dayInstance.isValid()) {
        console.info(`[getMonthDays] ${dateStr} is not a validate date`)
        return []
    }

    const dayCount = dayInstance.daysInMonth()
    const days = new Array(dayCount)
        .fill(undefined)
        .map((o, i) => {
            const date = i + 1
            const format = dateStr + '-' + fill(date)
            const day = dayjs(format).day()
            return {
                format,
                day: day === 0 ? 7 : day,
                month,
                year,
                date,
                isCurrentMonth: month === compareMonth
            }
        })
    
    if (isNil(count)) {
        return days
    }

    if (tail) {
        return days.slice(dayCount - count, dayCount)
    }
    return days.slice(0, count)
}

export function getPrevious(year: number, month: number): [number, number] {
    const isFirstMonth = month === 1

    return [
        isFirstMonth ? year - 1 : year,
        isFirstMonth ? 12 : month - 1
    ]
}

export function getNext(year: number, month: number): [number, number] {
    const isLastMonth = month === 12

    return [
        isLastMonth ? year + 1 : year,
        isLastMonth ? 1 : month + 1
    ]
}

function fill(n: number): string {
    return (n > 9 ? '' : '0') + n
} 
