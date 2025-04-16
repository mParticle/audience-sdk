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
 *      expression: {
 *        operator: "equals",
 *        path: "age",
 *        value: 25
 *      }
 *    }
 */
export type Query = 
    { model: string } 
    & { expression?: Expression};
