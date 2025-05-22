import { Audience, LogicalAudienceExpressions, Expression } from '@mparticle/audience-typescript-schema/audience';
import { LogicalOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { VERSION } from '@mparticle/audience-typescript-schema/version';

export class AudienceBuilder {
    private expressions: (LogicalAudienceExpressions | Expression)[] = [];
    private currentOperator: LogicalOperator = 'and';

    /**
     * Creates a new AudienceBuilder instance
     */
    constructor() { }

    /**
     * Sets the logical operator for combining queries
     * @param operator The logical operator to use ('and' or 'or')
     */
    setOperator(operator: LogicalOperator): this {
        this.currentOperator = operator;
        return this;
    }

    /**
     * Adds an expression to the audience
     * @param expression The expression to add
     */
    addExpression(expression: Expression): this {
        this.expressions.push(expression);
        return this;
    }

    /**
     * Adds a nested logical expression to the audience
     * @param logicalExpression The logical expression to add
     */
    addLogicalExpression(logicalExpression: LogicalAudienceExpressions): this {
        this.expressions.push(logicalExpression);
        return this;
    }

    /**
     * Builds and returns the final Audience object
     */
    build(): Audience {
        if (this.expressions.length === 0) {
            throw new Error('Cannot build an audience with no expressions');
        }

        return {
            schema_version: VERSION,
            audience: {
                operator: this.currentOperator,
                expressions: this.expressions
            }
        };
    }

    /**
     * Creates a new logical query builder
     */
    static createLogicalExpression(): LogicalExpressionBuilder {
        return new LogicalExpressionBuilder();
    }
}

export class LogicalExpressionBuilder {
    private expressions: (LogicalAudienceExpressions | Expression)[] = [];
    private operator: LogicalOperator = 'and';

    /**
     * Sets the logical operator for the query
     * @param operator The logical operator to use ('and' or 'or')
     */
    setOperator(operator: LogicalOperator): this {
        this.operator = operator;
        return this;
    }

    /**
     * Adds an expression to the logical expression
     * @param expression The expression to add
     */
    addExpression(expression: Expression): this {
        this.expressions.push(expression);
        return this;
    }

    /**
     * Adds a nested logical expression
     * @param logicalExpression The logical expression to add
     */
    addLogicalExpression(logicalExpression: LogicalAudienceExpressions): this {
        this.expressions.push(logicalExpression);
        return this;
    }

    /**
     * Builds and returns the logical query
     */
    build(): LogicalAudienceExpressions {
        if (this.expressions.length === 0) {
            throw new Error('Cannot build a logical expression with no expressions');
        }

        return {
            operator: this.operator,
            expressions: this.expressions
        };
    }
} 