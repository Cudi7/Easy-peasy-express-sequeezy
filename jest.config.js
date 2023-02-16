/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupFilesAfterEnv.ts'], //We add this line so we can use setupFilesAfterEnv.ts
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
