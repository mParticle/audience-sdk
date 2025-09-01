import { Location } from "../literal/location";
import { ModelPath } from "../literal/model-path";

/**
 * @title ValueLocationExpression
 */
export type ValueLocationExpression = Location
    | ModelPath

/**
 * @title LocationExpression
 * @description Represents an expression that evaluates to a location or location-based condition.
 */
export type LocationExpression = ValueLocationExpression
