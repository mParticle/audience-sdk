import { Audience } from "../../spec/audience";
import { UserQuery } from "../../spec/query/user-query";

const userAttributeAsUser: Audience = {
    audience: {
        operator: "and",
        queries: [
            {
                user: {
                    model: "User_Model_0",
                    attributes: {
                        operator: "equals",
                        left: { path: "Orders.state" },
                        right: "kevin"
                    }
                }
            }
        ]
    }
};

const userAttributeAudienceAsGeneric: Audience = {
    audience: {
        operator: "and",
        queries: [
            {
                query: {
                    model: "user_model_0",
                    expression: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "equals",
                                left: { path: "name" },
                                right: "kevin"
                            }
                        ]
                    }
                }
            }
        ]
    }
};
