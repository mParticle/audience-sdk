import { SingleModelExpression } from "../expression/single-model-expression"
import { Query } from "./query";

/**
 * Represents a query for user data, extending the base Query type with user-specific fields.
 * Examples:
 * 1. Simple user query:
 *    {
 *      model: "user",
 *      attributes: {
 *        operator: "equals",
 *        path: "age",
 *        value: 25
 *      }
 *    }
 * 
 * 2. Complex user query with multiple attributes:
 *    {
 *      model: "user",
 *      attributes: {
 *        operator: "and",
 *        expressions: [
 *          {
 *            operator: "equals",
 *            path: "country",
 *            value: "US"
 *          },
 *          {
 *            operator: "greater_than",
 *            path: "age",
 *            value: 18
 *          }
 *        ]
 *      }
 *    }
 */
export type UserQuery = 
    {
        model: string,
        attributes: SingleModelExpression
    }
    & Query;