import { PathExpression } from '@mparticle/audience-typescript-schema/expression/path-expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { UnaryOperator, BinaryOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { Expression } from '@mparticle/audience-typescript-schema/expression/expression';

/**
 * Factory class for creating different types of path expressions
 */
export class PathExpressionFactory {

    /**
     * Creates a unary path expression
     * @param operator The unary operator
     * @param expression The expression to operate on
     * @returns A unary path expression
     */
    static createUnary(
        operator: UnaryOperator,
        expression: PathExpression
    ): PathExpression {
        return { operator, expression };
    }

    /**
     * Creates a binary path expression
     * @param operator The binary operator
     * @param operand The operand to operate on
     * @returns A binary path expression
     */
    static createBinary(
        operator: BinaryOperator,
        operand: Operand
    ): PathExpression {
        return { operator, operand };
    }

    /**
     * Creates a NOT path expression
     * @param expression The expression to negate
     * @returns A NOT path expression
     */
    static createNot(expression: PathExpression): PathExpression {
        return this.createUnary('not', expression);
    }
} 