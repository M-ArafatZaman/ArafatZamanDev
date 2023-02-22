/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
      isolatedModules: true
    }],
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|gif)$": "jest-transform-stub",
  },
};