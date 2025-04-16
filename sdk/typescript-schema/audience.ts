import { LogicalOperator } from "./common/operator";
import { EventQuery } from "./query/event-query";
import { Query } from "./query/query";
import { UserQuery } from "./query/user-query";

/**
 * Represents a query that can be either a general query, an event query, or a user query.
 * Examples:
 * 1. General query:
 *    { query: { model: "user", expression: { ... } } }
 * 
 * 2. Event query:
 *    { event: { model: "event", event_name: { path: "purchase" }, attributes: { ... } } }
 * 
 * 3. User query:
 *    { user: { model: "user", attributes: { ... } } }
 */
export type AudienceQuery = 
    { query: Query }
    | { event: EventQuery }
    | { user: UserQuery };

/**
 * Represents a logical combination of audience queries using AND/OR operators.
 * Examples:
 * 1. Simple AND combination:
 *    {
 *      operator: "and",
 *      queries: [
 *        { query: { model: "user" } },
 *        { event: { model: "event", event_name: { path: "purchase" } } }
 *      ]
 *    }
 * 
 * 2. Nested logical combinations:
 *    {
 *      operator: "or",
 *      queries: [
 *        { query: { model: "user" } },
 *        {
 *          operator: "and",
 *          queries: [
 *            { event: { model: "event" } },
 *            { user: { model: "user" } }
 *          ]
 *        }
 *      ]
 *    }
 */
export type LogicalAudienceQueries = 
    { 
        operator: LogicalOperator, 
        queries: (LogicalAudienceQueries | AudienceQuery)[] 
    };

/**
 * Represents a complete audience definition with a root logical query.
 * Example:
 * {
 *   audience: {
 *     operator: "and",
 *     queries: [
 *       { query: { model: "user" } },
 *       { event: { model: "event", event_name: { path: "purchase" } } }
 *     ]
 *   }
 * }
 */
export type Audience = { 
    audience: LogicalAudienceQueries
};