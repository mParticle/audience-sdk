import { DateOperand } from "./date-operand";
import { Model, ModelPath } from "../common/model-path";
import { AggregationOperator } from "../common/operator";
import { Expression } from "../expression/expression";
import { AudienceOperand } from "./audience-operand";

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
export type Operand =
    boolean
    | number
    | string
    | DateOperand
    | ModelPath
    | Model
    | AudienceOperand
    | { operator: AggregationOperator, group_by_model: string, operand: Operand, condition?: Expression };
// | { operator: ArithmeticOperator, left: Operand, right: Operand };
