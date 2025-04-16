import { Location } from "../common/location";
import { LocationOperator, LogicalOperator } from "../common/operator";

/**
 * Represents an expression that evaluates to a location or location-based condition.
 * Examples:
 * 
 * 1. Simple location:
 *    {
 *      latitude: 40.7128,
 *      longitude: -74.0060,
 *      distance: {
 *        value: 5,
 *        unit: "miles"
 *      }
 *    }
 * 
 * 2. Location with operator:
 *    {
 *      operator: "within",
 *      operand: {
 *        latitude: 40.7128,
 *        longitude: -74.0060,
 *        distance: {
 *          value: 5,
 *          unit: "miles"
 *        }
 *      }
 *    }
 * 
 * 3. Logical combination of locations:
 *    {
 *      operator: "or",
 *      expressions: [
 *        {
 *          latitude: 40.7128,
 *          longitude: -74.0060,
 *          distance: {
 *            value: 5,
 *            unit: "miles"
 *          }
 *        },
 *        {
 *          operator: "within",
 *          operand: {
 *            latitude: 34.0522,
 *            longitude: -118.2437,
 *            distance: {
 *              value: 10,
 *              unit: "miles"
 *            }
 *          }
 *        }
 *      ]
 *    }
 */
export type LocationExpression =
    Location
    | // location (left) expression
    { operator: LocationOperator, operand: Location }
    |   // logical expression group
    { operator: LogicalOperator, expressions: LocationExpression[] }