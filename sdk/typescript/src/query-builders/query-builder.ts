import { Query } from '@mparticle/audience-typescript-schema/query/query';
import { Expression } from '@mparticle/audience-typescript-schema/expression/expression';
import { Models, Model } from '@mparticle/audience-typescript-schema/common/model';

export class QueryBuilder {
    protected models: Models = [];
    protected expression?: Expression;

    /**
     * Sets the models for the query
     * @param models The model names, IDs, or model objects with type
     */
    setModels(models: Model[]): this {
        this.models = models;
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
        if (!this.models) {
            throw new Error('Model is required for a general query');
        }

        return {
            models: this.models,
            ...(this.expression && { expression: this.expression })
        };
    }
} 