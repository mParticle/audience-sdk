# Audience SDK
Audience schema and SDKs for interacting with mParticle's Audience definitions.
# Audience Definition Format

This repository contains an evolving specification for defining audience segments through a JSON-based query format. The format enables building complex audience definitions by combining different types of queries and expressions.

TODO: requirements

## Building Blocks

### Models and References

The format works with different data models that represent various aspects of user behavior and attributes:

- Application events
- Ecommerce events 
- User attributes
- (Future) Identity resolution
- (Future) Media consumption

Models can be referenced and joined together to create more complex audience definitions.

### Operators

Several types of operators are supported:

TODO: operators

### Expressions

Expressions combine operators with values to create filtering conditions:

TODO: expressions

### Queries

Queries tie everything together to define the audience:

TODO: queries

## Roadmap

The specification is being developed incrementally:

1. ⋯ Event sequencing
2. ⋯ Calculated Attributes (as a definition, and a query))
3. ⋯ Additional domain-specific models (identity, ecommerce, media)

## Examples

TODO Examples

