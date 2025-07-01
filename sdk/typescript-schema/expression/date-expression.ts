import { DateLiteral } from "../literal/date";
import { ModelPath } from "../literal/model-path";

/**
 * @title ValueDateExpression
 */
export type ValueDateExpression = { date: DateLiteral } | ModelPath

/**
 * @title DateExpression
 * @description Represents an expression that evaluates to a date
 */
export type DateExpression =
    ValueDateExpression
