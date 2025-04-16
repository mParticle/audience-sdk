import { Location } from "../common/location";

/**
 * Represents a location value that can be used in location-based expressions.
 * Examples:
 * 1. Simple location (latitude/longitude only):
 *    {
 *      location: {
 *        latitude: 40.7128,
 *        longitude: -74.0060
 *      }
 *    }
 * 
 * 2. Location with distance:
 *    {
 *      location: {
 *        latitude: 40.7128,
 *        longitude: -74.0060,
 *        distance: {
 *          value: 5,
 *          unit: "miles"
 *        }
 *      }
 *    }
 * 
 * 3. Location with distance in meters:
 *    {
 *      location: {
 *        latitude: 40.7128,
 *        longitude: -74.0060,
 *        distance: {
 *          value: 1000,
 *          unit: "meters"
 *        }
 *      }
 *    }
 */
export type LocationOperand = {
    location: Location
}