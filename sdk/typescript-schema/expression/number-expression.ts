import { AggregationNumberOperator, BinaryNumberOperator } from "../common/operator";
import { BoolExpression } from "./boolean-expression";
import { ModelPath } from "../literal/model-path";
import { IAggregateExpression, IBinaryExpression } from "./expression-interfaces";

/**
 * @title ValueNumberExpression
 */
export type ValueNumberExpression = number | ModelPath

/**
 * @title BinaryNumberExpression
 */
export class BinaryNumberExpression implements IBinaryExpression {
    operator: BinaryNumberOperator;
    left: NumberExpression;
    right: NumberExpression
}

/**
 * @title AggregateNumberExpression
 */
export class AggregateNumberExpression implements IAggregateExpression {
    operator: AggregationNumberOperator
    group_by_model: string
    operand: NumberExpression
    condition?: BoolExpression
}

/**
 * @title NumberExpression
 * @description Represents an expression that evaluates to a number.
 */
export type NumberExpression =
    ValueNumberExpression
    | BinaryNumberExpression
    | AggregateNumberExpression
