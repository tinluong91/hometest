module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
        '<rootDir>/__tests__/fixtures',
        '<rootDir>/__tests__/utils',
        '<rootDir>/__tests__/global-setup.js',
    ],
    moduleNameMapper: {
        'source-map-support/register': 'identity-obj-proxy',
        '^@modules/(.*)$': '<rootDir>/src/modules/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    },
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: 'babel',
    coverageDirectory: 'test-results',
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    testMatch: ['**/?(*.)+(spec|test).ts'],
    testPathIgnorePatterns: ['data', 'dist'],
}
