import { ListBoolOperator, LocationBoolOperator, LogicalBoolOperator, NumberBoolOperator, StringBoolOperator } from "../common/operator";
import { ModelPath } from "../literal/model-path";
import { DateExpression } from "./date-expression";
import { Expression } from "./expression";
import { LocationExpression } from "./location-expression";
import { NumberExpression } from "./number-expression";
import { StringExpression } from "./string-expression";

export type BooleanExpression =
    boolean
    | ModelPath
    | { operator: NumberBoolOperator, left: NumberExpression, right: NumberExpression }
    | { operator: StringBoolOperator, left: StringExpression, right: StringExpression }
    | { operator: LocationBoolOperator, left: LocationExpression, right: LocationExpression }
    | { operator: NumberBoolOperator, left: DateExpression, right: DateExpression }
    | { operator: LogicalBoolOperator, left: BooleanExpression, right: BooleanExpression }
    | { operator: LogicalBoolOperator, expressions: BooleanExpression[] }
// TODO: | { operator: ListBoolOperator, left: Expression, right: ListExpression }
