import { DateExpression } from "./date-expression";
import { ModelPath } from "../common/model-path";
import { AggregationOperator } from "../common/operator";
import { Condition } from "../condition/condition";

/**
 * Represents a value that can be used in expressions, including primitive values, paths, and arithmetic operations.
 * Examples:
 * 1. Primitive values:
 *    true
 *    42
 *    "hello"
 *
 * 2. Path reference:
 *    { path: "user.age" }
 *
 * 3. Arithmetic operation:
 *    {
 *      operator: "plus",
 *      left: { path: "price" },
 *      right: { path: "tax" }
 *    }
 *
 * 4. Nested arithmetic operation:
 *    {
 *      operator: "multiply",
 *      left: { operator: "plus", left: { path: "base_price" }, right: { path: "shipping" } },
 *      right: 1.1
 *    }
 *
 * 5. Date operand:
 *    { date: { absolute: "2023-01-01T00:00:00Z" } }
 */
export type Expression =
    boolean
    | number
    | string
    | DateExpression
    | ModelPath
    // model aggregation expression
    | { operator: AggregationOperator, group_by_model: string, operand: Expression, condition: Condition };
    // | { operator: ArithmeticOperator, left: Operand, right: Operand };