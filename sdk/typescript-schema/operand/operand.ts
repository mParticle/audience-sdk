import { DateOperand } from "./date-operand";
import { ArithmeticOperator } from "../common/operator";
import { ModelPath } from "../common/field-locator";

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
    | { operator: ArithmeticOperator, left: Operand, right: Operand };