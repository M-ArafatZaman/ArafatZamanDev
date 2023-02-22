/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/.?"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/.?"],
  transformIgnorePatterns: ["<rootDir>/node_modules/.?"],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
      isolatedModules: true
    }],
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
  },
};