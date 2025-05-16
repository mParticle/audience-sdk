# mParticle Audience Schema

This repository contains TypeScript schema definitions for mParticle Audiences. It provides type-safe interfaces and types for working with mParticle's audience features.

## Overview

The schema is organized into several key components:

- [Operands](./operand/): Basic data types and operations that can be performed on audience data
- [Expressions](./expression/): Complex logical expressions that combine operands
- [Queries](./query/): Complete audience query definitions

## Installation

```bash
npm install @mparticle/audience-typescript-schema
# or
yarn add @mparticle/audience-typescript-schema
```

## Setup

Before using or developing with this package, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/) (version 20 or higher recommended)
- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- The [`jq`](https://stedolan.github.io/jq/) command-line JSON processor must be installed and available in your system's `PATH`.

To verify `jq` is installed, run:

```bash
jq --version
```

If you do not have `jq`, you can install it using [Homebrew](https://brew.sh/) on macOS:

```bash
brew install jq
```

Or see the [jq installation guide](https://stedolan.github.io/jq/download/) for other platforms.

## Usage

```typescript
import { Audience, Query, Expression, Operand } from '@mparticle/audience-typescript-schema';

// Create audience queries with type safety
const query: Query = {
  // Your query definition here
};
```

## Project Structure

- `operand/`: Contains basic data types and operations
- `expression/`: Defines logical expressions and operators
- `query/`: Implements audience query structures
- `common/`: Shared types and utilities
- `dist/`: Compiled JavaScript output

## Development

To build the project:

```bash
yarn build
# or
npm run build
```

### Updating the Schema

Whenever you make changes to the schema definitions, you must regenerate the schema output by running:

```bash
npm run gen-schema
```

This ensures that all generated files are up to date with your changes.

### Updating Title Paths in add_titles_to_schema.sh

If you add, remove, or rename types or titles in the schema, you will need to update the relevant JSONPath mappings in [`scripts/add_titles_to_schema.sh`](./scripts/add_titles_to_schema.sh) to reflect these changes. This script relies on hardcoded paths to insert titles into the schema, so keeping these paths accurate is necessary for correct schema generation.

## License

Apache License 2.0
