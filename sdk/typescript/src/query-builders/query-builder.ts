import { Query } from '@mparticle/audience-typescript-schema/query/query';
import { Expression } from '@mparticle/audience-typescript-schema/expression/expression';

export class QueryBuilder {
    protected model?: string;
    protected expression?: Expression;

    /**
     * Sets the models for the query
     * @param models The model names, IDs, or model objects with type
     */
    setModel(model: string): this {
        this.model = model;
        return this;
    }

    /**
     * Sets the expression for the query
     * @param expression The expression to use
     */
    setExpression(expression: Expression): this {
        this.expression = expression;
        return this;
    }

    /**
     * Builds and returns the query
     */
    build(): Query {
        if (!this.model) {
            throw new Error('Model is required for a general query');
        }

        return {
            model: this.model,
            ...(this.expression && { expression: this.expression })
        };
    }
} 