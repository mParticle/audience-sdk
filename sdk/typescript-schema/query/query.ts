import { Expression } from "../expression/expression";

/**
 * Represents a base query with a model and optional expression.
 * Examples:
 * 1. Simple query without expression:
 *    { model: "user" }
 *
 * 2. Query with expression:
 *    {
 *      model: "user",
 *      expression: { operator: "equals", left: { path: "age" }, right: 25 }
 *    }
 *
 * 3. Query with multiple models and a logical expression:
 *    {
 *      model: "user",
 *      expression: {
 *        operator: "and",
 *        expressions: [
 *          { operator: "equals", left: { path: "country" }, right: "US" },
 *          { operator: "greater_than", left: { path: "age" }, right: 18 }
 *        ]
 *      }
 *    }
 */
export type Query = 
    { model: string } 
    & { expression?: Expression};
