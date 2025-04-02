module.exports={
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    reporters:[
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "test-results",
                outputName: "junit.xml",
            }
        ]
    ],
};