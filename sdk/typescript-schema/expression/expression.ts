import { BoolExpression, ValueBoolExpression } from "./boolean-expression";
import { DateExpression, ValueDateExpression } from "./date-expression";
import { NumberExpression, ValueNumberExpression } from "./number-expression";
import { LocationExpression, ValueLocationExpression } from "./location-expression";
import { StringExpression, ValueStringExpression } from "./string-expression";
import { IAggregateExpression, IBinaryExpression, IManyExpression, IUnaryExpression } from "./expression-interfaces";
import { Literal } from "../literal/literal";

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
//  * @title UnaryExpression
//  */
// export type UnaryExpression = UnaryBoolExpression

// /**
//  * @title BinaryExpression
//  */
// export type BinaryExpression = BinaryBoolExpression | BinaryNumberExpression

// /**
//  * @title ManyExpression
//  */
// export type ManyExpression = ManyBoolExpression



// /**
//  * @title AggregateExpression
//  */
// export type AggregateExpression = AggregateNumberExpression

/**
 * @title Expression
 * @description Represents an expression that accepts a variety of arguments and evaluates to a value.
 */
export type Expression =
    ValueExpression
    | IUnaryExpression
    | IBinaryExpression
    | IManyExpression
    | IAggregateExpression
    | BoolExpression
    | NumberExpression
    | StringExpression
    | LocationExpression
    | DateExpression
    | Literal
