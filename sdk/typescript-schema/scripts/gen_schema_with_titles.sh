#!/bin/bash

set -e  # Exit on errors

TSCONFIG="tsconfig.json"

# Use a trap to ensure we reset emitDeclarationOnly to true no matter what
function restore_tsconfig {
  echo "Restoring emitDeclarationOnly to true..."
  jq '.compilerOptions.emitDeclarationOnly = true' "$TSCONFIG" > tmp.tsconfig.json && mv tmp.tsconfig.json "$TSCONFIG"
}
trap restore_tsconfig EXIT

echo "Setting emitDeclarationOnly to false..."
jq '.compilerOptions.emitDeclarationOnly = false' "$TSCONFIG" > tmp.tsconfig.json && mv tmp.tsconfig.json "$TSCONFIG"

echo "Generating JSON schema..."
./node_modules/.bin/ts-json-schema-generator --path index.ts --out schema/audience-schema.json
cp -f schema/audience-schema.json ../../schema/audience-definition-schema.json

echo "Schema generation complete."
