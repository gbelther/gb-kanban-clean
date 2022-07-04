module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/main/config/tests/jest-setup.ts'],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
