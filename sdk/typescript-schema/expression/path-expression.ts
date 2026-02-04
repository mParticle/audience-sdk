import { Operand } from "../operand/operand";
import { UnaryOperator, BinaryOperator } from "../common/operator";

/**
 * Represents an expression that evaluates to a path or value.
 * Examples:
 * 1. Primitive values:
 *    true
 *    42
 *    "hello"
 *
 * 2. Unary expression (NOT):
 *    {
 *      operator: "not",
 *      expression: { operator: "equals", operand: { path: "status" } }
 *    }
 *
 * 3. Binary expression (comparing a path to a value):
 *    {
 *      operator: "equals",
 *      operand: { path: "user.age" }
 *    }
 */
export type PathExpression = 
    boolean
    | number
    | string
    |   // unary expression 
    { operator: UnaryOperator, expression: PathExpression }
    |   // binary expression
    { operator: BinaryOperator, operand: Operand };