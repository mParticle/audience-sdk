export const CURRENT_VERSION = "1.3.3";
type Version = `${number}.${number}.${number}` | `${number}.${number}.${number}-${string}`;
type DateUnit =
    'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year';
type AbsoluteDate =
    {
        "absolute": string
    };
type RelativeDate =
    {
        "relative": {
            offset: number,
            unit: DateUnit,
            boundary?: "start" | "end"
        }
    };
type DateOperand =
    { date: AbsoluteDate }
    | { date: RelativeDate }
type ModelPath = {
    model: string,
    path: string
}
enum UnaryOperator {
	Null = "null",
	NotNull = "not_null",
	Exists = "exists",
	NotExists = "not_exists"
}
type BinaryOperator =
	"equals"
	| "not_equals"
	| "less_than"
	| "less_than_equal"
	| "greater_than"
	| "greater_than_equal"
	| "matches"
	| "contains"
	| "not_contains"
	| "starts_with"
	| "not_starts_with"
	| "ends_with"
	| "not_ends_with"
	| "in"
	| "not_in"
type ListOperator =
	"contains"
	| "between"
	| "match_any"
	| "match_all"
	| "in"
	| "not_in"
type AudienceOperator =
	"in"
	| "not_in"
type ArithmeticOperator =
	"plus"
	| "minus"
	| "multiply"
	| "divide"
	| "mod"
type AggregationOperator =
	"min"
	| "max"
	| "sum"
	| "avg"
	| "list"
	| "count"
type LocationOperator =
	"within"
	| "equals"
type LogicalOperator =
	"and"
	| "or"
type AudienceOperand = {
    audience: string
}
type ModelOperand = {
    model: string
}
type Operand =
    boolean
    | number
    | string
    | DateOperand
    | ModelPath
    | ModelOperand
    | AudienceOperand
    | { operator: AggregationOperator, group_by_model: string, operand: Operand, condition?: Expression };
type Expression =

    { operator: UnaryOperator, operand: Operand }
    |
    { operator: BinaryOperator, left: Operand, right: Operand }
    |
    { operator: LogicalOperator, expressions: Expression[] }
type Audience = {
    schema_version: Version,
    audience: Expression
}