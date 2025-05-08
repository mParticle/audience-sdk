.PHONY: generate-models

PYTHON_OUTPUT_DIR := sdk/python/audience_sdk/models
SCHEMA_FILE := schema/audience-definition-schema.json
PYTHON_OUTPUT_FILE := $(PYTHON_OUTPUT_DIR)/audience_models.py

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
		--encoding utf-8

clean:
	rm -rf $(PYTHON_OUTPUT_DIR)/*
