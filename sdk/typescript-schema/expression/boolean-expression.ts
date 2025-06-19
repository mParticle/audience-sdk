import { LocationBoolOperator, LogicalBoolOperator, NumberBoolOperator, StringBoolOperator, UnaryBoolOperator } from "../common/operator";
import { ModelPath } from "../literal/model-path";
import { DateExpression } from "./date-expression";
import { Expression } from "./expression";
import { LocationExpression } from "./location-expression";
import { NumberExpression } from "./number-expression";
import { StringExpression } from "./string-expression";

/**
 * @title UnaryBoolExpression
 */
type UnaryBoolExpression = { operator: UnaryBoolOperator, operand: Expression }

/**
 * @title NumberBoolExpression
 */
type NumberBoolExpression = { operator: NumberBoolOperator, left: NumberExpression, right: NumberExpression }

/**
 * @title StringBoolExpression
 */
type StringBoolExpression = { operator: StringBoolOperator, left: StringExpression, right: StringExpression }

/**
 * @title DateBoolExpression
 */
type DateBoolExpression = { operator: NumberBoolOperator, left: DateExpression, right: DateExpression }

/**
 * @title LogicalBoolExpression
 */
type LogicalBoolExpression = { operator: LogicalBoolOperator, left: BooleanExpression, right: BooleanExpression }

/**
 * @title LogicalManyBoolExpression
 */
type LogicalManyBoolExpression = { operator: LogicalBoolOperator, expressions: BooleanExpression[] }

/**
 * @title LocationBooleanExpression
 */
type LocationBooleanExpression = { operator: LocationBoolOperator, left: LocationExpression, right: LocationExpression }

/**
 * @title BooleanExpression
 */
export type BooleanExpression =
    boolean
    | ModelPath
    | UnaryBoolExpression
    | NumberBoolExpression
    | StringBoolExpression
    | DateBoolExpression
    | LogicalBoolExpression
    | LogicalManyBoolExpression
    | LocationBooleanExpression
// TODO: | { operator: ListBoolOperator, left: Expression, right: ListExpression }
