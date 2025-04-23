import { EventQuery } from '@mparticle/audience-typescript-schema/query/event-query';
import { PathExpression } from '@mparticle/audience-typescript-schema/expression/path-expression';
import { QueryBuilder } from './query-builder';
import { SingleModelExpression } from '@mparticle/audience-typescript-schema/expression/single-model-expression';
import { BinaryOperator, LogicalOperator } from '@mparticle/audience-typescript-schema';
import { CountExpression } from '@mparticle/audience-typescript-schema/expression/count-expression';
import { DateExpression } from '@mparticle/audience-typescript-schema/expression/date-expression';
import { LocationExpression } from '@mparticle/audience-typescript-schema/expression/location-expression';
import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { AbsoluteDate, DateUnit, RelativeDate } from '@mparticle/audience-typescript-schema/operand/date-operand';

export class EventQueryBuilder extends QueryBuilder {
    private eventName?: PathExpression;
    private attributes?: SingleModelExpression;
    private count?: CountExpression;
    private date?: DateExpression;
    private location?: LocationExpression;
    private eventType?: PathExpression;

    /**
     * Sets the event name for the query
     * @param eventName The event name path expression
     */
    setEventName(eventName: PathExpression): this {
        this.eventName = eventName;
        return this;
    }
    
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
     * Sets a simple numeric count value for the event query
     * @param count The numeric count value
     */
    setCountValue(count: number): this {
        this.count = count;
        return this;
    }

    /**
     * Sets a binary operator count expression for the event query
     * @param operator The binary operator
     * @param operand The operand to compare against
     */
    setCountBinary(operator: BinaryOperator, operand: Operand): this {
        this.count = { operator, operand };
        return this;
    }

    /**
     * Sets a logical combination of count expressions for the event query
     * @param operator The logical operator ('and' or 'or')
     * @param expressions The count expressions to combine
     */
    setCountLogical(operator: LogicalOperator, expressions: CountExpression[]): this {
        this.count = { operator, expressions };
        return this;
    }

    /**
     * Sets an absolute date for the event query
     * @param absoluteDate The ISO 8601 date string
     */
    setAbsoluteDate(absoluteDate: string): this {
        this.date = { absolute: absoluteDate };
        return this;
    }

    /**
     * Sets a relative date for the event query
     * @param offset The number of units to offset
     * @param unit The unit of time
     * @param boundary Optional boundary specification
     */
    setRelativeDate(offset: number, unit: DateUnit, boundary?: 'start' | 'end' | 'middle'): this {
        this.date = {
            relative: {
                offset,
                unit,
                ...(boundary && { boundary })
            }
        };
        return this;
    }

    /**
     * Sets a binary operator date expression for the event query
     * @param operator The binary operator
     * @param operand The date operand to compare against
     */
    setDateBinary(operator: BinaryOperator, operand: AbsoluteDate | RelativeDate): this {
        this.date = { operator, operand };
        return this;
    }

    /**
     * Sets a logical combination of date expressions for the event query
     * @param operator The logical operator ('and' or 'or')
     * @param expressions The date expressions to combine
     */
    setDateLogical(operator: LogicalOperator, expressions: DateExpression[]): this {
        this.date = { operator, expressions };
        return this;
    }

    /**
     * Sets the location for the event query
     * @param location The location expression
     */
    setLocation(location: LocationExpression): this {
        this.location = location;
        return this;
    }

    /**
     * Sets the event type for the event query
     * @param eventType The event type path expression
     */
    setEventType(eventType: PathExpression): this {
        this.eventType = eventType;
        return this;
    }

    /**
     * Builds and returns the event query
     */
    build(): EventQuery {
        if (!this.models) {
            throw new Error('Model is required for an event query');
        }

        if (!this.eventName) {
            throw new Error('Event name is required for an event query');
        }

        return {
            models: this.models,
            event_name: this.eventName,
            ...(this.attributes && { attributes: this.attributes }),
            ...(this.count !== undefined && { count: this.count }),
            ...(this.date && { date: this.date }),
            ...(this.location && { location: this.location }),
            ...(this.eventType && { event_type: this.eventType })
        };
    }
} 