export type DistanceUnit =
    "meters"
    | "miles"
    | "kilometers";


export type Location = {
    latitude: number,
    longitude: number,
    distance?: {
        value: number,
        unit: DistanceUnit
    }
}