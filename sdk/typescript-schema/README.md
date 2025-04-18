# mParticle Audience Schema

This repository contains TypeScript schema definitions for mParticle Audiences. It provides type-safe interfaces and types for working with mParticle's audience features.

## Overview

The schema is organized into several key components:

- [Operands](./operand/): Basic data types and operations that can be performed on audience data
- [Expressions](./expression/): Complex logical expressions that combine operands
- [Queries](./query/): Complete audience query definitions

## Installation

```bash
npm install @mparticle/audience-schema
# or
yarn add @mparticle/audience-schema
```

## Usage

```typescript
import { Audience, Query, Expression, Operand } from '@mparticle/audience-schema';

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

## License

Apache License 2.0
