import { ModelPath } from "../common/model-path";
import { Expression } from "../expression/expression";

/**
 * Represents a single step in an event sequence.
 * The alias uniquely identifies this step so other parts of the definition (e.g., relative_to)
 * can reference it.
 * Examples:
 * 1. Step A with a timestamp operand and event name filter:
 *    {
 *      "alias": "event1",
 *      "operand": { "model": "events", "path": "timestamp" },
 *      "condition": { "operator": "equal", "left": { "model": "events", "path": "name" }, "right": "purchase" }
 *    }
 */
export type SequenceOperand = {
    alias: string,
    operand: ModelPath,
    condition?: Expression
};
