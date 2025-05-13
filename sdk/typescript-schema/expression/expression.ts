import { Operand } from "../operand/operand";
import { AggregationOperator, BinaryOperator, LocationOperator, LogicalOperator } from "../common/operator";
import { LocationOperand } from "../operand/location-operand";
import { Model } from "../common/model";
import { FieldLocator } from "../common/field-locator";

/**
 * Represents a complex expression that can evaluate to true, false, or noop.
 * Examples:
 * 
 * 1. Join expression (combining expressions from different models):
 *    {
 *      model: { type: "user", id: 1 },
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
 *        model: { type: "order", id: 1 }, 
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
 * 5. Binary expression with aggregation on both sides:
 *    {
 *      operator: "greater_than",
 *      left: { 
 *        model: { type: "order", id: 1 }, 
 *        operator: "sum", 
 *        path: "amount",
 *        expression: {
 *          operator: "equals",
 *          left: { path: "status" },
 *          right: "completed"
 *        }
 *      },
 *      right: { 
 *        model: { type: "order", id: 1 }, 
 *        operator: "sum", 
 *        path: "amount",
 *        expression: {
 *          operator: "equals",
 *          left: { path: "status" },
 *          right: "pending"
 *        }
 *      }
 *    }
 * 
 * 6. Logical expression (AND/OR):
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
 * 7. Location expression:
 *    {
 *      operator: "within",
 *      left: { 
 *        location: { 
 *          latitude: 37.7749, 
 *          longitude: -122.4194,
 *          distance: { value: 10, unit: "miles" }
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
    { model: Model, operator: BinaryOperator, expression: Expression, left: ({ operator: AggregationOperator } & FieldLocator), right: Operand | ({ operator: AggregationOperator, expression: Expression } & FieldLocator) }
    |   // model aggregation (right) expression
    { model: Model, operator: BinaryOperator, expression: Expression, left: Operand | ({ operator: AggregationOperator, expression: Expression } & FieldLocator), right: ({ operator: AggregationOperator } & FieldLocator) }
    |   // logical expression group
    { operator: LogicalOperator, expressions: Expression[] }
    |   // location (left) expression
    { operator: LocationOperator, left: LocationOperand, right: FieldLocator }
    |   // location (left) expression
    { operator: LocationOperator, left: FieldLocator, right: LocationOperand };
