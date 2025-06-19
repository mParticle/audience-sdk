export type DistanceUnit =
    "meters"
    | "miles"
    | "kilometers";

/**
 * Represents a geographic location, optionally with a distance constraint.
 * Examples:
 * 1. Simple location:
 *    { "latitude": 37.7749, "longitude": -122.4194 }
 *
 * 2. Location with distance in miles:
 *    { "latitude": 40.7128, "longitude": -74.0060, "distance": { "value": 10, "unit": "miles" } }
 *
 * 3. Location with distance in kilometers:
 *    { "latitude": 51.5074, "longitude": -0.1278, "distance": { "value": 5, "unit": "kilometers" } }
 */
export type Location = {
    latitude: number,
    longitude: number,
    distance?: {
        value: number,
        unit: DistanceUnit
    }
}
