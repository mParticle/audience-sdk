import { Audience, Expression } from "@mparticle/audience-typescript-schema";

/**
 * Type guard that validates if any object is a valid Audience
 * @param obj Any object to validate
 * @returns true if the object is a valid Audience, false otherwise
 */
export function isValidAudienceObject(obj: any): obj is Audience {
    try {
        // Check if obj is an object and not null
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }

        // Check if schema_version exists and is a valid version string
        if (typeof obj.schema_version !== 'string') {
            return false;
        }

        // Basic version format validation (should match Version type pattern)
        const versionRegex = /^\d+\.\d+\.\d+(-.*)?$/;
        if (!versionRegex.test(obj.schema_version)) {
            return false;
        }

        // Check if audience exists and is an object
        if (typeof obj.audience !== 'object' || obj.audience === null) {
            return false;
        }

        // Validate the audience expression structure
        return isValidExpression(obj.audience);
    } catch (error) {
        return false;
    }
}

/**
 * Helper function to recursively validate Expression objects
 * @param expr The expression to validate
 * @returns true if the expression is valid, false otherwise
 */
function isValidExpression(expr: any): expr is Expression {
    if (typeof expr !== 'object' || expr === null) {
        return false;
    }

    // Check for join expression: { model: string, expression: Expression }
    if (typeof expr.model === 'string' && expr.expression) {
        return isValidExpression(expr.expression);
    }

    // Check for logical expression: { operator: LogicalOperator, expressions: Expression[] }
    if (expr.operator === 'and' || expr.operator === 'or') {
        if (!Array.isArray(expr.expressions)) {
            return false;
        }
        return expr.expressions.every((e: any) => isValidExpression(e));
    }

    // Check for binary expression: { operator: BinaryOperator, left: Operand, right: Operand }
    const binaryOperators = ['equals', 'not_equals', 'less_than', 'less_than_equal',
        'greater_than', 'greater_than_equal', 'matches', 'contains',
        'not_contains', 'starts_with', 'not_starts_with', 'ends_with',
        'not_ends_with'];
    if (binaryOperators.includes(expr.operator)) {
        return expr.left !== undefined && expr.right !== undefined;
    }

    // Check for unary expression: { operator: UnaryOperator, operand: Operand }
    const unaryOperators = ['null', 'not_null', 'exists', 'not_exists'];
    if (unaryOperators.includes(expr.operator)) {
        return expr.operand !== undefined;
    }

    return false;
} 