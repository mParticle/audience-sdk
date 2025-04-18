import { LocationOperand } from '@mparticle/audience-typescript-schema/operand/location-operand';
import { Location, DistanceUnit } from '@mparticle/audience-typescript-schema/common/location';

export class LocationOperandFactory {
    /**
     * Creates a location operand with latitude and longitude
     * @param latitude The latitude
     * @param longitude The longitude
     */
    static createLocation(latitude: number, longitude: number): LocationOperand {
        const location: Location = {
            latitude,
            longitude
        };
        return { location };
    }

    /**
     * Creates a location operand with latitude, longitude, and distance
     * @param latitude The latitude
     * @param longitude The longitude
     * @param distanceValue The distance value
     * @param distanceUnit The distance unit
     */
    static createLocationWithDistance(
        latitude: number,
        longitude: number,
        distanceValue: number,
        distanceUnit: DistanceUnit
    ): LocationOperand {
        const location: Location = {
            latitude,
            longitude,
            distance: {
                value: distanceValue,
                unit: distanceUnit
            }
        };
        return { location };
    }

    /**
     * Creates a location operand with latitude, longitude, and distance in meters
     * @param latitude The latitude
     * @param longitude The longitude
     * @param meters The distance in meters
     */
    static createLocationWithMeters(
        latitude: number,
        longitude: number,
        meters: number
    ): LocationOperand {
        return this.createLocationWithDistance(latitude, longitude, meters, 'meters');
    }

    /**
     * Creates a location operand with latitude, longitude, and distance in miles
     * @param latitude The latitude
     * @param longitude The longitude
     * @param miles The distance in miles
     */
    static createLocationWithMiles(
        latitude: number,
        longitude: number,
        miles: number
    ): LocationOperand {
        return this.createLocationWithDistance(latitude, longitude, miles, 'miles');
    }

    /**
     * Creates a location operand with latitude, longitude, and distance in kilometers
     * @param latitude The latitude
     * @param longitude The longitude
     * @param kilometers The distance in kilometers
     */
    static createLocationWithKilometers(
        latitude: number,
        longitude: number,
        kilometers: number
    ): LocationOperand {
        return this.createLocationWithDistance(latitude, longitude, kilometers, 'kilometers');
    }
} 