import { CountExpression } from "../expression/count-expression"
import { DateExpression } from "../expression/date-expression"
import { LocationExpression } from "../expression/location-expression"
import { PathExpression } from "../expression/path-expression"
import { SingleModelExpression } from "../expression/single-model-expression"
import { Query } from "./query"

/**
 * Represents a query for event data, extending the base Query type with event-specific fields.
 * Examples:
 * 1. Simple event query:
 *    {
 *      model: "event",
 *      event_name: { path: "purchase" }
 *    }
 *
 * 2. Complex event query with multiple conditions:
 *    {
 *      model: "event",
 *      event_type: { path: "commerce" },
 *      event_name: { path: "purchase" },
 *      attributes: { operator: "equals", left: { path: "amount" }, right: 100 },
 *      count: { operator: "greater_than", operand: { path: "event.count" } },
 *      date: { operator: "greater_than", operand: { absolute: "2023-01-01T00:00:00Z" } },
 *      location: { operator: "within", operand: { latitude: 40, longitude: -74, distance: { value: 5, unit: "miles" } } }
 *    }
 */
export type EventQuery = 
    Query & 
    {
        event_type?: PathExpression,
        event_name?: PathExpression,
        attributes?: SingleModelExpression,
        count?: CountExpression,
        date?: DateExpression,
        location?: LocationExpression
    };