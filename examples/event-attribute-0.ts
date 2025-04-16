import { Audience } from "../../spec/audience";

const eventAttributeAsEvent : Audience = {
    audience: {
        operator: "and",
        queries: [
            {
                event: {
                    model: "Event_Model_Id0",
                    event_type: "navigation",
                    event_name: "home page",
                    attributes: {
                        operator: "contains",
                        left: { path: "referrer" },
                        right: "campaign"
                    }
                }
            }
        ]
    }
};

const eventAttributeAsGeneric : Audience = {
    audience: {
        operator: "and",
        queries: [
            {
                query: {
                    model: "custom_events_0",
                    expression: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "equals",
                                left: { path: "event_type" },
                                right: "navigation"
                            },
                            {
                                operator: "equals",
                                left: { path: "event_name" },
                                right: "home page"
                            },
                            {
                                operator: "contains",
                                left: { path: "custom_attributes.referrer" },
                                right: "campaign"
                            }
                        ]
                    }
                }
            }
        ]
    }
};