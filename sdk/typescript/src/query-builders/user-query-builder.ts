import { UserQuery } from '@mparticle/audience-typescript-schema/query/user-query';
import { QueryBuilder } from './query-builder';
import { SingleModelExpression } from '@mparticle/audience-typescript-schema/expression/single-model-expression';
import { LogicalOperator } from '@mparticle/audience-typescript-schema';

export class UserQueryBuilder extends QueryBuilder {
    private attributes?: SingleModelExpression;

    /**
     * Sets the operator for combining attribute expressions
     * @param operator The logical operator ('and' or 'or')
     */
    setAttributeOperator(operator: LogicalOperator): this {
        if (!this.attributes) {
            this.attributes = { operator, expressions: [] };
        } else if ('operator' in this.attributes) {
            this.attributes.operator = operator;
        }
        return this;
    }

    /**
     * Adds an expression to the query
     * @param expression The expression to add
     */
    addAttributesExpression(expression: SingleModelExpression): this {
        if (!this.attributes) {
            this.attributes = { operator: 'and', expressions: [] };
        }
        if ('operator' in this.attributes && (this.attributes.operator === 'and' || this.attributes.operator === 'or')) {
            this.attributes.expressions.push(expression);
        }
        return this;
    }

    /**
     * Builds and returns the user query
     */
    build(): UserQuery {
        if (!this.models) {
            throw new Error('Model is required for a user query');
        }

        if (!this.attributes) {
            throw new Error('Attributes are required for a user query');
        }

        return {
            models: this.models,
            attributes: this.attributes
        };
    }
} 