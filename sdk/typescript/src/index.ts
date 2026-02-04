import { AudienceBuilder } from './audience-builder';
import { LogicalExpressionBuilder } from './audience-builder';
import { QueryBuilder } from './query-builders/query-builder';
import { Audience } from '@mparticle/audience-typescript-schema';
/**
 * Validates an Audience object
 * @param audience The audience to validate
 * @returns true if the audience is valid, false otherwise
 */
export function validateAudience(audience: Audience): boolean {
    try {
        // Ensure the audience has the required structure
        if (!audience.schema_version || !audience.audience || !audience.audience.operator || !audience.audience.queries) {
            return false;
        }

        // Validate that there is at least one query
        if (audience.audience.queries.length === 0) {
            return false;
        }

        // Validate that the operator is either 'and' or 'or'
        if (audience.audience.operator !== 'and' && audience.audience.operator !== 'or') {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Parses a JSON string into an Audience object
 * @param json The JSON string to parse
 * @returns The parsed Audience object
 * @throws Error if the JSON is invalid or doesn't match the Audience type
 */
export function parseAudience(json: string): Audience {
    try {
        const audience = JSON.parse(json) as Audience;
        if (!validateAudience(audience)) {
            throw new Error('Invalid audience structure');
        }
        return audience;
    } catch (error) {
        throw new Error('Failed to parse audience JSON');
    }
}

/**
 * Converts an Audience object to a JSON string
 * @param audience The audience to convert
 * @returns The JSON string representation of the audience
 * @throws Error if the audience is invalid
 */
export function stringifyAudience(audience: Audience): string {
    if (!validateAudience(audience)) {
        throw new Error('Invalid audience');
    }
    return JSON.stringify(audience, null, 2);
}

export { CountExpressionFactory } from './expression-factory/count-expression-factory';
export { DateOperandFactory } from './expression-factory/date-operand-factory';
export { ExpressionFactory } from './expression-factory/expression-factory';
export { LocationOperandFactory } from './expression-factory/location-operand-factory';
export { OperandFactory } from './expression-factory/operand-factory';
export { PathExpressionFactory } from './expression-factory/path-expression-factory';

export { QueryBuilder } from './query-builders/query-builder';

export { AudienceBuilder } from './audience-builder';