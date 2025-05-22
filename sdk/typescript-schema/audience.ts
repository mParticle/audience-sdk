import { LogicalOperator } from "./common/operator";
import { Version } from "./common/version";
import { Expression } from "./expression/expression";

/**
 * Represents a logical combination of audience queries using AND/OR operators.
 * Examples:
 * 1. Simple AND combination:
 *    {
 *      "operator": "and",
 *      "queries": [
 *        { "query": { "model": "user" } },
 *        { "query": { "model": "purchase", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } } }
 *      ]
 *    }
 *
 * 2. Nested logical combinations:
 *    {
 *      "operator": "or",
 *      "queries": [
 *        { "query": { "model": "user" } },
 *        {
 *          "operator": "and",
 *          "queries": [
 *            { "query": { "model": "purchase" } },
 *            { "query": { "model": "user" } }
 *          ]
 *        }
 *      ]
 *    }
 *
 * 3. Deeply nested combination:
 *    {
 *      "operator": "and",
 *      "queries": [
 *        {
 *          "operator": "or",
 *          "queries": [
 *            { "query": { "model": "user" } },
 *            { "query": { "model": "signup", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } } }
 *          ]
 *        },
 *        { "query": { "model": "user", "expression": { "operator": "equals", "left": { "path": "country" }, "right": "CA" } } }
 *      ]
 *    }
 */
export type LogicalAudienceExpressions =
    {
        operator: LogicalOperator,
        expressions: (LogicalAudienceExpressions | Expression)[]
    };

/**
 * Represents a complete audience definition with a root logical query.
 * Examples:
 * 1. Simple audience:
 *    {
 *      "schema_version": "1.0.0",
 *      "audience": {
 *        "operator": "and",
 *        "queries": [
 *          { "query": { "model": "user" } },
 *          { "query": { "model": "purchase", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } } }
 *        ]
 *      }
 *    }
 *
 * 2. Audience with nested logic:
 *    {
 *      "schema_version": "1.0.0",
 *      "audience": {
 *        "operator": "or",
 *        "queries": [
 *          { "query": { "model": "user", "expression": { "operator": "equals", "left": { "path": "country" }, "right": "US" } } },
 *          {
 *            "operator": "and",
 *            "queries": [
 *              { "query": { "model": "signup", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } } },
 *              { "query": { "model": "user", "expression": { "operator": "greater_than", "left": { "path": "age" }, "right": 18 } } }
 *            ]
 *          }
 *        ]
 *      }
 *    }
 */
export type Audience = {
    schema_version: Version,
    audience: LogicalAudienceExpressions
}