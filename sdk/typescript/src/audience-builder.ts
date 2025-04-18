
import { Audience, AudienceQuery, LogicalAudienceQueries } from '@mparticle/audience-typescript-schema/audience';
import { LogicalOperator } from '@mparticle/audience-typescript-schema/common/operator';

export class AudienceBuilder {
    private queries: (LogicalAudienceQueries | AudienceQuery)[] = [];
    private currentOperator: LogicalOperator = 'and';

    /**
     * Creates a new AudienceBuilder instance
     */
    constructor() {}

    /**
     * Sets the logical operator for combining queries
     * @param operator The logical operator to use ('and' or 'or')
     */
    setOperator(operator: LogicalOperator): this {
        this.currentOperator = operator;
        return this;
    }

    /**
     * Adds a query to the audience
     * @param query The query to add
     */
    addQuery(query: AudienceQuery): this {
        this.queries.push(query);
        return this;
    }

    /**
     * Adds a nested logical query to the audience
     * @param logicalQuery The logical query to add
     */
    addLogicalQuery(logicalQuery: LogicalAudienceQueries): this {
        this.queries.push(logicalQuery);
        return this;
    }

    /**
     * Builds and returns the final Audience object
     */
    build(): Audience {
        if (this.queries.length === 0) {
            throw new Error('Cannot build an audience with no queries');
        }

        return {
            audience: {
                operator: this.currentOperator,
                queries: this.queries
            }
        };
    }

    /**
     * Creates a new logical query builder
     */
    static createLogicalQuery(): LogicalQueryBuilder {
        return new LogicalQueryBuilder();
    }
}

export class LogicalQueryBuilder {
    private queries: (LogicalAudienceQueries | AudienceQuery)[] = [];
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
     * Adds a query to the logical query
     * @param query The query to add
     */
    addQuery(query: AudienceQuery): this {
        this.queries.push(query);
        return this;
    }

    /**
     * Adds a nested logical query
     * @param logicalQuery The logical query to add
     */
    addLogicalQuery(logicalQuery: LogicalAudienceQueries): this {
        this.queries.push(logicalQuery);
        return this;
    }

    /**
     * Builds and returns the logical query
     */
    build(): LogicalAudienceQueries {
        if (this.queries.length === 0) {
            throw new Error('Cannot build a logical query with no queries');
        }

        return {
            operator: this.operator,
            queries: this.queries
        };
    }
} 