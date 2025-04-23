import { Query } from '@mparticle/audience-typescript-schema/query/query';
import { Expression } from '@mparticle/audience-typescript-schema/expression/expression';
import { Models } from '@mparticle/audience-typescript-schema/common/model';

export class QueryBuilder {
    protected models: Models = [];
    protected expression?: Expression;

    /**
     * Sets the model for the query to all models
     */
    setAllModels(): this {
        this.models = "all";
        return this;
    }

    /**
     * Sets the model for the query
     * @param model The model name
     */
    setModels(models: string[]): this {
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