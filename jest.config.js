module.exports = {
  //testEnvironment: 'jest-environment-puppeteer',
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    "/node_modules/",    // Ignorar node_modules
    "<rootDir>/cypress/", // Ignorar a pasta do Cypress
  ],
    testMatch: [
      '<rootDir>/test/**/*.test.js', // Apenas arquivos de teste dentro da pasta "test"
    ],
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: "test-results",
          outputName: "junit.xml",
        }
      ]
    ]
  };
  