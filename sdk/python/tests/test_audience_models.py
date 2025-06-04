# type: ignore
import json

from mp_audience_sdk.models.audience_models import AudienceDefinition, BinaryCondition, BinaryOperator, ModelPath, \
    Version, LogicalCondition, LogicalOperator, AbsoluteDateExpression, AbsoluteDate, RelativeDateExpression, \
    RelativeDate, Relative, DateUnit, AggregationOperator, ModelAggregationExpression


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
        audience=BinaryCondition(
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
        "conditions": [
            {
                "operator": "and",
                "conditions": [
                    {
                        "operator": "or",
                        "conditions": [
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
                        "conditions": [
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

    color_or_expr = LogicalCondition(
        operator=LogicalOperator.or_,
        conditions=[
            BinaryCondition(
                operator=BinaryOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="blue",
            ),
            BinaryCondition(
                operator=BinaryOperator.equals,
                left=ModelPath(model="user", path="color"),
                right="yellow",
            ),
            BinaryCondition(
                operator=BinaryOperator.equals, left=ModelPath(model="user", path="color"), right="green"
            ),
        ],
    )

    age_between_expr = LogicalCondition(
        operator=LogicalOperator.and_,
        conditions=[
            BinaryCondition(
                operator=BinaryOperator.greater_than_equal,
                left=ModelPath(model="user", path="age"),
                right=20.0,
            ),
            BinaryCondition(
                operator=BinaryOperator.less_than_equal,
                left=ModelPath(model="user", path="age"),
                right=40.0,
            ),
        ],
    )

    absolute_date_expr = BinaryCondition(
        operator=BinaryOperator.equals,
        left=ModelPath(model="user", path="registration_date"),
        right=AbsoluteDateExpression(date=AbsoluteDate(absolute="2024-01-15T00:00:00Z")),
    )

    relative_date_expr = BinaryCondition(
        operator=BinaryOperator.greater_than_equal,
        left=ModelPath(model="user", path="last_seen_date"),
        right=RelativeDateExpression(date=RelativeDate(relative=Relative(offset=-30, unit=DateUnit.day))),
    )

    user_query = LogicalCondition(
        operator=LogicalOperator.and_,
        conditions=[
            color_or_expr,
            age_between_expr,
            absolute_date_expr,
            relative_date_expr,
        ],
    )

    audience_defintion = AudienceDefinition(
        audience=LogicalCondition(
            operator=LogicalOperator.and_,
            conditions=[user_query],
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
            "group_by_model": "user",
            "expression": {
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

    aggregate_expr = ModelAggregationExpression(
        operator=AggregationOperator.min,
        group_by_model="user",
        expression=ModelPath(model="order", path="total"),
        condition=BinaryCondition(
            left=ModelPath(model="order", path="item_count"), operator=BinaryOperator.greater_than, right=2
        ),
    )

    audience_defintion = AudienceDefinition(
        audience=BinaryCondition(operator=BinaryOperator.greater_than_equal, left=aggregate_expr, right=100),
        schema_version=Version("1.0"),
    )

    assert deserialized_obj == audience_defintion
