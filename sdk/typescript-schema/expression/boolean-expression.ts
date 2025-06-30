import { AudienceOperator as AudienceBoolOperator, LocationBoolOperator, LogicalBoolOperator, NumberBoolOperator, StringBoolOperator, UnaryBoolOperator } from "../common/operator";
import { AudienceReference } from "../literal/audience";
import { ModelPath, ModelReference } from "../literal/model-path";
import { DateExpression } from "./date-expression";
import { Expression } from "./expression";
import { LocationExpression } from "./location-expression";
import { NumberExpression } from "./number-expression";
import { StringExpression } from "./string-expression";

/**
 * @title UnaryBoolExpression
 */
export type UnaryBoolExpression = { operator: UnaryBoolOperator, operand: Expression }

/**
 * @title NumberBoolExpression
 */
export type NumberBoolExpression = { operator: NumberBoolOperator, left: NumberExpression, right: NumberExpression }

/**
 * @title StringBoolExpression
 */
export type StringBoolExpression = { operator: StringBoolOperator, left: StringExpression, right: StringExpression }

/**
 * @title DateBoolExpression
 */
export type DateBoolExpression = { operator: NumberBoolOperator, left: DateExpression, right: DateExpression }

/**
 * @title LogicalBoolExpression
 */
export type LogicalBoolExpression = { operator: LogicalBoolOperator, left: BoolExpression, right: BoolExpression }

/**
 * @title LogicalManyBoolExpression
 */
export type LogicalManyBoolExpression = { operator: LogicalBoolOperator, expressions: BoolExpression[] }

/**
 * @title LocationBoolExpression
 */
export type LocationBoolExpression = { operator: LocationBoolOperator, left: LocationExpression, right: LocationExpression }

/**
* @title AudienceBoolExpression
 */
export type AudienceBoolExpression = { operator: AudienceBoolOperator, left: ModelReference, right: AudienceReference }

/**
 * @title BoolExpression
 */
export type BoolExpression =
    boolean
    | ModelPath
    | UnaryBoolExpression
    | NumberBoolExpression
    | StringBoolExpression
    | DateBoolExpression
    | LogicalBoolExpression
    | LogicalManyBoolExpression
    | LocationBoolExpression
// TODO: | { operator: ListBoolOperator, left: Expression, right: ListExpression }
