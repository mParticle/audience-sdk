/**
 * Represents unary operators that operate on a single value.
 * Examples:
 * - "not": Negates a boolean expression
 * - "exist": Checks if a value exists
 */
export enum UnaryBoolOperator {
	Null = "null",
	NotNull = "not_null",
	Exists = "exists",
	NotExists = "not_exists"
}

/**
 * Represents binary operators that compare two values.
 * Examples:
 * - "equals": { value1: 5, value2: 5 }
 * - "less_than": { value1: 3, value2: 5 }
 * - "matches": { value1: "pattern", value2: "text" }
 * - "contains": { value1: "string", value2: "substring" }
 */
export type NumberBoolOperator =
	"equals"
	| "not_equals"
	| "less_than"
	| "less_than_equal"
	| "greater_than"
	| "greater_than_equal"

export type StringBoolOperator =
	"equals"
	| "not_equals"
	| "matches"
	| "contains"
	| "not_contains"
	| "starts_with"
	| "not_starts_with"
	| "ends_with"
	| "not_ends_with"
	| "in"
	| "not_in"

/**
 * Represents operators that work with lists of values.
 * Examples:
 * - "contains": { list: [1, 2, 3], value: 2 }
 * - "between": { list: [1, 10], value: 5 }
 * - "match_any": { list: ["a", "b"], value: "a" }
 * - "in": { list: [1, 2, 3], value: 2 }
 */
export type ListBoolOperator =
	"contains"
	| "between"
	| "match_any"
	| "match_all"
	| "in"
	| "not_in"

/**
 * Represents operators that work with audiences.
 * Examples:
 * - "in": { audience: 12345, model: "users" }
 */
export type AudienceOperator =
	"in"
	| "not_in"

/**
 * Represents mathematical operators for numeric calculations.
 * Examples:
 * - "plus": { value1: 5, value2: 3 } // result: 8
 * - "multiply": { value1: 4, value2: 2 } // result: 8
 * - "mod": { value1: 10, value2: 3 } // result: 1
 */
export type BinaryNumberOperator =
	"plus"
	| "minus"
	| "multiply"
	| "divide"
	| "mod"

/**
 * Represents operators for aggregating multiple values.
 * Examples:
 * - "min": [1, 2, 3] // result: 1
 * - "max": [1, 2, 3] // result: 3
 * - "avg": [1, 2, 3] // result: 2
 * - "count": [1, 2, 3] // result: 3
 */
export type AggregationNumberOperator =
	"min"
	| "max"
	| "sum"
	| "avg"
	| "list"
	| "count"

/**
 * Represents operators for location-based comparisons.
 * Examples:
 * - "within": { location1: { lat: 40, lng: -74 }, location2: { lat: 40, lng: -74 }, radius: 5 }
 * - "equals": { location1: { lat: 40, lng: -74 }, location2: { lat: 40, lng: -74 } }
 */
export type LocationBoolOperator =
	"within"
	| "equals"

/**
 * Represents logical operators for combining multiple conditions.
 * Examples:
 * - "and": { condition1: true, condition2: true } // result: true
 * - "or": { condition1: true, condition2: false } // result: true
 */
export type LogicalBoolOperator =
	"and"
	| "or"
