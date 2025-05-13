import { Operand } from "../operand/operand";
import { BinaryOperator, LogicalOperator } from "../common/operator";

export type CountExpression = 
    number
    | 
    { operator: BinaryOperator, operand: Operand }
    |   // logical expression group
    { operator: LogicalOperator, expressions: CountExpression[] }