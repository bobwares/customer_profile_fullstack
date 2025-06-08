/**
 * @type {import('jest').Config}
 */
// App: Client Profile Module
// Package: ui
// File: jest.config.js
// Version: 0.0.6
// Author: Bobwares
// Date: 2025-06-08T08:45:29Z
// Description: Jest configuration for Next.js unit tests.

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
