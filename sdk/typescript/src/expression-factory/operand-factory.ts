import { Operand } from '@mparticle/audience-typescript-schema/operand/operand';
import { DateOperand } from '@mparticle/audience-typescript-schema/operand/date-operand';
import { LocationOperand } from '@mparticle/audience-typescript-schema/operand/location-operand';
import { ArithmeticOperator } from '@mparticle/audience-typescript-schema/common/operator';
import { DateOperandFactory } from './date-operand-factory';
import { LocationOperandFactory } from './location-operand-factory';
import { Model } from '@mparticle/audience-typescript-schema/common/model';
/**
 * Factory class for creating different types of operands
 */
export class OperandFactory {

    /**
     * Creates a path operand
     * @param path The path to reference
     * @returns A path operand
     */
    static createModelPath(model: Model, path: string): Operand {
        return { model, path };
    }

    /**
     * Creates a date operand
     * @param dateOperand The date operand
     * @returns A date operand
     */
    static createDate(dateOperand: DateOperand): Operand {
        return dateOperand;
    }

    /**
     * Creates an arithmetic operand
     * @param operator The arithmetic operator
     * @param left The left operand
     * @param right The right operand
     * @returns An arithmetic operand
     */
    static createArithmetic(
        operator: ArithmeticOperator,
        left: Operand,
        right: Operand
    ): Operand {
        return {
            operator,
            left,
            right
        };
    }

    /**
     * Creates an absolute date operand
     * @param dateString The ISO 8601 date string
     * @returns A date operand
     */
    static createAbsoluteDate(dateString: string): DateOperand {
        return DateOperandFactory.createAbsoluteDate(dateString);
    }

    /**
     * Creates a relative date operand
     * @param offset The number of units to offset
     * @param unit The unit of time
     * @param boundary Optional boundary specification
     * @returns A date operand
     */
    static createRelativeDate(
        offset: number,
        unit: string,
        boundary?: 'start' | 'end' | 'middle'
    ): DateOperand {
        return DateOperandFactory.createRelativeDate(offset, unit as any, boundary);
    }

    /**
     * Creates a location operand with latitude and longitude
     * @param latitude The latitude
     * @param longitude The longitude
     * @returns A location operand
     */
    static createLocationPoint(latitude: number, longitude: number): LocationOperand {
        return LocationOperandFactory.createLocation(latitude, longitude);
    }

    /**
     * Creates a location operand with latitude, longitude, and distance in meters
     * @param latitude The latitude
     * @param longitude The longitude
     * @param meters The distance in meters
     * @returns A location operand
     */
    static createLocationWithMeters(
        latitude: number,
        longitude: number,
        meters: number
    ): LocationOperand {
        return LocationOperandFactory.createLocationWithMeters(latitude, longitude, meters);
    }

    /**
     * Creates a location operand with latitude, longitude, and distance in miles
     * @param latitude The latitude
     * @param longitude The longitude
     * @param miles The distance in miles
     * @returns A location operand
     */
    static createLocationWithMiles(
        latitude: number,
        longitude: number,
        miles: number
    ): LocationOperand {
        return LocationOperandFactory.createLocationWithMiles(latitude, longitude, miles);
    }

    /**
     * Creates a location operand with latitude, longitude, and distance in kilometers
     * @param latitude The latitude
     * @param longitude The longitude
     * @param kilometers The distance in kilometers
     * @returns A location operand
     */
    static createLocationWithKilometers(
        latitude: number,
        longitude: number,
        kilometers: number
    ): LocationOperand {
        return LocationOperandFactory.createLocationWithKilometers(latitude, longitude, kilometers);
    }
} 