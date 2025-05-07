import json

from models.audience_models import (
    AbsoluteDate,
    AbsoluteDateOperand,
    Audience,
    AudienceDefinition,
    AudienceQuery,
    BinaryOperator,
    BinarySingleModelExpression,
    DateOperand,
    DateUnit,
    LogicalOperator,
    LogicalSingleModelExpression,
    Models,
    Operand,
    PathOperand,
    Relative,
    RelativeDate,
    RelativeDateOperand,
    SingleModelExpression,
    UserAudienceQuery,
    UserQuery,
    Version,
)


def test_user_query():
    # The JSON structure to deserialize
    json_data = """
    {
      "audience": {
        "operator": "and",
        "queries": [
          {
            "user": {
              "models": "user",
              "attributes": {
                "operator": "greater_than_equal",
                "left": {
                  "path": "product.id"
                },
                "right": 3
              }
            }
          }
        ],
        "version": "1.0"
      }
    }
    """

    # Parse JSON string to dictionary
    json_dict = json.loads(json_data)

    # Deserialize from dictionary
    deserialized_obj = AudienceDefinition.model_validate(json_dict)

    # Manually construct the expected object
    path_comparison_expr = UserQuery(
        attributes=SingleModelExpression(
            root=BinarySingleModelExpression(
                operator=BinaryOperator.greater_than_equal,
                left=Operand(root=PathOperand(path="product.id")),
                right=Operand(root=3),
            )
        ),
        models=Models(root="user"),
    )

    manually_created_obj = AudienceDefinition(
        audience=Audience(
            operator=LogicalOperator.and_,
            queries=[AudienceQuery(root=UserAudienceQuery(user=path_comparison_expr))],
            version=Version(root="1.0"),
        )
    )

    assert manually_created_obj == deserialized_obj


def test_user_query_with_single_model():
    audience_query_json = """
{
    "user": {
        "attributes": {
            "operator": "and",
            "expressions": [
                {
                    "operator": "or",
                    "expressions": [
                        {
                            "operator": "equals",
                            "left": {
                                "path": "color"
                            },
                            "right": "blue"
                        },
                        {
                            "operator": "equals",
                            "left": {
                                "path": "color"
                            },
                            "right": "yellow"
                        },
                        {
                            "operator": "equals",
                            "left": {
                                "path": "color"
                            },
                            "right": "green"
                        }
                    ]
                },
                {
                    "operator": "and",
                    "expressions": [
                        {
                            "operator": "greater_than_equal",
                            "left": {
                                "path": "age"
                            },
                            "right": 20.0
                        },
                        {
                            "operator": "less_than_equal",
                            "left": {
                                "path": "age"
                            },
                            "right": 40.0
                        }
                    ]
                },
                {
                    "operator": "equals",
                    "left": {
                        "path": "registration_date"
                    },
                    "right": {
                        "date": {
                            "absolute": "2024-01-15T00:00:00Z"
                        }
                    }
                },
                {
                    "operator": "greater_than_equal",
                    "left": {
                        "path": "last_seen_date"
                    },
                    "right": {
                        "date": {
                            "relative": {
                                "offset": -30,
                                "unit": "day"
                            }
                        }
                    }
                }
            ]
        },
        "models": "user_model_1"
    }
}
"""
    deserialized_obj = AudienceQuery.model_validate(json.loads(audience_query_json))

    match_any_expr = SingleModelExpression(
        root=LogicalSingleModelExpression(
            operator=LogicalOperator.or_,
            expressions=[
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.equals,
                        left=Operand(root=PathOperand(path="color")),
                        right=Operand(root="blue"),
                    )
                ),
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.equals,
                        left=Operand(root=PathOperand(path="color")),
                        right=Operand(root="yellow"),
                    )
                ),
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.equals,
                        left=Operand(root=PathOperand(path="color")),
                        right=Operand(root="green"),
                    )
                ),
            ],
        )
    )

    between_expr = SingleModelExpression(
        root=LogicalSingleModelExpression(
            operator=LogicalOperator.and_,
            expressions=[
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.greater_than_equal,
                        left=Operand(root=PathOperand(path="age")),
                        right=Operand(root=20.0),
                    )
                ),
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.less_than_equal,
                        left=Operand(root=PathOperand(path="age")),
                        right=Operand(root=40.0),
                    )
                ),
            ],
        )
    )

    date_expr = SingleModelExpression(
        root=BinarySingleModelExpression(
            operator=BinaryOperator.equals,
            left=Operand(root=PathOperand(path="registration_date")),
            right=Operand(
                root=DateOperand(root=AbsoluteDateOperand(date=AbsoluteDate(absolute="2024-01-15T00:00:00Z")))
            ),
        )
    )

    relative_date_expr = SingleModelExpression(
        root=BinarySingleModelExpression(
            operator=BinaryOperator.greater_than_equal,
            left=Operand(root=PathOperand(path="last_seen_date")),
            right=Operand(
                root=DateOperand(
                    root=RelativeDateOperand(
                        date=RelativeDate(relative=Relative(offset=-30, unit=DateUnit.day))
                    )
                )
            ),
        )
    )

    attributes_expr = SingleModelExpression(
        root=LogicalSingleModelExpression(
            operator=LogicalOperator.and_,
            expressions=[match_any_expr, between_expr, date_expr, relative_date_expr],
        )
    )

    user_query_data = UserQuery(attributes=attributes_expr, models=Models(root="user_model_1"))

    manually_created_obj = AudienceQuery(root=UserAudienceQuery(user=user_query_data))

    assert manually_created_obj == deserialized_obj


def test_user_query_with_joined_models():
    audience_def_json = """
    {
      "audience": {
        "operator": "or",
        "queries": [
          {
            "user": {
              "models": "user",
              "attributes": {
                "operator": "less_than",
                "left": {
                  "date": {
                    "relative": {
                      "offset": -7,
                      "unit": "day"
                    }
                  }
                },
                "right": ""
              }
            }
          },
          {
            "user": {
              "models": "user_attributes",
              "attributes": {
                "operator": "equals",
                "left": {
                  "path": "attribute"
                },
                "right": "some attr value"
              }
            }
          }
        ],
        "version": "1.0"
      }
    }
    """

    deserialized_obj = AudienceDefinition.model_validate(json.loads(audience_def_json))

    realtive_date_expr = UserQuery(
        attributes=SingleModelExpression(
            root=BinarySingleModelExpression(
                operator=BinaryOperator.less_than,
                left=Operand(
                    root=DateOperand(
                        root=RelativeDateOperand(
                            date=RelativeDate(relative=Relative(offset=-7, unit=DateUnit.day))
                        )
                    )
                ),
                right=Operand(root=""),
            )
        ),
        models=Models(root="user"),
    )

    user_attr_expr = UserQuery(
        attributes=SingleModelExpression(
            root=BinarySingleModelExpression(
                operator=BinaryOperator.equals,
                left=Operand(root=PathOperand(path="attribute")),
                right=Operand(root="some attr value"),
            )
        ),
        models=Models(root="user_attributes"),
    )

    audience_definition = AudienceDefinition(
        audience=Audience(
            operator=LogicalOperator.or_,
            queries=[
                AudienceQuery(root=UserAudienceQuery(user=realtive_date_expr)),
                AudienceQuery(root=UserAudienceQuery(user=user_attr_expr)),
            ],
            version=Version(root="1.0"),
        )
    )

    assert audience_definition == deserialized_obj
