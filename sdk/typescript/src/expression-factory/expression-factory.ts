import { Expression } from '@mparticle/audience-typescript-schema/expression/expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { BinaryOperator, LogicalOperator, LocationOperator, AggregationOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { LocationOperand } from '@mparticle/audience-typescript-schema/operand/location-operand';
import { Model } from '@mparticle/audience-typescript-schema/common/model';

/**
 * Factory class for creating different types of expressions
 */
export class ExpressionFactory {
    /**
     * Creates a join expression
     * @param model The model
     * @param expression The expression to join
     * @returns A join expression
     */
    static createJoin(model: Model, expression: Expression): Expression {
        return { model, expression };
    }

    /**
     * Creates a unary expression (NOT)
     * @param expression The expression to negate
     * @param model Optional model
     * @returns A unary expression
     */
    static createNot(expression: Expression, model?: Model): Expression {
        return { model, operator: 'not', expression };
    }

    /**
     * Creates an exists expression
     * @param operand The operand to check for existence
     * @param model Optional model
     * @returns An exists expression
     */
    static createExists(operand: Operand, model?: Model): Expression {
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
        model?: Model
    ): Expression {
        return { model, operator, left, right };
    }

    /**
     * Creates a model aggregation expression
     * @param operator The binary operator
     * @param expression The expression to filter the model
     * @param aggregation The aggregation to apply
     * @param right The right operand
     * @returns A model aggregation expression
     */
    static createModelAggregation(
        operator: BinaryOperator,
        expression: Expression,
        aggregation: { operator: AggregationOperator, model: Model, path: string },
        right: Operand | { model: string, operator: AggregationOperator, path: string, expression: Expression }
    ): Expression {
        return { operator, expression, left: aggregation, right };
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
} 