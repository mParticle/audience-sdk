import { SingleModelExpression } from '@mparticle/audience-typescript-schema/expression/single-model-expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { LogicalOperator, LocationOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { LocationOperand } from '@mparticle/audience-typescript-schema/operand/location-operand';

/**
 * Factory class for creating different types of single model expressions
 */
export class SingleModelExpressionFactory {

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
     * Creates a location expression with location on the left
     * @param operator The location operator
     * @param location The location operand
     * @param path The path to compare against
     * @returns A location expression
     */
    static createLocationLeft(
        operator: LocationOperator,
        location: LocationOperand,
        path: { path: string }
    ): SingleModelExpression {
        return { operator, left: location, right: path };
    }

    /**
     * Creates a location expression with location on the right
     * @param operator The location operator
     * @param path The path to compare against
     * @param location The location operand
     * @returns A location expression
     */
    static createLocationRight(
        operator: LocationOperator,
        path: { path: string },
        location: LocationOperand
    ): SingleModelExpression {
        return { operator, left: path, right: location };
    }

    /**
     * Creates an exists expression
     * @param operand The operand to check for existence
     * @returns An exists expression
     */
    static createExists(operand: Operand): SingleModelExpression {
        return { operator: 'exists', operand };
    }

    /**
     * Creates a unary expression
     * @param operator The unary operator
     * @param expression The expression to apply the operator to
     * @returns A unary expression
     */
    static createUnary(operator: 'not', expression: SingleModelExpression): SingleModelExpression {
        return { operator, expression };
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
     * Creates a within expression with location on the left
     * @param location The location operand
     * @param path The path to compare against
     * @returns A within expression
     */
    static createWithinLeft(location: LocationOperand, path: { path: string }): SingleModelExpression {
        return this.createLocationLeft('within', location, path);
    }

    /**
     * Creates a within expression with location on the right
     * @param path The path to compare against
     * @param location The location operand
     * @returns A within expression
     */
    static createWithinRight(path: { path: string }, location: LocationOperand): SingleModelExpression {
        return this.createLocationRight('within', path, location);
    }

    /**
     * Creates a not within expression with location on the left
     * @param location The location operand
     * @param path The path to compare against
     * @returns A not within expression
     */
    static createNotWithinLeft(location: LocationOperand, path: { path: string }): SingleModelExpression {
        return this.createUnary('not', this.createLocationLeft('within', location, path));
    }

    /**
     * Creates a not within expression with location on the right
     * @param path The path to compare against
     * @param location The location operand
     * @returns A not within expression
     */
    static createNotWithinRight(path: { path: string }, location: LocationOperand): SingleModelExpression {
        return this.createUnary('not', this.createLocationRight('within', path, location));
    }
} 