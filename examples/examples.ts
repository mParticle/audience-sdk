import { Audience } from "../../spec/audience";
import { EventQuery } from "../../spec/query/event-query";

// 0 events in the last 30 days
const noEventsInTheLast30Days: Audience = {
    audience: {
        operator: "and",
        queries: [
            {
                event: {
                    model: "Event_Model_0",
                    count: {
                        operator: "equals",
                        operand: 0
                    },
                    date: {
                        operator: "less_than",
                        operand: {
                            relative: {
                                offset: -30,
                                unit: "day"
                            }
                        }
                    }
                }
            }
        ]
    }
};

// users who watched season 1 of white lotus but not season 2
const usersWhoWatchedSeason1AndNotSeason2: Audience = {
    audience: {
        operator: "and",
        queries: [
            {
                event: {
                    model: "Event_Model_0",
                    event_name: { operator: "equals", operand: "Watch Show" },
                    attributes: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "equals",
                                left: { path: "show.title" },
                                right: "The White Lotus"
                            },
                            {
                                operator: "equals",
                                left: { path: "show.season" },
                                right: "1"
                            }
                        ]
                    }
                }
            },
            {
                event: {
                    model: "Event_Model_0",
                    event_name: { operator: "equals", operand: "Watch Show" },
                    attributes: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "equals",
                                left: { path: "show.title" },
                                right: "The White Lotus"
                            },
                            {
                                operator: "equals",
                                left: { path: "show.season" },
                                right: "2"
                            }
                        ]
                    },
                    count: {
                        operator: "equals",
                        operand: 0
                    }
                }
            }
        ]
    }
};