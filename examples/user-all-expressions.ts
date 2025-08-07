import { Audience } from "../sdk/typescript-schema/audience";

/**
 * The most complex Audience example possible, using every Expression type and operator.
 * This example demonstrates all supported logical, unary, binary, list, and aggregation operators, as well as various operand types.
 * All model references use "user" and plausible person attributes.
 *
 */
export const complexAudienceExample: Audience = {
    schema_version: "1.0.0",
    audience: {
      operator: "and",
      expressions: [
        // Unary expressions
        { operator: "exists", operand: { model: "user", path: "email" } },
        { operator: "not_exists", operand: { model: "user", path: "height" } },
        { operator: "null", operand: { model: "user", path: "location" } },
        { operator: "not_null", operand: { model: "user", path: "name" } },
  
        // Binary expressions
        { operator: "equals", left: { model: "user", path: "country" }, right: "US" },
        { operator: "less_than", left: { model: "user", path: "age" }, right: 18 },
        { operator: "less_than_equal", left: { model: "user", path: "score" }, right: 100 },
        { operator: "greater_than", left: { model: "user", path: "height" }, right: 170 },
        { operator: "greater_than_equal", left: { model: "user", path: "age" }, right: 21 },
        { operator: "matches", left: { model: "user", path: "email" }, right: ".*@example.com" },
        { operator: "contains", left: { model: "user", path: "name" }, right: "John" },
  
        // Deeply nested logical expressions with all types
        {
          operator: "or",
          expressions: [
            { operator: "in", left: { model: "user", path: "country" }, right: ["US", "CA", "UK"] },
            { operator: "between", left: { model: "user", path: "age" }, right: [18, 65] },
            { operator: "match_any", left: { model: "user", path: "status" }, right: ["active", "pending"] },
            { operator: "match_all", left: { model: "user", path: "location" }, right: ["NY", "CA"] },
            {
              operator: "and",
              expressions: [
                { operator: "contains", left: { model: "user", path: "name" }, right: "Doe" },
                { operator: "equals", left: { model: "user", path: "status" }, right: "active" }
              ]
            }
          ]
        },
  
        // Arithmetic operand in a binary expression
        { operator: "greater_than", left: { operator: "plus", left: { model: "user", path: "score" }, right: 10 }, right: 100 },
  
        // Date operands
        { operator: "greater_than", left: { model: "user", path: "created_at" }, right: { date: { absolute: "2023-01-01T00:00:00Z" } } },
        { operator: "less_than", left: { model: "user", path: "created_at" }, right: { date: { relative: { offset: -30, unit: "day" } } } }
      ]
    }
  };
  