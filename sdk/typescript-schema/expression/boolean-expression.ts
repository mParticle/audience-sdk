import { AudienceOperator as AudienceBoolOperator, LocationBoolOperator, LogicalBoolOperator, NumberBoolOperator, StringBoolOperator, UnaryBoolOperator } from "../common/operator";
import { AudienceReference } from "../literal/audience";
import { ModelPath, ModelReference } from "../literal/model-path";
import { DateExpression } from "./date-expression";
import { Expression } from "./expression";
import { IBinaryExpression, IManyExpression, IUnaryExpression } from "./expression-interfaces";
import { LocationExpression } from "./location-expression";
import { NumberExpression } from "./number-expression";
import { StringExpression } from "./string-expression";

/**
 * @title ValueBoolExpression
 */
export type ValueBoolExpression = boolean | ModelPath

/**
 * @title UnaryBoolExpression
 */
export class UnaryBoolExpression implements IUnaryExpression<Expression> {
    operator: UnaryBoolOperator
    operand: Expression

}

/**
 * @title NumberBoolExpression
 */
export class NumberBoolExpression implements IBinaryExpression {
    operator: NumberBoolOperator
    left: NumberExpression
    right: NumberExpression

}

/**
 * @title StringBoolExpression
 */
export class StringBoolExpression implements IBinaryExpression {
    operator: StringBoolOperator
    left: StringExpression
    right: StringExpression

}

/**
 * @title DateBoolExpression
 */
export class DateBoolExpression implements IBinaryExpression {
    operator: NumberBoolOperator
    left: DateExpression
    right: DateExpression

}

/**
 * @title LogicalBoolExpression
 */
export class LogicalBoolExpression implements IBinaryExpression {
    operator: LogicalBoolOperator
    left: BoolExpression
    right: BoolExpression

}

/**
 * @title LocationBoolExpression
 */
export class LocationBoolExpression implements IBinaryExpression {
    operator: LocationBoolOperator
    left: LocationExpression
    right: LocationExpression

}

/**
* @title AudienceBoolExpression
 */
export class AudienceBoolExpression implements IBinaryExpression {
    operator: AudienceBoolOperator
    left: ModelReference
    right: AudienceReference

}

/**
 * @title BoolBinaryExpression
 */
export type BinaryBoolExpression = AudienceBoolExpression | LocationBoolExpression | LocationBoolExpression | DateBoolExpression | StringBoolExpression | NumberBoolExpression;

/**
 * @title LogicalManyBoolExpression
 */
export class LogicalManyBoolExpression implements IManyExpression {
    operator: LogicalBoolOperator
    expressions: BoolExpression[]

}

/**
 * @title ManyBoolExpression
 */
export type ManyBoolExpression = LogicalManyBoolExpression

/**
 * @title BoolExpression
 */
export type BoolExpression =
    ValueBoolExpression
    | UnaryBoolExpression
    | BinaryBoolExpression
    | ManyBoolExpression
