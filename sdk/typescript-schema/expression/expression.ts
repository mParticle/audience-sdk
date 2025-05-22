import { Operand } from "../operand/operand";
import { AggregationOperator, BinaryOperator, LocationOperator, LogicalOperator } from "../common/operator";
import { LocationOperand } from "../operand/location-operand";
import { ModelPath } from "../common/model-path";

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
export type Expression =
    // join expression
    { model: string, expression: Expression }
    |   // unary expression
    { operator: "not", expression: Expression }
    |   // exists expression
    { operator: "exists", operand: Operand }
    |   // binary expression
    { operator: BinaryOperator, left: Operand, right: Operand }
    |   // model aggregation expression
    { operator: AggregationOperator, group_by: string, expression: ModelPath, condition: Expression }
    |   // logical expression group
    { operator: LogicalOperator, expressions: Expression[] }
    |   // location (left) expression
    { operator: LocationOperator, left: LocationOperand, right: ModelPath }
    |   // location (left) expression
    { operator: LocationOperator, left: ModelPath, right: LocationOperand };
