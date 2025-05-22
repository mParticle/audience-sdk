import json

from mp_audience_sdk.models.audience_models import (
    AbsoluteDate,
    AbsoluteDateOperand,
    AudienceDefinition,
    AudienceQuery,
    BinaryOperator,
    BinarySingleModelExpression,
    DateOperand,
    DateUnit,
    LogicalAudienceQueries,
    LogicalOperator,
    LogicalSingleModelExpression,
    ModelPath,
    Operand,
    Relative,
    RelativeDate,
    RelativeDateOperand,
    SingleModelExpression,
    UserAudienceQuery,
    UserQuery,
    Version,
)


def test_user_query():
    json_data = """
    {
      "audience": {
        "operator": "and",
        "queries": [
          {
            "user": {
              "model": "user",
              "attributes": {
                "operator": "greater_than_equal",
                "left": {
                  "model": "user",
                  "path": "product_id"
                },
                "right": 3
              }
            }
          }
        ]
      },
      "schema_version": "1.0"
    }
    """

    json_dict = json.loads(json_data)
    deserialized_obj = AudienceDefinition.model_validate(json_dict)

    user_audience_query = AudienceQuery(
        root=UserAudienceQuery(
            user=UserQuery(
                model="user",  # TODO: remove this
                attributes=SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.greater_than_equal,
                        left=Operand(root=ModelPath(model="user", path="product_id")),
                        right=Operand(root=3),
                    )
                ),
            )
        )
    )

    audience_defintion = AudienceDefinition(
        audience=LogicalAudienceQueries(
            operator=LogicalOperator.and_,
            queries=[user_audience_query],
        ),
        schema_version=Version("1.0"),
    )

    assert audience_defintion == deserialized_obj


def test_user_query_with_single_model():
    audience_definition_json = """
{
  "audience": {
    "operator": "and",
    "queries": [
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
                                    "model": "user",
                                    "path": "color"
                                },
                                "right": "blue"
                            },
                            {
                                "operator": "equals",
                                "left": {
                                    "model": "user",
                                    "path": "color"
                                },
                                "right": "yellow"
                            },
                            {
                                "operator": "equals",
                                "left": {
                                    "model": "user",
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
                                    "model": "user",
                                    "path": "age"
                                },
                                "right": 20.0
                            },
                            {
                                "operator": "less_than_equal",
                                "left": {
                                    "model": "user",
                                    "path": "age"
                                },
                                "right": 40.0
                            }
                        ]
                    },
                    {
                        "operator": "equals",
                        "left": {
                            "model": "user",
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
                            "model": "user",
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
            "model": "user"
        }
      }
    ]
  },
  "schema_version": "1.0"
}
"""
    deserialized_obj = AudienceDefinition.model_validate(
        json.loads(audience_definition_json)
    )

    color_or_expr = SingleModelExpression(
        root=LogicalSingleModelExpression(
            operator=LogicalOperator.or_,
            expressions=[
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.equals,
                        left=Operand(root=ModelPath(model="user", path="color")),
                        right=Operand(root="blue"),
                    )
                ),
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.equals,
                        left=Operand(root=ModelPath(model="user", path="color")),
                        right=Operand(root="yellow"),
                    )
                ),
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.equals,
                        left=Operand(root=ModelPath(model="user", path="color")),
                        right=Operand(root="green"),
                    )
                ),
            ],
        )
    )

    age_between_expr = SingleModelExpression(
        root=LogicalSingleModelExpression(
            operator=LogicalOperator.and_,
            expressions=[
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.greater_than_equal,
                        left=Operand(root=ModelPath(model="user", path="age")),
                        right=Operand(root=20.0),
                    )
                ),
                SingleModelExpression(
                    root=BinarySingleModelExpression(
                        operator=BinaryOperator.less_than_equal,
                        left=Operand(root=ModelPath(model="user", path="age")),
                        right=Operand(root=40.0),
                    )
                ),
            ],
        )
    )

    absolute_date_expr = SingleModelExpression(
        root=BinarySingleModelExpression(
            operator=BinaryOperator.equals,
            left=Operand(root=ModelPath(model="user", path="registration_date")),
            right=Operand(
                root=DateOperand(
                    root=AbsoluteDateOperand(
                        date=AbsoluteDate(absolute="2024-01-15T00:00:00Z")
                    )
                )
            ),
        )
    )

    relative_date_expr = SingleModelExpression(
        root=BinarySingleModelExpression(
            operator=BinaryOperator.greater_than_equal,
            left=Operand(root=ModelPath(model="user", path="last_seen_date")),
            right=Operand(
                root=DateOperand(
                    root=RelativeDateOperand(
                        date=RelativeDate(
                            relative=Relative(offset=-30, unit=DateUnit.day)
                        )
                    )
                )
            ),
        )
    )

    user_query = AudienceQuery(
        root=UserAudienceQuery(
            user=UserQuery(
                model="user",  # TODO: remove this
                attributes=SingleModelExpression(
                    root=LogicalSingleModelExpression(
                        operator=LogicalOperator.and_,
                        expressions=[
                            color_or_expr,
                            age_between_expr,
                            absolute_date_expr,
                            relative_date_expr,
                        ],
                    )
                ),
            )
        )
    )

    audience_defintion = AudienceDefinition(
        audience=LogicalAudienceQueries(
            operator=LogicalOperator.and_,
            queries=[user_query],
        ),
        schema_version=Version("1.0"),
    )

    assert deserialized_obj == audience_defintion
