import { SingleModelExpression } from '@mparticle/audience-typescript-schema/expression/single-model-expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { LogicalOperator, LocationOperator, BinaryOperator } from '@mparticle/audience-typescript-schema/common/operator';
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
    static createLocation(
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
     * Creates a NOT expression
     * @param expression The expression to negate
     * @returns A NOT expression
     */
    static createNot(expression: SingleModelExpression): SingleModelExpression {
        return { operator: 'not', expression };;
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
     * Creates a within expression with location on the right
     * @param path The path to compare against
     * @param location The location operand
     * @returns A within expression
     */
    static createWithin(path: { path: string }, location: LocationOperand): SingleModelExpression {
        return this.createLocation('within', path, location);
    }

    /**
     * Creates a binary expression
     * @param operator The binary operator to use (e.g., 'equals', 'greater_than', etc.)
     * @param left The left operand
     * @param right The right operand
     * @returns A binary expression
     */
    static createBinary(operator: BinaryOperator, left: Operand, right: Operand): SingleModelExpression {
        return { operator, left, right };
    }
} 