import { CountExpression } from '@mparticle/audience-typescript-schema/expression/count-expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { BinaryOperator, LogicalOperator } from '@mparticle/audience-typescript-schema/common/operator';

/**
 * Factory class for creating different types of count expressions
 */
export class CountExpressionFactory {
    /**
     * Creates a count expression with a binary operator
     * @param operator The binary operator
     * @param operand The operand to compare against
     * @returns A count expression
     */
    static createBinary(
        operator: BinaryOperator,
        operand: Operand
    ): CountExpression {
        return { operator, operand };
    }

    /**
     * Creates a logical combination of count expressions
     * @param operator The logical operator ('and' or 'or')
     * @param expressions The count expressions to combine
     * @returns A logical count expression
     */
    static createLogical(
        operator: LogicalOperator,
        expressions: CountExpression[]
    ): CountExpression {
        return { operator, expressions };
    }

    /**
     * Creates an AND logical combination of count expressions
     * @param expressions The count expressions to combine
     * @returns An AND logical count expression
     */
    static createAnd(expressions: CountExpression[]): CountExpression {
        return this.createLogical('and', expressions);
    }

    /**
     * Creates an OR logical combination of count expressions
     * @param expressions The count expressions to combine
     * @returns An OR logical count expression
     */
    static createOr(expressions: CountExpression[]): CountExpression {
        return this.createLogical('or', expressions);
    }

    /**
     * Creates a count expression with the specified operator and operand
     * @param operator The operator to use
     * @param operand The operand to compare against
     * @returns A count expression
     */
    static createWithOperator(operator: BinaryOperator, operand: Operand): CountExpression {
        return this.createBinary(operator, operand);
    }

    /**
     * Creates a unary count expression
     * @param operator The unary operator
     * @param expression The expression to operate on
     * @returns A unary count expression
     */
    private static createUnary(
        operator: 'not',
        expression: CountExpression
    ): CountExpression {
        // This is a workaround since CountExpression doesn't directly support unary operators
        // We'll create a logical expression with a single expression
        return this.createAnd([expression]);
    }
} 