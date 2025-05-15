import { ModelPath } from "../common/field-locator"
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
 *      models: [{ type: "event", id: 1 }],
 *      event_name: { path: "purchase" }
 *    }
 * 
 * 2. Complex event query with multiple conditions:
 *    {
 *      models: [
 *        { type: "event", id: 1 },
 *        { type: "transaction", id: 2 },
 *        { type: "session", id: 3 }
 *      ],
 *      event_type: { path: "commerce" },
 *      event_name: { path: "purchase" },
 *      attributes: {
 *        operator: "equals",
 *        path: "amount",
 *        value: 100
 *      },
 *      count: {
 *        operator: "greater_than",
 *        value: 5
 *      },
 *      date: {
 *        operator: "within",
 *        value: "30d"
 *      },
 *      location: {
 *        operator: "within",
 *        value: { lat: 40, lng: -74, radius: 5 }
 *      }
 *    }
 */
export type EventQuery = 
    {
        model: Pick<ModelPath, "model">,
        event_type?: PathExpression,
        event_name?: PathExpression,
        attributes?: SingleModelExpression,
        count?: CountExpression,
        date?: DateExpression,
        location?: LocationExpression
    } 
    & Query;