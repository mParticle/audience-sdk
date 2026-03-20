/**
 * References a specific field on a named alias (e.g., a step in an event sequence).
 * 
 * Used for cross-step field comparisons in sequences where one step references
 * a field from a previous step.
 * 
 * Examples:
 * 1. Reference event1's session_id:
 *    { alias: "event1", path: "session_id" }
 * 
 * 2. Reference purchase step's user_id:
 *    { alias: "purchase", path: "user_id" }
 */
export type AliasPath = {
    alias: string,
    path: string
};
