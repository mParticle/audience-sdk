# mParticle Audience SDK

A TypeScript SDK for building and managing mParticle Audiences.

## Installation

```bash
npm install @mparticle/audience-sdk
```

## Usage

### Creating a Simple Audience

```typescript
import { createAudience, createEventQueryBuilder } from '@mparticle/audience-sdk';

// Create an event query
const eventQuery = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .build();

// Create an audience with the event query
const audience = createAudience()
  .addQuery({ event: eventQuery })
  .build();

// Convert to JSON
const json = JSON.stringify(audience, null, 2);
```

### Creating a Complex Audience with Logical Combinations

```typescript
import { 
  createAudience, 
  createEventQueryBuilder, 
  createUserQueryBuilder,
  createLogicalQuery
} from '@mparticle/audience-sdk';

// Create an event query for purchases
const purchaseQuery = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .build();

// Create a user query for premium users
const premiumUserQuery = createUserQueryBuilder()
  .setModels(['user'])
  .addAttribute('subscription_tier', { path: 'premium' })
  .build();

// Create a logical query combining both conditions
const logicalQuery = createLogicalQuery()
  .setOperator('and')
  .addQuery({ event: purchaseQuery })
  .addQuery({ user: premiumUserQuery })
  .build();

// Create the final audience
const audience = createAudience()
  .setOperator('or')
  .addQuery({ event: purchaseQuery })
  .addLogicalQuery(logicalQuery)
  .build();
```

### Building Operands

```typescript
import { 
  OperandFactory, 
  DateOperandFactory, 
  LocationOperandFactory 
} from '@mparticle/audience-sdk';

// Create primitive operands
const stringOperand = OperandFactory.createPrimitive('value');
const numberOperand = OperandFactory.createPrimitive(42);
const booleanOperand = OperandFactory.createPrimitive(true);

// Create path operands
const pathOperand = OperandFactory.createPath('user.profile.age');

// Create date operands
const absoluteDate = OperandFactory.createAbsoluteDate('2023-01-01T00:00:00Z');
const relativeDate = OperandFactory.createRelativeDate(-7, 'day', 'start');

// Create location operands
const locationPoint = OperandFactory.createLocationPoint(37.7749, -122.4194);
const locationWithRadius = OperandFactory.createLocationWithMiles(37.7749, -122.4194, 10);

// Create arithmetic operands
const arithmeticOperand = OperandFactory.createArithmetic(
  'add',
  OperandFactory.createPath('user.profile.age'),
  OperandFactory.createPrimitive(5)
);
```

### Building Expressions

```typescript
import { 
  ExpressionFactory, 
  OperandFactory 
} from '@mparticle/audience-sdk';

// Create binary expressions
const equalsExpression = ExpressionFactory.createBinary(
  'eq',
  OperandFactory.createPath('user.profile.age'),
  OperandFactory.createPrimitive(18)
);

const greaterThanExpression = ExpressionFactory.createBinary(
  'gt',
  OperandFactory.createPath('user.profile.age'),
  OperandFactory.createPrimitive(21)
);

// Create logical expressions (AND/OR)
const andExpression = ExpressionFactory.createAnd([
  equalsExpression,
  greaterThanExpression
]);

const orExpression = ExpressionFactory.createOr([
  equalsExpression,
  greaterThanExpression
]);

// Create NOT expressions
const notExpression = ExpressionFactory.createNot(equalsExpression);

// Create EXISTS expressions
const existsExpression = ExpressionFactory.createExists(
  OperandFactory.createPath('user.profile.email')
);

// Create location expressions
const locationExpression = ExpressionFactory.createLocation(
  'within',
  OperandFactory.createLocationWithMiles(37.7749, -122.4194, 10),
  { path: 'user.location' }
);
```

### Building Event Queries

