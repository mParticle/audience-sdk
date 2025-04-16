import { Operand } from "../operand/operand";
import { UnaryOperator, BinaryOperator } from "../common/operator";
import { Expression } from "./expression";

/**
 * Represents an expression that evaluates to a path or value.
 * Examples:
 * 
 * 1. Primitive values:
 *    - boolean: true
 *    - number: 42
 *    - string: "hello"
 * 
 * 2. Unary expression (operating on a path):
 *    {
 *      operator: "not",
 *      expression: {
 *        operator: "equals",
 *        left: { path: "status" },
 *        right: "inactive"
 *      }
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
    { operator: UnaryOperator, expression: Omit<Expression, "model"> }
    |   // binary expression
    { operator: BinaryOperator, operand: Operand };