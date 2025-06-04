import { Version } from "./common/version";
import { Condition } from "./expression/condition";

/**
 * Represents a logical combination of audience expressions using AND/OR operators.
 * Examples:
 * 1. Simple AND combination:
 *    {
 *      "operator": "and",
 *      "expressions": [
 *        { "model": "user", "expression": { "operator": "exists", "operand": { "path": "id" } } },
 *        { "model": "purchase", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } }
 *      ]
 *    }
 *
 * 2. Nested logical combinations:
 *    {
 *      "operator": "or",
 *      "expressions": [
 *        { "model": "user", "expression": { "operator": "exists", "operand": { "path": "id" } } },
 *        {
 *          "operator": "and",
 *          "expressions": [
 *            { "model": "purchase", "expression": { "operator": "exists", "operand": { "path": "id" } } },
 *            { "model": "user", "expression": { "operator": "exists", "operand": { "path": "email" } } }
 *          ]
 *        }
 *      ]
 *    }
 *
 * 3. Deeply nested combination:
 *    {
 *      "operator": "and",
 *      "expressions": [
 *        {
 *          "operator": "or",
 *          "expressions": [
 *            { "model": "user", "expression": { "operator": "exists", "operand": { "path": "id" } } },
 *            { "model": "signup", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } }
 *          ]
 *        },
 *        { "model": "user", "expression": { "operator": "equals", "left": { "path": "country" }, "right": "CA" } }
 *      ]
 *    }
 */

/**
 * Represents a complete audience definition with a root logical expression.
 * Examples:
 * 1. Simple audience:
 *    {
 *      "schema_version": "1.0.0",
 *      "audience": {
 *        "operator": "and",
 *        "expressions": [
 *          { "model": "user", "expression": { "operator": "exists", "operand": { "path": "id" } } },
 *          { "model": "purchase", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } }
 *        ]
 *      }
 *    }
 *
 * 2. Audience with nested logic:
 *    {
 *      "schema_version": "1.0.0",
 *      "audience": {
 *        "operator": "or",
 *        "expressions": [
 *          { "model": "user", "expression": { "operator": "equals", "left": { "path": "country" }, "right": "US" } },
 *          {
 *            "operator": "and",
 *            "expressions": [
 *              { "model": "signup", "expression": { "operator": "equals", "left": { "path": "status" }, "right": "completed" } },
 *              { "model": "user", "expression": { "operator": "greater_than", "left": { "path": "age" }, "right": 18 } }
 *            ]
 *          }
 *        ]
 *      }
 *    }
 */
export type Audience = {
    schema_version: Version,
    audience: Condition
}