import { Operand } from "../operand/operand";
import { BinaryOperator, LogicalOperator, UnaryOperator } from "../common/operator";

/**
 * Represents a complex expression that can evaluate to true, false, or noop.
 * Examples:
 * 1. Join expression (combining expressions from different models):
 *    {
 *      "model": "user",
 *      "expression": {
 *        "operator": "equals",
 *        "left": { "path": "age" },
 *        "right": 18
 *      }
 *    }
 *
 * 2. Logical expression (AND):
 *    {
 *      "operator": "and",
 *      "expressions": [
 *        { "operator": "equals", "left": { "path": "country" }, "right": "US" },
 *        { "operator": "greater_than", "left": { "path": "age" }, "right": 18 }
 *      ]
 *    }
 *
 * 3. Location expression:
 *    {
 *      "operator": "within",
 *      "left": { "location": { "latitude": 37.7749, "longitude": -122.4194, "distance": { "value": 10, "unit": "miles" } } },
 *      "right": { "model": "user", "path": "location" }
 *    }
 */

// This type is duplicative to the equivalent in Expression. This is to avoid circular references
export type LogicalExpression = {
    operator: LogicalOperator,
    expressions: (LogicalExpression | Expression)[]
};

export type Expression =
    // unary expression
    { operator: UnaryOperator, operand: Operand }
    |   // binary expression
    { operator: BinaryOperator, left: Operand, right: Operand }
    |   // logical expression group
    LogicalExpression
