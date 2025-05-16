import { Expression } from '@mparticle/audience-typescript-schema/expression/expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { BinaryOperator, LogicalOperator, LocationOperator, AggregationOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { LocationOperand } from '@mparticle/audience-typescript-schema/operand/location-operand';
import { ModelPath } from '@mparticle/audience-typescript-schema/common/model-path';

/**
 * Factory class for creating different types of expressions
 */
export class ExpressionFactory {

    /**
     * Creates a unary expression (NOT)
     * @param expression The expression to negate
     * @param model Optional model
     * @returns A unary expression
     */
    static createNot(expression: Expression, model?: string): Expression {
        return { model, operator: 'not', expression };
    }

    /**
     * Creates an exists expression
     * @param operand The operand to check for existence
     * @param model Optional model
     * @returns An exists expression
     */
    static createExists(operand: Operand, model?: string): Expression {
        return { model, operator: 'exists', operand };
    }

    /**
     * Creates a binary expression
     * @param operator The binary operator
     * @param left The left operand
     * @param right The right operand
     * @param model Optional model
     * @returns A binary expression
     */
    static createBinary(
        operator: BinaryOperator,
        left: Operand,
        right: Operand,
        model?: string
    ): Expression {
        return { model, operator, left, right };
    }

    /**
     * Creates a logical expression (AND/OR)
     * @param operator The logical operator
     * @param expressions The expressions to combine
     * @param model Optional model
     * @returns A logical expression
     */
    static createLogical(
        operator: LogicalOperator,
        expressions: Expression[]
    ): Expression {
        return { operator, expressions };
    }

    /**
     * Creates a location expression
     * @param operator The location operator
     * @param location The location operand
     * @param model  model
     * @param path The path to compare against
     * @returns A location expression
     */
    static createLocation(
        operator: LocationOperator,
        location: LocationOperand,
        model: string,
        path: string,        
    ): Expression {
        return { operator, left: location, right: { model, path } };
    }

    /**
     * Creates an AND expression
     * @param expressions The expressions to combine
     * @returns An AND expression
     */
    static createAnd(expressions: Expression[]): Expression {
        return this.createLogical('and', expressions);
    }

    /**
     * Creates an OR expression
     * @param expressions The expressions to combine
     * @returns An OR expression
     */
    static createOr(expressions: Expression[]): Expression {
        return this.createLogical('or', expressions);
    }

    /**
     * Creates an aggregate expression
     * @param operator The aggregation operator
     * @param group_by The group by field
     * @param expression The model path to aggregate
     * @param condition The condition expression
     * @returns An aggregate expression
     */
    static createAggregate(
        operator: AggregationOperator,
        group_by: string,
        expression: ModelPath,
        condition: Expression
    ): Expression {
        return { operator, group_by, expression, condition };
    }
} 