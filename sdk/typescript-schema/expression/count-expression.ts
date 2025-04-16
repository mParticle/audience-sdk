import { Operand } from "../operand/operand";
import { BinaryOperator, LogicalOperator } from "../common/operator";

/**
 * Represents an expression that evaluates to a count or count-based condition.
 * Examples:
 * 
 * 1. Simple count value:
 *    5
 * 
 * 2. Count with binary operator:
 *    {
 *      operator: "greater_than",
 *      operand: { path: "order_count" }
 *    }
 * 
 * 3. Logical combination of counts:
 *    {
 *      operator: "and",
 *      expressions: [
 *        5,
 *        {
 *          operator: "greater_than",
 *          operand: { path: "order_count" }
 *        },
 *        {
 *          operator: "less_than",
 *          operand: 10
 *        }
 *      ]
 *    }
 */
export type CountExpression = 
    number
    | 
    { operator: BinaryOperator, operand: Operand }
    |   // logical expression group
    { operator: LogicalOperator, expressions: CountExpression[] }