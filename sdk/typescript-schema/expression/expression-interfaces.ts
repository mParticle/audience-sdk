import { Operator } from "../common/operator"
import { Expression } from "./expression"

interface IExpression {
    operator: Operator
}

export interface IUnaryExpression extends IExpression {
    operand: Expression
}

export interface IBinaryExpression extends IExpression {
    left: Expression
    right: Expression
}

export interface IManyExpression extends IExpression {
    expressions: Expression[]
}

export interface IAggregateExpression extends IExpression {
    condition?: Expression
    operand: Expression
    group_by_model: string
}
