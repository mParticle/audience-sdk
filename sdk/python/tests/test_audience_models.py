# type: ignore
import json

from mp_audience_sdk.models.audience_models import (
    AbsoluteDate,
    AbsoluteDateOperand,
    AggregationOperator,
    AudienceDefinition,
    BinaryExpression,
    BinaryOperator,
    DateUnit,
    LogicalExpression,
    LogicalOperator,
    ModelAggregationOperand,
    ModelPath,
    Relative,
    RelativeDate,
    RelativeDateOperand,
    Version,
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
        audience=BinaryExpression(
            operator=BinaryOperator.greater_than_equal,
            left=ModelPath(model="user", path="product_id"),
            right=3,
        ),
        schema_version=Version("1.0"),
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
    deserialized_obj = AudienceDefinition.model_validate(json.loads(audience_definition_json))

    color_or_expr = LogicalExpression(
        operator=LogicalOperator.or_,
        expressions=[
            BinaryExpression(
                operator=BinaryOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="blue",
            ),
            BinaryExpression(
                operator=BinaryOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="yellow",
            ),
            BinaryExpression(
                operator=BinaryOperator.equals, left=ModelPath(model="user", path="color"), right="green"
            ),
        ],
    )

    age_between_expr = LogicalExpression(
        operator=LogicalOperator.and_,
        expressions=[
            BinaryExpression(
                operator=BinaryOperator.greater_than_equal,
                left=ModelPath(model="user", path="age"),
                right=20.0,
            ),
            BinaryExpression(
                operator=BinaryOperator.less_than_equal,
                left=ModelPath(model="user", path="age"),
                right=40.0,
            ),
        ],
    )

    absolute_date_expr = BinaryExpression(
        operator=BinaryOperator.equals,
        left=ModelPath(model="user", path="registration_date"),
        right=AbsoluteDateOperand(date=AbsoluteDate(absolute="2024-01-15T00:00:00Z")),
    )

    relative_date_expr = BinaryExpression(
        operator=BinaryOperator.greater_than_equal,
        left=ModelPath(model="user", path="last_seen_date"),
        right=RelativeDateOperand(date=RelativeDate(relative=Relative(offset=-30, unit=DateUnit.day))),
    )

    user_query = LogicalExpression(
        operator=LogicalOperator.and_,
        expressions=[
            color_or_expr,
            age_between_expr,
            absolute_date_expr,
            relative_date_expr,
        ],
    )

    audience_defintion = AudienceDefinition(
        audience=LogicalExpression(
            operator=LogicalOperator.and_,
            expressions=[user_query],
        ),
        schema_version=Version("1.0"),
    )

    assert deserialized_obj == audience_defintion


def test_user_query_with_aggregate():
    audience_definition_json = """
{
    "audience": {
        "operator": "greater_than_equal",
        "left": {
            "operator": "min",
            "group_by": "user",
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

    deserialized_obj = AudienceDefinition.model_validate(json.loads(audience_definition_json))

    aggregate_expr = ModelAggregationOperand(
        operator=AggregationOperator.min,
        group_by="user",
        operand=ModelPath(model="order", path="total"),
        condition=BinaryExpression(
            left=ModelPath(model="order", path="item_count"), operator=BinaryOperator.greater_than, right=2
        ),
    )

    audience_defintion = AudienceDefinition(
        audience=BinaryExpression(operator=BinaryOperator.greater_than_equal, left=aggregate_expr, right=100),
        schema_version=Version("1.0"),
    )

    assert deserialized_obj == audience_defintion
