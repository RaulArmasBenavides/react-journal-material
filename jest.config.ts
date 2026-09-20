export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
