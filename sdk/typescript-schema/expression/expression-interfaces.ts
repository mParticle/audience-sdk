import { Expression } from "./expression"

export interface IUnaryExpression {
    operand: Expression
}

export interface IBinaryExpression {
    left: Expression
    right: Expression
}

export interface IManyExpression {
    expressions: Expression[]
}

export interface IAggregateExpression {
    condition?: Expression
    operand: Expression
    group_by_model: string
}
