
import { EventQuery } from "../../spec/query/event-query";
import { UserQuery } from "../../spec/query/user-query";


/**
 * This file contains examples of audience definitions for various use cases.
 */
/**
 * Audience definition for users with color attribute matching blue, yellow, or green,
 * AND who are between 20 and 40 years old.
 * This definition will include all users whose "color" attribute matches any of the specified values
 * AND whose age is greater than 20 and less than 40.
 * 
 * JSON representation:
 * {
 *   "user": {
 *     "attributes": {
 *       "operator": "and",
 *       "expressions": [
 *         {
 *           "operator": "match_any",
 *           "left": "color",
 *           "right": ["blue", "yellow", "green"]
 *         },
 *         {
 *           "operator": "between",
 *           "left": { "path": "age" },
 *           "right": [20, 40]
 *         }
 *       }
 *     }
 *   }
 * }
 */
export const colorAttributeAudience: UserQuery = {
    user: {
        attributes: {
            operator: "and",
            expressions: [
                {
                    operator: "match_any",
                    left: "color",
                    right: ["blue", "yellow", "green"]
                },
                {
                    operator: "between",
                    left: { path: "age" },
                    right: [20, 40],
                }
            ]
        }
    }
};

/**
 * Audience definition for users who have performed an "add to cart" event in the last 7 days.
 * This definition will include all users who have triggered an event with type "commerce" and name "add_to_cart"
 * within the last 7 days.
 * 
 * JSON representation:
 * {
 *   "event": {
 *     "event_type": { "operator": "eq", "operand": "commerce" },
 *     "event_name": { "operator": "eq", "operand": "add_to_cart" },
 *     "date": {
 *       "operator": "gte",
 *       "relative": {
 *           "offset": -7,
 *           "unit": "day"
 *         }
 *       }
 *     }
 *   }
 * }
 */
export const recentAddToCartAudience: EventQuery = {
    event: {
        type: { operator: "eq", operand: "commerce" },
        name: { operator: "eq", operand: "add_to_cart" },
        date: {
            operator: "gte",
            relative: {
                offset: -7,
                unit: "day"
            }
        }
    }
};
