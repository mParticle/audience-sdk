import { BinaryBoolOperator, LogicalBoolOperator } from "../common/operator";
import { AbsoluteDate, RelativeDate } from "../operand/date-operand";

/**
 * Represents an expression that evaluates to a date or date-based condition.
 * Examples:
 * 1. Absolute date:
 *    { absolute: "2023-01-01T00:00:00Z" }
 *
 * 2. Relative date:
 *    { relative: { offset: -30, unit: "day" } }
 *
 * 3. Date with binary operator:
 *    { operator: "greater_than", operand: { absolute: "2023-01-01T00:00:00Z" } }
 *
 * 4. Logical combination of dates:
 *    {
 *      operator: "and",
 *      expressions: [
 *        { absolute: "2023-01-01T00:00:00Z" },
 *        { operator: "less_than", operand: { relative: { offset: 0, unit: "month", boundary: "end" } } }
 *      ]
 *    }
 */
export type DateExpression =
    AbsoluteDate
    | RelativeDate
    |
    { operator: BinaryBoolOperator, operand: AbsoluteDate | RelativeDate }
    |   // logical expression group
    { operator: LogicalBoolOperator, expressions: DateExpression[] }
