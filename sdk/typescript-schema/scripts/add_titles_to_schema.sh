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
$.definitions.DateOperand.anyOf[0]|AbsoluteDateOperand
$.definitions.DateOperand.anyOf[1]|RelativeDateOperand
$.definitions.Expression.anyOf[0]|JoinExpression
$.definitions.Expression.anyOf[1]|UnaryExpression
$.definitions.Expression.anyOf[2]|BinaryExpression
$.definitions.Expression.anyOf[3]|ModelAggregationExpression
$.definitions.PathExpression.anyOf[0]|BooleanPathExpression
$.definitions.PathExpression.anyOf[1]|NumberPathExpression
$.definitions.PathExpression.anyOf[2]|StringPathExpression
$.definitions.PathExpression.anyOf[3]|UnaryPathExpression
$.definitions.PathExpression.anyOf[4]|BinaryPathExpression
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
