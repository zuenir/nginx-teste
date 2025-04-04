module.exports = {
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
  