```typescript
import { 
  createEventQueryBuilder, 
  ExpressionFactory, 
  OperandFactory 
} from '@mparticle/audience-sdk';

// Simple event query
const simpleEventQuery = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .build();

// Event query with attributes
const eventQueryWithAttributes = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .setAttributeOperator('and')
  .addAttributesExpression(
    ExpressionFactory.createBinary(
      'gt',
      OperandFactory.createPath('event.properties.amount'),
      OperandFactory.createPrimitive(100)
    )
  )
  .build();

// Event query with count
const eventQueryWithCount = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .setCountValue(5)
  .build();

// Event query with date
const eventQueryWithDate = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .setRelativeDate(-30, 'day', 'start')
  .build();

// Event query with location
const eventQueryWithLocation = createEventQueryBuilder()
  .setModels(['event'])
  .setEventName({ path: 'purchase' })
  .setLocation(
    ExpressionFactory.createLocation(
      'within',
      OperandFactory.createLocationWithMiles(37.7749, -122.4194, 10),
      { path: 'event.location' }
    )
  )
  .build();
```

### Building User Queries

```typescript
import { 
  createUserQueryBuilder, 
  ExpressionFactory, 
  OperandFactory 
} from '@mparticle/audience-sdk';

// Simple user query
const simpleUserQuery = createUserQueryBuilder()
  .setModels(['user'])
  .setAttributeOperator('and')
  .addAttributesExpression(
    ExpressionFactory.createBinary(
      'eq',
      OperandFactory.createPath('user.profile.subscription_tier'),
      OperandFactory.createPrimitive('premium')
    )
  )
  .build();

// Complex user query with multiple conditions
const complexUserQuery = createUserQueryBuilder()
  .setModels(['user'])
  .setAttributeOperator('and')
  .addAttributesExpression(
    ExpressionFactory.createBinary(
      'eq',
      OperandFactory.createPath('user.profile.subscription_tier'),
      OperandFactory.createPrimitive('premium')
    )
  )
  .addAttributesExpression(
    ExpressionFactory.createBinary(
      'gt',
      OperandFactory.createPath('user.profile.age'),
      OperandFactory.createPrimitive(21)
    )
  )
  .addAttributesExpression(
    ExpressionFactory.createExists(
      OperandFactory.createPath('user.profile.email')
    )
  )
  .build();
```

### Parsing and Validating Audiences

```typescript
import { parseAudience, validateAudience, stringifyAudience } from '@mparticle/audience-sdk';

// Parse an audience from JSON
const jsonString = '{"audience":{"operator":"and","queries":[{"event":{"model":"event","event_name":{"path":"purchase"}}}]}}';
const audience = parseAudience(jsonString);

// Validate an audience
const isValid = validateAudience(audience);

// Convert an audience to JSON
const json = stringifyAudience(audience);
```

## API Reference

### AudienceBuilder

The main builder for creating Audience objects.

- `setOperator(operator: 'and' | 'or')`: Sets the logical operator for combining queries
- `addQuery(query: AudienceQuery)`: Adds a query to the audience
- `addLogicalQuery(logicalQuery: LogicalAudienceQueries)`: Adds a nested logical query
- `build()`: Builds and returns the final Audience object

### QueryBuilders

#### GeneralQueryBuilder

- `setAllModels()`: Sets the model to all models
- `setModels(models: Model[])`: Sets the models for the query
- `setExpression(expression: Expression)`: Sets the expression for the query
- `build()`: Builds and returns the query

#### EventQueryBuilder

