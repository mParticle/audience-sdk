import { BinaryBoolExpression, ManyBoolExpression, UnaryBoolExpression, ValueBoolExpression } from "./boolean-expression";
import { ValueDateExpression } from "./date-expression";
import { AggregateNumberExpression, BinaryNumberExpression, ValueNumberExpression } from "./number-expression";
import { ValueLocationExpression } from "./location-expression";
import { ValueStringExpression } from "./string-expression";

/**
 * @title ValueExpression
 */
export type ValueExpression =
    ValueBoolExpression
    | ValueDateExpression
    | ValueLocationExpression
    | ValueNumberExpression
    | ValueStringExpression

/**
 * @title UnaryExpression
 */
export type UnaryExpression = UnaryBoolExpression

/**
 * @title BinaryExpression
 */
export type BinaryExpression = BinaryBoolExpression | BinaryNumberExpression

/**
 * @title ManyExpression
 */
export type ManyExpression = ManyBoolExpression

/**
 * @title AggregateExpression
 */
export type AggregateExpression = AggregateNumberExpression

/**
 * @title Expression
 * @description Represents an expression that accepts a variety of arguments and evaluates to a value.
 */
export type Expression =
    ValueExpression
    | UnaryExpression
    | BinaryExpression
    | ManyExpression
