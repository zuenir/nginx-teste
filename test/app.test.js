// tests/app.test.js
const request = require('supertest');
const app = require('../server');  // Importando a instância do app
let server;

beforeAll(() => {
  server = app.listen(3000); // start the server before tests
});

afterAll((done) => {
  server.close(done); // close the server after tests
});

test('should respond with status 200 on "/" route', async () => {
  const response = await request(server).get('/');
  expect(response.status).toBe(200);
});

test('should serve static files from /images', async () => {
  const response = await request(server).get('/images/somefile.png');
  expect(response.status).toBe(200);
});