- `setAllModels()`: Sets the model to all models
- `setModels(models: Model[])`: Sets the models for the event query
- `setEventName(eventName: PathExpression)`: Sets the event name
- `setAttributeOperator(operator: LogicalOperator)`: Sets the operator for combining attribute expressions
- `addAttributesExpression(expression: SingleModelExpression)`: Adds an expression to the query
- `setCountValue(count: number)`: Sets a simple numeric count value
- `setCountBinary(operator: BinaryOperator, operand: Operand)`: Sets a binary operator count expression
- `setCountLogical(operator: LogicalOperator, expressions: CountExpression[])`: Sets a logical combination of count expressions
- `setAbsoluteDate(absoluteDate: string)`: Sets an absolute date
- `setRelativeDate(offset: number, unit: DateUnit, boundary?: 'start' | 'end' | 'middle')`: Sets a relative date
- `setDateBinary(operator: BinaryOperator, operand: AbsoluteDate | RelativeDate)`: Sets a binary operator date expression
- `setDateLogical(operator: LogicalOperator, expressions: DateExpression[])`: Sets a logical combination of date expressions
- `setLocation(location: LocationExpression)`: Sets the location
- `setEventType(eventType: PathExpression)`: Sets the event type
- `build()`: Builds and returns the event query

#### UserQueryBuilder

- `setAllModels()`: Sets the model to all models
- `setModels(models: Model[])`: Sets the models for the user query
- `setAttributeOperator(operator: LogicalOperator)`: Sets the operator for combining attribute expressions
- `addAttributesExpression(expression: SingleModelExpression)`: Adds an expression to the query
- `build()`: Builds and returns the user query

### Expression Factory

- `createJoin(model: Model, expression: Expression)`: Creates a join expression
- `createNot(expression: Expression, model?: Model)`: Creates a unary expression (NOT)
- `createExists(operand: Operand, model?: Model)`: Creates an exists expression
- `createBinary(operator: BinaryOperator, left: Operand, right: Operand, model?: Model)`: Creates a binary expression
- `createModelAggregation(model: Model, operator: BinaryOperator, expression: Expression, aggregation: { operator: AggregationOperator, path: string }, right: Operand | { model: string, operator: AggregationOperator, path: string, expression: Expression })`: Creates a model aggregation expression
- `createLogical(operator: LogicalOperator, expressions: Expression[], model?: Model)`: Creates a logical expression (AND/OR)
- `createLocation(operator: LocationOperator, location: LocationOperand, path: { path: string }, model?: Model)`: Creates a location expression
- `createAnd(expressions: Expression[], model?: Model)`: Creates an AND expression
- `createOr(expressions: Expression[], model?: Model)`: Creates an OR expression

### Operand Factory

- `createPath(path: string)`: Creates a path operand
- `createDate(dateOperand: DateOperand)`: Creates a date operand
- `createArithmetic(operator: ArithmeticOperator, left: Operand, right: Operand)`: Creates an arithmetic operand
- `createAbsoluteDate(dateString: string)`: Creates an absolute date operand
- `createRelativeDate(offset: number, unit: string, boundary?: 'start' | 'end' | 'middle')`: Creates a relative date operand
- `createLocationPoint(latitude: number, longitude: number)`: Creates a location operand with latitude and longitude
- `createLocationWithMeters(latitude: number, longitude: number, meters: number)`: Creates a location operand with latitude, longitude, and distance in meters
- `createLocationWithMiles(latitude: number, longitude: number, miles: number)`: Creates a location operand with latitude, longitude, and distance in miles
- `createLocationWithKilometers(latitude: number, longitude: number, kilometers: number)`: Creates a location operand with latitude, longitude, and distance in kilometers

### Model Factory

- `createWithId(id: number, type: string)`: Creates a model with an ID and type
- `createWithName(name: string, type: string)`: Creates a model with a name and type
- `createModel(type: string, id: number, name?: string)`: Creates a model with type, ID, and optional name

### Utility Functions

- `createAudience()`: Creates a new AudienceBuilder instance
- `createLogicalQuery()`: Creates a new LogicalQueryBuilder instance
- `createGeneralQueryBuilder()`: Creates a new GeneralQueryBuilder instance
- `createEventQueryBuilder()`: Creates a new EventQueryBuilder instance
- `createUserQueryBuilder()`: Creates a new UserQueryBuilder instance
- `validateAudience(audience: Audience)`: Validates an Audience object
- `parseAudience(json: string)`: Parses a JSON string into an Audience object
- `stringifyAudience(audience: Audience)`: Converts an Audience object to a JSON string