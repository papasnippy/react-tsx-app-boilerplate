module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    globals: {
        'ts-jest': {
            tsConfigFile: './jest.tsconfig.json'
        }
    }
};
