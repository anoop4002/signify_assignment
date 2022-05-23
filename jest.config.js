const testConfig = function(){
    return {
        // preset:"js-jest",
        testEnvironment: 'jest-environment-node',
        collectCoverageFrom: ["./server/**/*.js"],
        coverageDirectory: 'Testoutput/coverage',
        testMatch: ["**/*.test.js"],
        verbose: true,
        forceExit:true,
        transform:{}

    }
}

export default testConfig();