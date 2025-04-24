import { Operand } from "../operand/operand";
import { AggregationOperator, BinaryOperator, LocationOperator, LogicalOperator } from "../common/operator";
import { LocationOperand } from "../operand/location-operand";
import { Model } from "../common/model";

/**
 * Represents a complex expression that can evaluate to true, false, or noop.
 * Examples:
 * 
 * 1. Join expression (combining expressions from different models):
 *    {
 *      model: "user",
 *      expression: {
 *        operator: "equals",
 *        left: { path: "age" },
 *        right: 18
 *      }
 *    }
 * 
 * 2. Unary expression (operating on a single value):
 *    {
 *      operator: "not",
 *      expression: {
 *        operator: "equals",
 *        left: { path: "status" },
 *        right: "inactive"
 *      }
 *    }
 * 
 * 3. Binary expression (comparing two values):
 *    {
 *      operator: "greater_than",
 *      left: { path: "price" },
 *      right: 100
 *    }
 * 
 * 4. Binary expression with aggregation:
 *    {
 *      operator: "greater_than",
 *      left: { 
 *        model: "order", 
 *        operator: "sum", 
 *        path: "amount",
 *        expression: {
 *          operator: "equals",
 *          left: { path: "status" },
 *          right: "completed"
 *        }
 *      },
 *      right: 1000
 *    }
 * 
 * 5. Logical expression group (combining multiple expressions):
 *    {
 *      operator: "and",
 *      expressions: [
 *        {
 *          operator: "equals",
 *          left: { path: "country" },
 *          right: "US"
 *        },
 *        {
 *          operator: "greater_than",
 *          left: { path: "age" },
 *          right: 18
 *        }
 *      ]
 *    }
 * 
 * 6. Location expression (comparing locations):
 *    {
 *      operator: "within",
 *      left: {
 *        location: {
 *          latitude: 40.7128,
 *          longitude: -74.0060,
 *          distance: {
 *            value: 5,
 *            unit: "miles"
 *          }
 *        }
 *      },
 *      right: { path: "user.location" }
 *    }
 */
export type Expression =
        // join expression
    { model: Model, expression: Expression }
    |   // unary expression
    { model?: Model, operator: "not", expression: Expression }
    |   // exists expression
    { model?: Model, operator: "exists", operand: Operand }
    |   // binary expression
    { model?: Model, operator: BinaryOperator, left: Operand, right: Operand }
    |   // model aggregation (left) expression
    { model: Model, operator: BinaryOperator, expression: Expression, left: { operator: AggregationOperator, path: string }, right: Operand | { model: string, operator: AggregationOperator, path: string, expression: Expression } }
    |   // model aggregation (right) expression
    { model: Model, operator: BinaryOperator, expression: Expression, left: Operand | { model: string, operator: AggregationOperator, path: string, expression: Expression }, right: { operator: AggregationOperator, path: string } }
    |   // logical expression group
    { model?: Model, operator: LogicalOperator, expressions: Expression[] }
    |   // location (left) expression
    { model?: Model, operator: LocationOperator, left: LocationOperand, right: { path: string } }
    |   // location (left) expression
    { model?: Model, operator: LocationOperator, left: { path: string }, right: LocationOperand };
