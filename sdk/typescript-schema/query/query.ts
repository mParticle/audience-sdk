import { Models } from "../common/model";
import { Expression } from "../expression/expression";

/**
 * Represents a base query with a model and optional expression.
 * Examples:
 * 1. Simple query without expression:
 *    { models: ["user"] }
 * 
 * 2. Query with expression:
 *    { 
 *      models: ["user", "high_ltv_users"],
 *      expression: {
 *        operator: "equals",
 *        path: "age",
 *        value: 25
 *      }
 *    }
 */
export type Query = 
    { models: Models } 
    & { expression?: Expression};
