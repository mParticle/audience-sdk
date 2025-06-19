import { AggregationNumberOperator, BinaryNumberOperator } from "../common/operator";
import { BooleanExpression } from "./boolean-expression";
import { ModelPath } from "../literal/model-path";

/**
 * @title BinaryNumberExpression
 */
type BinaryNumberExpression = { operator: BinaryNumberOperator, left: NumberExpression, right: NumberExpression }

/**
 * @title AggregateNumberExpression
 */
type AggregateNumberExpression = { operator: AggregationNumberOperator, group_by_model: string, operand: NumberExpression, condition?: BooleanExpression }

/**
 * @title NumberExpression
 * @description Represents a count expression, which can be a number, a binary operation, or a logical group.
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
export type NumberExpression =
    number
    | ModelPath
    | BinaryNumberExpression
    | AggregateNumberExpression
