.PHONY: build build-typescript generate-python-models test

PYTHON_OUTPUT_DIR := sdk/python/mp_audience_sdk/models
SCHEMA_FILE := schema/audience-definition-schema.json
PYTHON_OUTPUT_FILE := $(PYTHON_OUTPUT_DIR)/audience_models.py
TYPESCRIPT_SCHEMA_DIR := sdk/typescript-schema
PYTHON_FIX_TYPE_FILE := sdk/python/fixup_types.py

build: build-typescript generate-python-models test

build-typescript:
	cd $(TYPESCRIPT_SCHEMA_DIR) && \
	yarn install && \
	yarn build && \
	yarn gen-schema

generate-python-models:
	mkdir -p $(PYTHON_OUTPUT_DIR)
	datamodel-codegen --input $(SCHEMA_FILE) \
		--input-file-type jsonschema \
		--output $(PYTHON_OUTPUT_FILE) \
		--target-python-version 3.11 \
		--use-title-as-name \
		--output-model-type pydantic_v2.BaseModel \
		--field-constraints \
		--snake-case-field \
		--encoding utf-8 \
		--use-union-operator
	python $(PYTHON_FIX_TYPE_FILE) $(PYTHON_OUTPUT_FILE)
	black $(PYTHON_OUTPUT_DIR)

test:
	python -m pytest sdk/python/tests/ -v

clean:
	rm -rf $(PYTHON_OUTPUT_DIR)/*
