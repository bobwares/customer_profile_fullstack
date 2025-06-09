/**
 * @type {import('jest').Config}
 */
// App: Client Profile Module
// Package: ui
// File: jest.config.js
// Version: 0.0.15
// Author: Bobwares
// Date: 2025-06-09T02:59:45Z
// Description: Jest configuration for Next.js unit tests with TSX transform.

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]
  }
};
