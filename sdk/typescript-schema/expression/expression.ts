import { Operand } from "../operand/operand";
import { BinaryOperator, LogicalOperator, SequenceOperator, UnaryOperator } from "../common/operator";
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
/**
 * Represents a single step in an event sequence.
 * The alias uniquely identifies this step so other parts of the definition (e.g., relative_to)
 * can reference it.
 * Examples:
 * 1. Step A with a timestamp operand and event name filter:
 *    {
 *      "alias": "event1",
 *      "operand": { "model": "events", "path": "timestamp" },
 *      "condition": { "operator": "equal", "left": { "model": "events", "path": "name" }, "right": "purchase" }
 *    }
 */
export type SequenceOperand = {
    alias: string,
    operand: ModelPath,
    condition?: Expression
};

export type Expression =
    // unary expression
    { operator: UnaryOperator, operand: Operand }
    |   // binary expression
    { operator: BinaryOperator, left: Operand, right: Operand }
    |   // logical expression group
    { operator: LogicalOperator, expressions: Expression[] }
    |   // sequence expression (A THEN B)
    { operator: SequenceOperator, sequence: SequenceOperand[] }
