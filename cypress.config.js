// cypress.config.js
module.exports = {
    e2e: {
      baseUrl: 'http://localhost:3000', // Substitua com o endereço da sua aplicação
      supportFile: 'cypress/support/e2e.js', // Caminho para o arquivo de suporte
      specPattern: 'cypress/e2e/**/*.{js,ts,jsx,tsx}', // Onde seus testes estarão localizados
    },
  };
  