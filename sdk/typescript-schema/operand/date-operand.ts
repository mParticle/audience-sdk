/**
 * Represents units of time that can be used in relative date calculations.
 * Examples:
 * - 'second': 1 second
 * - 'minute': 60 seconds
 * - 'hour': 60 minutes
 * - 'day': 24 hours
 * - 'week': 7 days
 * - 'month': ~30 days
 * - 'quarter': 3 months
 * - 'year': 12 months
 */
export type DateUnit =
    'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year';

/**
 * Represents an absolute date/time value.
 * Examples:
 * 1. ISO 8601 date:
 *    { absolute: "2023-01-01T00:00:00Z" }
 *
 * 2. Date only:
 *    { absolute: "2023-01-01" }
 *
 * 3. Date with timezone:
 *    { absolute: "2023-01-01T00:00:00-05:00" }
 */
export type AbsoluteDate =
    {
        "absolute": string
    };

/**
 * Represents a date/time relative to the current time.
 * Examples:
 * 1. 7 days ago:
 *    { relative: { offset: -7, unit: "day" } }
 *
 * 2. Start of current month:
 *    { relative: { offset: 0, unit: "month", boundary: "start" } }
 *
 * 3. End of previous quarter:
 *    { relative: { offset: -1, unit: "quarter", boundary: "end" } }
 */
export type RelativeDate =
    {
        "relative": {
            offset: number,
            unit: DateUnit,
            boundary?: "start" | "end"
        }
    };

/**
 * Represents a date value that can be either absolute or relative.
 * Examples:
 * 1. Absolute date:
 *    { date: { absolute: "2023-01-01T00:00:00Z" } }
 *
 * 2. Relative date (30 days ago):
 *    { date: { relative: { offset: -30, unit: "day" } } }
 *
 * 3. Relative date (start of current month):
 *    { date: { relative: { offset: 0, unit: "month", boundary: "start" } } }
 */
export type DateOperand =
    { date: AbsoluteDate }
    | { date: RelativeDate }