import { ModelPath } from "../common/field-locator";
import { Expression } from "../expression/expression";

/**
 * Represents a base query with a model and optional expression.
 * Examples:
 * 1. Simple query without expression:
 *    { models: [{ type: "user", id: 1 }] }
 * 
 * 2. Query with expression:
 *    { 
 *      models: [
 *        { type: "user", id: 1 },
 *        { type: "segment", id: 2, name: "high_ltv_users" }
 *      ],
 *      expression: {
 *        operator: "equals",
 *        path: "age",
 *        value: 25
 *      }
 *    }
 */
export type Query = 
    { model: Pick<ModelPath, "model"> } 
    & { expression?: Expression};
