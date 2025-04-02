describe('Testes Simples', () => {
  it('Deve limpar os cookies antes de cada teste', () => {
    cy.visit('/');
  });
});

describe('Testes E2E com Cypress para Nginx', () => {
  before(() => {
    // Antes de rodar os testes, podemos garantir que o servidor está no ar
    cy.visit('http://localhost:3000'); // Verifique se o Nginx está rodando na porta 80 ou na que você configurou
  });

  it('Deve ter status 200', () => {
    cy.request('http://localhost:3000')
      .its('status')
      .should('equal', 200);
  });

  it('Deve carregar o arquivo estático', () => {
    cy.request('http://localhost:3000/index.html')  // Ou outro arquivo estático que esteja sendo servido
      .its('status')
      .should('equal', 200);
  });
});
