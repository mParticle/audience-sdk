# Audience Schema & SDK

This repository contains tools and specifications for working with audience definitions in a standardized format. It includes TypeScript implementations of the audience schema along with SDKs to help build and validate audience definitions.

## Overview

The audience schema provides a structured way to define target audiences through a combination of user attributes, events, and logical conditions. The TypeScript implementation offers type-safe ways to construct and validate these audience definitions.

## Components

### JSON Schema

The `schema` folder contains models defined in the Json Schema format.

### TypeScript Schema
Located in `sdk/typescript-schema`, this package contains the core TypeScript types and interfaces that define the audience schema format. It provides the foundational types used by the SDK.

### TypeScript SDK
Located in `sdk/typescript`, this is a full-featured SDK that provides builders and utilities for working with audience definitions. It includes:

- Builder classes for constructing audience definitions
- Expression factories for creating complex queries
- Model factories for creating different types of models
- Validation utilities
- Serialization/deserialization helpers

### Python SDK

Install package directly from github (currently we don't publish it to PyPi)

```sh
pip install git+ssh://git@github.com/mParticle/audience-sdk.git#subdirectory=sdk/python
```

or from specific branch

```sh
pip install git+ssh://git@github.com/mParticle/audience-sdk.git@< branch name >#subdirectory=sdk/python
```

uninstall

```sh
pip uninstall mp_audience_sdk
```

update models

1. `pip install -r sdk/python/requirements-dev.txt`
2. `make generate-python-models`
3. increment version in `sdk/python/pyproject.toml`


## Getting Started

### Installation

For the TypeScript SDK:
