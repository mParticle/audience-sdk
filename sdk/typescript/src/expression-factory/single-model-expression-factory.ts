import { SingleModelExpression } from '@mparticle/audience-typescript-schema/expression/single-model-expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { UnaryOperator, BinaryOperator, LogicalOperator, LocationOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { LocationOperand } from '@mparticle/audience-typescript-schema/operand/location-operand';

/**
 * Factory class for creating different types of single model expressions
 */
export class SingleModelExpressionFactory {
    /**
     * Creates a unary expression
     * @param operator The unary operator
     * @param expression The expression to operate on
     * @returns A unary expression
     */
    static createUnary(
        operator: UnaryOperator,
        expression: SingleModelExpression
    ): SingleModelExpression {
        return { operator, expression };
    }

    /**
     * Creates a binary expression
     * @param operator The binary operator
     * @param left The left operand
     * @param right The right operand
     * @returns A binary expression
     */
    static createBinary(
        operator: BinaryOperator,
        left: Operand,
        right: Operand
    ): SingleModelExpression {
        return { operator, left, right };
    }

    /**
     * Creates a logical expression
     * @param operator The logical operator
     * @param expressions The expressions to combine
     * @returns A logical expression
     */
    static createLogical(
        operator: LogicalOperator,
        expressions: SingleModelExpression[]
    ): SingleModelExpression {
        return { operator, expressions };
    }

    /**
     * Creates a location expression
     * @param operator The location operator
     * @param location The location operand
     * @param path The path to compare against
     * @returns A location expression
     */
    static createLocation(
        operator: LocationOperator,
        location: LocationOperand,
        path: { path: string }
    ): SingleModelExpression {
        return { operator, left: location, right: path };
    }

    /**
     * Creates a NOT expression
     * @param expression The expression to negate
     * @returns A NOT expression
     */
    static createNot(expression: SingleModelExpression): SingleModelExpression {
        return this.createUnary('not', expression);
    }

    /**
     * Creates an AND expression
     * @param expressions The expressions to combine
     * @returns An AND expression
     */
    static createAnd(expressions: SingleModelExpression[]): SingleModelExpression {
        return this.createLogical('and', expressions);
    }

    /**
     * Creates an OR expression
     * @param expressions The expressions to combine
     * @returns An OR expression
     */
    static createOr(expressions: SingleModelExpression[]): SingleModelExpression {
        return this.createLogical('or', expressions);
    }

    /**
     * Creates an equals expression
     * @param left The left operand
     * @param right The right operand
     * @returns An equals expression
     */
    static createEquals(left: Operand, right: Operand): SingleModelExpression {
        return this.createBinary('equals', left, right);
    }

    /**
     * Creates a not equals expression
     * @param left The left operand
     * @param right The right operand
     * @returns A not equals expression
     */
    static createNotEquals(left: Operand, right: Operand): SingleModelExpression {
        return this.createUnary('not', this.createBinary("equals", left, right));
    }

    /**
     * Creates a greater than expression
     * @param left The left operand
     * @param right The right operand
     * @returns A greater than expression
     */
    static createGreaterThan(left: Operand, right: Operand): SingleModelExpression {
        return this.createBinary('greater_than', left, right);
    }

    /**
     * Creates a less than expression
     * @param left The left operand
     * @param right The right operand
     * @returns A less than expression
     */
    static createLessThan(left: Operand, right: Operand): SingleModelExpression {
        return this.createBinary('less_than', left, right);
    }

    /**
     * Creates a greater than or equals expression
     * @param left The left operand
     * @param right The right operand
     * @returns A greater than or equals expression
     */
    static createGreaterThanOrEquals(left: Operand, right: Operand): SingleModelExpression {
        return this.createBinary('greater_than_equal', left, right);
    }

    /**
     * Creates a less than or equals expression
     * @param left The left operand
     * @param right The right operand
     * @returns A less than or equals expression
     */
    static createLessThanOrEquals(left: Operand, right: Operand): SingleModelExpression {
        return this.createBinary('less_than_equal', left, right);
    }

    /**
     * Creates a contains expression
     * @param left The left operand
     * @param right The right operand
     * @returns A contains expression
     */
    static createContains(left: Operand, right: Operand): SingleModelExpression {
        return this.createBinary('contains', left, right);
    }

    /**
     * Creates a not contains expression
     * @param left The left operand
     * @param right The right operand
     * @returns A not contains expression
     */
    static createNotContains(left: Operand, right: Operand): SingleModelExpression {
        return this.createUnary("not", this.createBinary('contains', left, right));
    }

    /**
     * Creates a within expression
     * @param location The location operand
     * @param path The path to compare against
     * @returns A within expression
     */
    static createWithin(location: LocationOperand, path: { path: string }): SingleModelExpression {
        return this.createLocation('within', location, path);
    }

    /**
     * Creates a not within expression
     * @param location The location operand
     * @param path The path to compare against
     * @returns A not within expression
     */
    static createNotWithin(location: LocationOperand, path: { path: string }): SingleModelExpression {
        return this.createUnary('not', this.createLocation('within', location, path));
    }
} 