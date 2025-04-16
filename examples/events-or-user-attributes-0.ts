import { Audience } from "../../spec/audience";
import { Expression } from "../../spec/expression/expression";
import { SingleModelExpression } from "../../spec/expression/single-model-expression";

const eventsOrUserAttributesAsSpecific: Audience = {
    audience: {
        operator: "or",
        queries: [
            {
                event: {
                    model: "Event_Model_0",
                    event_name: { operator: "matches", operand: { path: "^Purchase.*" } },
                    expression: {
                        operator: "and",
                        expressions: [
                            {
                                model: "Order",
                                expression: {
                                    operator: "and",
                                    expressions: [
                                        {
                                            operator: "less_than",
                                            left: { path: "date" },
                                            right: { date: { relative: { offset: -7, unit: "day" } } }
                                        }
                                    ]
                                },
                                left: {
                                    model: "Product",
                                    operator: "sum",
                                    path: "cost"
                                },
                                operator: "greater_than",
                                right: 100
                            }
                        ]
                    },
                    location: {
                        latitude: 40.7193,
                        longitude: -74.0016,
                        distance: {
                            value: 5,
                            unit: "miles"
                        }
                    }
                }
            },
            {
                user: {
                    model: "User_Model_0",
                    attributes: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "greater_than",
                                left: { path: "LTV" },
                                right: 100
                            }
                        ]
                    }
                }
            }
        ]
    }
}


const eventsOrUserAttributesAsGeneric: Audience = {
    audience: {
        operator: "or",
        queries: [
            {
                query: {
                    model: "custom_events_0",
                    expression: {
                        operator: "and",
                        expressions: [
                            {
                                model: "Order",
                                expression: {
                                    operator: "and",
                                    expressions: [
                                        {
                                            operator: "less_than",
                                            left: { path: "date" },
                                            right: { date: { relative: { offset: -7, unit: "day" } } }
                                        },
                                        {
                                            model: "Product",
                                            operator: "greater_than",
                                            left: {
                                                operator: "sum",
                                                path: "cost"
                                            },
                                            right: 100
                                        }
                                    ]
                                }
                            },
                            {
                                operator: "within",
                                left: { path: "event.location" },
                                right: {
                                    location: {
                                        latitude: 40.7193,
                                        longitude: -74.0016,
                                        distance: {
                                            value: 5,
                                            unit: "miles"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                query: {
                    model: "user_model_1",
                    expression: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "greater_than",
                                left: { path: "LTV" },
                                right: 100
                            }
                        ]
                    }
                }
            }
        ]
    }
}