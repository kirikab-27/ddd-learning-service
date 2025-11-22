const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@/application/(.*)$': '<rootDir>/src/application/$1',
    '^@/infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@/presentation/(.*)$': '<rootDir>/src/presentation/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

module.exports = createJestConfig(customJestConfig);
