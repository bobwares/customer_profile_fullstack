/**
 * @type {import('jest').Config}
 */
// App: Client Profile Module
// Package: mobile
// File: jest.config.js
// Version: 0.0.6
// Author: Bobwares
// Date: 2025-06-08T08:45:29Z
// Description: Jest configuration for React Native unit tests.

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|@react-native-community)/)'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
