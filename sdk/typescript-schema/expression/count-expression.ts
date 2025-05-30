import { Operand } from "../operand/operand";
import { BinaryOperator, LogicalOperator } from "../common/operator";

/**
 * Represents a count expression, which can be a number, a binary operation, or a logical group.
 * Examples:
 * 1. Simple count:
 *    5
 *
 * 2. Binary count expression:
 *    { operator: "greater_than", operand: { path: "event.count" } }
 *
 * 3. Logical group of count expressions:
 *    {
 *      operator: "and",
 *      expressions: [
 *        1,
 *        { operator: "greater_than", operand: { path: "event.count" } }
 *      ]
 *    }
 */
export type CountExpression = 
    number
    | 
    { operator: BinaryOperator, operand: Operand }
    |   // logical expression group
    { operator: LogicalOperator, expressions: CountExpression[] }