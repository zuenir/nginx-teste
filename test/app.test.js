// tests/app.test.js
const request = require('supertest');
const app = require('../server');  // Importando a instância do app
const http = require('http');

let server;

beforeAll((done) => {
    // Inicia o servidor antes dos testes
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    // Fecha o servidor após os testes
    server.close(done);
});

describe('Testes do servidor Express', () => {
    it('deve responder com status 200 na rota principal "/"', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);  // Verificando se o status da resposta é 200
        expect(res.text).toContain('<title>Beautiful Landing Page</title>');  // Verificando o conteúdo de título do HTML
    });

    it('deve servir arquivos estáticos da pasta /images', async () => {
        // Supondo que exista uma imagem chamada 'image1.png' na pasta '/images'
        const res = await request(app).get('/images/image1.png');
        expect(res.status).toBe(200);  // Verificando se o arquivo está acessível com status 200
    });
});