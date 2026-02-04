module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts'
  ],
  collectCoverageFrom: [
    'common/**/*.ts',
    'audience.ts',
    'expression/**/*.ts',
    'operand/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
}; 