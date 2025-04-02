 // Limpa os cookies antes de cada teste
beforeEach(() => {
    cy.clearCookies();
});

// Exemplo de como rodar algo depois de cada teste
afterEach(() => {
    console.log('Test completed');
});

Cypress.on('fail', (error) => {
    console.error('Um erro ocorreu:', error); // Log de erro customizado
    throw error; // Continuar a falha do teste
});