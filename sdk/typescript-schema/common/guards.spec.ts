import { isValidAudienceObject } from './guards';
import { Audience } from '../audience';
import { UnaryOperator } from './operator';

describe('Guard Functions', () => {
    describe('isValidAudienceObject', () => {
        describe('Valid Audience Objects', () => {
            it('should validate a simple valid audience with unary expression', () => {
                const validAudience: Audience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: UnaryOperator.Exists,
                        operand: { model: 'user', path: 'id' }
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate a valid audience with binary expression', () => {
                const validAudience: Audience = {
                    schema_version: '1.2.3',
                    audience: {
                        operator: 'equals',
                        left: { model: 'user', path: 'country' },
                        right: 'US'
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate a valid audience with logical AND expression', () => {
                const validAudience: Audience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'and',
                        expressions: [
                            {
                                operator: UnaryOperator.Exists,
                                operand: { model: 'user', path: 'id' }
                            },
                            {
                                operator: 'equals',
                                left: { model: 'user', path: 'status' },
                                right: 'active'
                            }
                        ]
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate a valid audience with logical OR expression', () => {
                const validAudience: Audience = {
                    schema_version: '2.1.0',
                    audience: {
                        operator: 'or',
                        expressions: [
                            {
                                operator: 'equals',
                                left: { model: 'user', path: 'country' },
                                right: 'US'
                            },
                            {
                                operator: 'equals',
                                left: { model: 'user', path: 'country' },
                                right: 'CA'
                            }
                        ]
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate a complex nested audience', () => {
                const validAudience: Audience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'and',
                        expressions: [
                            {
                                operator: UnaryOperator.Exists,
                                operand: { model: 'user', path: 'id' }
                            },
                            {
                                operator: 'or',
                                expressions: [
                                    {
                                        operator: 'equals',
                                        left: { model: 'user', path: 'status' },
                                        right: 'premium'
                                    },
                                    {
                                        operator: 'greater_than',
                                        left: { model: 'user', path: 'purchase_count' },
                                        right: 5
                                    }
                                ]
                            }
                        ]
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate audience with pre-release version', () => {
                const validAudience: Audience = {
                    schema_version: '1.0.0-beta.1',
                    audience: {
                        operator: UnaryOperator.Exists,
                        operand: { model: 'user', path: 'id' }
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate all binary operators', () => {
                const binaryOperators = [
                    'equals', 'not_equals', 'less_than', 'less_than_equal',
                    'greater_than', 'greater_than_equal', 'matches', 'contains',
                    'not_contains', 'starts_with', 'not_starts_with', 'ends_with',
                    'not_ends_with'
                ];

                binaryOperators.forEach(operator => {
                    const validAudience = {
                        schema_version: '1.0.0',
                        audience: {
                            operator,
                            left: { model: 'test', path: 'field' },
                            right: 'test_value'
                        }
                    };

                    expect(isValidAudienceObject(validAudience)).toBe(true);
                });
            });

            it('should validate all unary operators', () => {
                const unaryOperators = ['null', 'not_null', 'exists', 'not_exists'];

                unaryOperators.forEach(operator => {
                    const validAudience = {
                        schema_version: '1.0.0',
                        audience: {
                            operator,
                            operand: { model: 'test', path: 'field' }
                        }
                    };

                    expect(isValidAudienceObject(validAudience)).toBe(true);
                });
            });

            it('should validate operands with primitive values', () => {
                const validAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'equals',
                        left: { model: 'user', path: 'age' },
                        right: 25
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate operands with string values', () => {
                const validAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'equals',
                        left: { model: 'user', path: 'name' },
                        right: 'John Doe'
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });

            it('should validate operands with boolean values', () => {
                const validAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'equals',
                        left: { model: 'user', path: 'is_active' },
                        right: true
                    }
                };

                expect(isValidAudienceObject(validAudience)).toBe(true);
            });
        });

        describe('Invalid Audience Objects', () => {
            it('should reject null values', () => {
                expect(isValidAudienceObject(null)).toBe(false);
            });

            it('should reject undefined values', () => {
                expect(isValidAudienceObject(undefined)).toBe(false);
            });

            it('should reject primitive values', () => {
                expect(isValidAudienceObject('string')).toBe(false);
                expect(isValidAudienceObject(123)).toBe(false);
                expect(isValidAudienceObject(true)).toBe(false);
            });

            it('should reject empty objects', () => {
                expect(isValidAudienceObject({})).toBe(false);
            });

            it('should reject objects missing schema_version', () => {
                const invalidAudience = {
                    audience: {
                        operator: 'exists',
                        operand: { model: 'user', path: 'id' }
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject objects with non-string schema_version', () => {
                const invalidAudience = {
                    schema_version: 123,
                    audience: {
                        operator: 'exists',
                        operand: { model: 'user', path: 'id' }
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject objects with invalid version format', () => {
                const invalidVersions = [
                    '1.0',       // missing patch
                    '1',         // missing minor and patch
                    'v1.0.0',    // has 'v' prefix
                    '1.0.0.0',   // too many parts
                    'invalid',   // not a version
                    ''           // empty string
                ];

                invalidVersions.forEach(version => {
                    const invalidAudience = {
                        schema_version: version,
                        audience: {
                            operator: 'exists',
                            operand: { model: 'user', path: 'id' }
                        }
                    };

                    expect(isValidAudienceObject(invalidAudience)).toBe(false);
                });
            });

            it('should reject objects missing audience', () => {
                const invalidAudience = {
                    schema_version: '1.0.0'
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject objects with null audience', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: null
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject objects with primitive audience', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: 'invalid'
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject invalid binary expressions missing operands', () => {
                const invalidExpressions = [
                    { operator: 'equals', left: { model: 'test', path: 'field' } }, // missing right
                    { operator: 'equals', right: 'value' },                        // missing left
                    { operator: 'equals' }                                         // missing both
                ];

                invalidExpressions.forEach(audience => {
                    const invalidAudience = {
                        schema_version: '1.0.0',
                        audience
                    };

                    expect(isValidAudienceObject(invalidAudience)).toBe(false);
                });
            });

            it('should reject invalid unary expressions missing operand', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'exists'
                        // missing operand
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject logical expressions with non-array expressions', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'and',
                        expressions: 'not an array'
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject logical expressions with invalid sub-expressions', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'and',
                        expressions: [
                            {
                                operator: 'exists',
                                operand: { model: 'user', path: 'valid' }
                            },
                            {
                                operator: 'invalid_operator',
                                operand: { model: 'user', path: 'invalid' }
                            }
                        ]
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject join expressions with missing model', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        expression: {
                            operator: 'exists',
                            operand: { model: 'user', path: 'test' }
                        }
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject join expressions with non-string model', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        model: 123,
                        expression: {
                            operator: 'exists',
                            operand: { model: 'user', path: 'test' }
                        }
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject join expressions with invalid nested expression', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        model: 'user',
                        expression: {
                            operator: 'invalid_operator'
                        }
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should reject expressions with unknown operators', () => {
                const invalidAudience = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'unknown_operator',
                        operand: { model: 'user', path: 'test' }
                    }
                };

                expect(isValidAudienceObject(invalidAudience)).toBe(false);
            });

            it('should handle exceptions gracefully', () => {
                // Create an object that might cause exceptions during validation
                const problematicObject = {};
                Object.defineProperty(problematicObject, 'schema_version', {
                    get() {
                        throw new Error('Test error');
                    }
                });

                expect(isValidAudienceObject(problematicObject)).toBe(false);
            });
        });

        describe('Edge Cases', () => {
            it('should handle deeply nested expressions', () => {
                const deeplyNested = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'and',
                        expressions: [
                            {
                                operator: 'or',
                                expressions: [
                                    {
                                        operator: 'and',
                                        expressions: [
                                            {
                                                operator: 'exists',
                                                operand: { model: 'user', path: 'level1' }
                                            },
                                            {
                                                model: 'nested',
                                                expression: {
                                                    operator: 'equals',
                                                    left: { model: 'nested', path: 'level2' },
                                                    right: 'value'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                };

                expect(isValidAudienceObject(deeplyNested)).toBe(true);
            });

            it('should handle empty expressions array in logical operators', () => {
                const emptyExpressions = {
                    schema_version: '1.0.0',
                    audience: {
                        operator: 'and',
                        expressions: []
                    }
                };

                expect(isValidAudienceObject(emptyExpressions)).toBe(true);
            });

            it('should validate operands with different value types', () => {
                const differentOperands = [
                    { model: 'user', path: 'string_field' },
                    'string_value',
                    123,
                    true,
                    false
                ];

                differentOperands.forEach((operand, index) => {
                    const validAudience = {
                        schema_version: '1.0.0',
                        audience: {
                            operator: 'equals',
                            left: { model: 'test', path: `field_${index}` },
                            right: operand
                        }
                    };

                    expect(isValidAudienceObject(validAudience)).toBe(true);
                });
            });
        });
    });
});
