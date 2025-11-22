/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        module: 'commonjs',
        moduleResolution: 'node',
        strict: true,
        paths: {
          '@/*': ['./src/*'],
          '@/domain/*': ['./src/domain/*'],
          '@/application/*': ['./src/application/*'],
          '@/infrastructure/*': ['./src/infrastructure/*'],
          '@/presentation/*': ['./src/presentation/*'],
        },
      },
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};

module.exports = config;
