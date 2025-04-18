import { DateOperand, AbsoluteDate, RelativeDate, DateUnit } from '@mparticle/audience-schema/operand/date-operand';

export class DateOperandFactory {
    /**
     * Creates an absolute date operand
     * @param dateString The ISO 8601 date string
     */
    static createAbsoluteDate(dateString: string): DateOperand {
        const absoluteDate: AbsoluteDate = {
            absolute: dateString
        };
        return { date: absoluteDate };
    }

    /**
     * Creates a relative date operand
     * @param offset The number of units to offset
     * @param unit The unit of time
     * @param boundary Optional boundary specification
     */
    static createRelativeDate(
        offset: number,
        unit: DateUnit,
        boundary?: 'start' | 'end' | 'middle'
    ): DateOperand {
        const relativeDate: RelativeDate = {
            relative: {
                offset,
                unit,
                ...(boundary && { boundary })
            }
        };
        return { date: relativeDate };
    }

    /**
     * Creates a date operand for a specific number of days ago
     * @param days The number of days ago
     * @param boundary Optional boundary specification
     */
    static daysAgo(days: number, boundary?: 'start' | 'end' | 'middle'): DateOperand {
        return this.createRelativeDate(-days, 'day', boundary);
    }

    /**
     * Creates a date operand for a specific number of days in the future
     * @param days The number of days in the future
     * @param boundary Optional boundary specification
     */
    static daysFromNow(days: number, boundary?: 'start' | 'end' | 'middle'): DateOperand {
        return this.createRelativeDate(days, 'day', boundary);
    }

    /**
     * Creates a date operand for a specific number of months ago
     * @param months The number of months ago
     * @param boundary Optional boundary specification
     */
    static monthsAgo(months: number, boundary?: 'start' | 'end' | 'middle'): DateOperand {
        return this.createRelativeDate(-months, 'month', boundary);
    }

    /**
     * Creates a date operand for a specific number of months in the future
     * @param months The number of months in the future
     * @param boundary Optional boundary specification
     */
    static monthsFromNow(months: number, boundary?: 'start' | 'end' | 'middle'): DateOperand {
        return this.createRelativeDate(months, 'month', boundary);
    }

    /**
     * Creates a date operand for a specific number of years ago
     * @param years The number of years ago
     * @param boundary Optional boundary specification
     */
    static yearsAgo(years: number, boundary?: 'start' | 'end' | 'middle'): DateOperand {
        return this.createRelativeDate(-years, 'year', boundary);
    }

    /**
     * Creates a date operand for a specific number of years in the future
     * @param years The number of years in the future
     * @param boundary Optional boundary specification
     */
    static yearsFromNow(years: number, boundary?: 'start' | 'end' | 'middle'): DateOperand {
        return this.createRelativeDate(years, 'year', boundary);
    }
} 