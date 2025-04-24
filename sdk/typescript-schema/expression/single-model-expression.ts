import { Operand } from "../operand/operand";
import { LogicalOperator, LocationOperator } from "../common/operator";
import { LocationOperand } from "../operand/location-operand";

/**
 * Represents an expression that operates within a single model context.
 * Examples:
 * 
 * 1. Unary expression (operating on a single value):
 *    {
 *      operator: "not",
 *      expression: {
 *        operator: "equals",
 *        left: { path: "status" },
 *        right: "inactive"
 *      }
 *    }
 * 
 * 2. Binary expression (comparing two values):
 *    {
 *      operator: "greater_than",
 *      left: { path: "price" },
 *      right: 100
 *    }
 * 
 * 3. Logical expression group (combining multiple expressions):
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
 * 4. Location expression (comparing locations):
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
export type SingleModelExpression =
    // not expression
    { operator: "not", expression: SingleModelExpression }
    |   // exists expression
    { operator: "exists", operand: Operand }
    |   // logical expression group
    { operator: LogicalOperator, expressions: SingleModelExpression[] }
    |   // location (left) expression
    { operator: LocationOperator, left: LocationOperand, right: { path: string } }
    |   // location (left) expression
    { operator: LocationOperator, left: { path: string }, right: LocationOperand };
