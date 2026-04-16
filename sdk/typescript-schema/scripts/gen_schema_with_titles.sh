#!/bin/bash

set -e  # Exit on errors

echo "Generating JSON schema..."
./node_modules/.bin/ts-json-schema-generator --tsconfig tsconfig.schema-gen.json --path index.ts --out schema/audience-schema.tmp.json

echo "Adding titles to schema..."
./scripts/add_titles_to_schema.sh schema/audience-schema.tmp.json > schema/audience-schema.json
cp -f schema/audience-schema.json ../../schema/audience-definition-schema.json
rm -f schema/audience-schema.tmp.json

echo "Schema generation complete."
