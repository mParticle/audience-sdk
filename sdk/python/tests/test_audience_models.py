import json

from mp_audience_sdk.models.audience_models import (
    AbsoluteDate,
    AggregateNumberExpression,
    AggregationNumberOperator,
    AudienceDefinition,
    DateBoolExpression,
    DateUnit,
    LogicalBoolOperator,
    LogicalManyBoolExpression,
    ModelPath,
    NumberBoolExpression,
    NumberBoolOperator,
    Relative,
    RelativeDate,
    DateLiteralExpression,
    StringBoolExpression,
    StringBoolOperator,
)


def test_user_query():
    json_data = """
{
  "audience": {
        "operator": "greater_than_equal",
        "left": {
          "model": "user",
          "path": "product_id"
        },
        "right": 3
    },
  "schema_version": "1.0"
}
    """

    json_dict = json.loads(json_data)
    deserialized_obj = AudienceDefinition.model_validate(json_dict)

    audience_defintion = AudienceDefinition(
        audience=NumberBoolExpression(
            operator=NumberBoolOperator.greater_than_equal,
            left=ModelPath(model="user", path="product_id"),
            right=3,
        ),
        schema_version="1.0",
    )

    assert audience_defintion == deserialized_obj


def test_user_query_with_single_model():
    audience_definition_json = """
{
    "audience": {
        "operator": "and",
        "expressions": [
            {
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
            }
        ]
    },
    "schema_version": "1.0"
}
"""
    deserialized_obj = AudienceDefinition.model_validate(
        json.loads(audience_definition_json)
    )

    color_or_expr = LogicalManyBoolExpression(
        operator=LogicalBoolOperator.or_,
        expressions=[
            StringBoolExpression(
                operator=StringBoolOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="blue",
            ),
            StringBoolExpression(
                operator=StringBoolOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="yellow",
            ),
            StringBoolExpression(
                operator=StringBoolOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="green",
            ),
        ],
    )

    age_between_expr = LogicalManyBoolExpression(
        operator=LogicalBoolOperator.and_,
        expressions=[
            NumberBoolExpression(
                operator=NumberBoolOperator.greater_than_equal,
                left=ModelPath(model="user", path="age"),
                right=20.0,
            ),
            NumberBoolExpression(
                operator=NumberBoolOperator.less_than_equal,
                left=ModelPath(model="user", path="age"),
                right=40.0,
            ),
        ],
    )

    absolute_date_expr = DateBoolExpression(
        operator=NumberBoolOperator.equals,
        left=ModelPath(model="user", path="registration_date"),
        right=DateLiteralExpression(date=AbsoluteDate(absolute="2024-01-15T00:00:00Z")),
    )

    relative_date_expr = DateBoolExpression(
        operator=NumberBoolOperator.greater_than_equal,
        left=ModelPath(model="user", path="last_seen_date"),
        right=DateLiteralExpression(
            date=RelativeDate(relative=Relative(offset=-30, unit=DateUnit.day))
        ),
    )

    user_query = LogicalManyBoolExpression(
        operator=LogicalBoolOperator.and_,
        expressions=[
            color_or_expr,
            age_between_expr,
            absolute_date_expr,
            relative_date_expr,
        ],
    )

    audience_defintion = AudienceDefinition(
        audience=LogicalManyBoolExpression(
            operator=LogicalBoolOperator.and_,
            expressions=[user_query],
        ),
        schema_version="1.0",
    )

    assert deserialized_obj == audience_defintion


def test_user_query_with_aggregate():
    audience_definition_json = """
{
    "audience": {
        "operator": "greater_than_equal",
        "left": {
            "operator": "min",
            "group_by_model": "user",
            "operand": {
                "model": "order",
                "path": "total"
            },
            "condition": {
                "operator": "greater_than",
                "left": {
                    "model": "order",
                    "path": "item_count"
                },
                "right": 2
            }
        },
        "right": 100
    },
    "schema_version": "1.0"
}
"""

    deserialized_obj = AudienceDefinition.model_validate(
        json.loads(audience_definition_json)
    )

    aggregate_expr = AggregateNumberExpression(
        operator=AggregationNumberOperator.min,
        group_by_model="user",
        operand=ModelPath(model="order", path="total"),
        condition=NumberBoolExpression(
            left=ModelPath(model="order", path="item_count"),
            operator=NumberBoolOperator.greater_than,
            right=2,
        ),
    )

    audience_defintion = AudienceDefinition(
        audience=NumberBoolExpression(
            operator=NumberBoolOperator.greater_than_equal, left=aggregate_expr, right=100
        ),
        schema_version="1.0",
    )

    assert deserialized_obj == audience_defintion
