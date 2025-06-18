import { AudienceOperand } from "../operand/audience-operand";
import { Model } from "../common/model-path";
import { AudienceOperator } from "../common/operator";


/**
 * Represents an expression that operates on an audience and returns a boolean.
 * Example:
 *    {
 *      operator: "in",
 *      expression: { operator: "in", left: { model: "user" }, right": { audience: 12345 } }
 *    }
 */
export type AudienceExpression =
    { operator: AudienceOperator, left: Model, right: AudienceOperand }
