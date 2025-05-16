#!/bin/bash

# Usage:
#   ./add_titles_to_schema.sh [input.json] > output.json

INPUT_FILE="${1:-schema/audience-schema.json}"

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Error: File '$INPUT_FILE' not found." >&2
  exit 1
fi

# Use global jq
JQ="jq"

# Define mappings: JSONPath-like path | title
read -r -d '' MAPPINGS <<EOF
$.definitions.Audience|AudienceDefinition
$.definitions.Audience.properties.audience|Audience
$.definitions.AudienceQuery.anyOf[1]|EventAudienceQuery
$.definitions.AudienceQuery.anyOf[2]|UserAudienceQuery
$.definitions.DateOperand.anyOf[0]|AbsoluteDateOperand
$.definitions.DateOperand.anyOf[1]|RelativeDateOperand
$.definitions.Expression.anyOf[0]|JoinExpression
$.definitions.Expression.anyOf[1]|UnaryExpression
$.definitions.Expression.anyOf[2]|ExistsExpression
$.definitions.Expression.anyOf[3]|BinaryExpression
$.definitions.Expression.anyOf[4]|ModelAggregationExpression
$.definitions.Expression.anyOf[5]|LogicalExpression
$.definitions.Expression.anyOf[6]|LocationLeftExpression
$.definitions.Expression.anyOf[7]|LocationRightExpression
$.definitions.Operand.anyOf[4]|PathOperand
$.definitions.Operand.anyOf[5]|ArithmeticOperand
$.definitions.PathExpression.anyOf[0]|BooleanPathExpression
$.definitions.PathExpression.anyOf[1]|NumberPathExpression
$.definitions.PathExpression.anyOf[2]|StringPathExpression
$.definitions.PathExpression.anyOf[3]|UnaryPathExpression
$.definitions.PathExpression.anyOf[4]|BinaryPathExpression
$.definitions.SingleModelExpression.anyOf[0]|NotSingleModelExpression
$.definitions.SingleModelExpression.anyOf[1]|ExistsSingleModelExpression
$.definitions.SingleModelExpression.anyOf[2]|BinarySingleModelExpression
$.definitions.SingleModelExpression.anyOf[3]|LogicalSingleModelExpression
$.definitions.SingleModelExpression.anyOf[4]|LocationSingleModelExpression
$.definitions.SingleModelExpression.anyOf[5]|LocationRightSingleModelExpression
EOF

jq_script="."

# Converts JSONPath-style strings into valid jq selectors
function convert_json_path_to_jq() {
  local path="$1"
  local jq_path="."
  local trimmed="${path#\$.}"

  while [[ $trimmed =~ ^([^.[]+)(\[([0-9]+)\])?(.*) ]]; do
    key="${BASH_REMATCH[1]}"
    index="${BASH_REMATCH[3]}"
    rest="${BASH_REMATCH[4]}"

    jq_path+="[\"$key\"]"
    if [[ -n "$index" ]]; then
      jq_path+="[$index]"
    fi

    trimmed="$rest"
    trimmed="${trimmed#.}"
  done

  echo "$jq_path"
}

# Build full jq transformation
while IFS='|' read -r path title; do
  [[ -z "$path" || -z "$title" ]] && continue
  jq_path=$(convert_json_path_to_jq "$path")
  escaped_title="${title//\"/\\\"}"
  jq_script+=" | ${jq_path}.title = \"${escaped_title}\""
done <<< "$MAPPINGS"

# Apply the transformation
"$JQ" "$jq_script" "$INPUT_FILE"
