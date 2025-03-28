const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const app = require('../server.js'); // Importando o app do arquivo app.js

describe('Testes da aplicação Express', function(){
    it('Deve responder com status 200 na rota "/"', function(done){
        request(app)
            .get('/')
            .expect(200,done);
    });

    it('Deve retornar um arquivo estático de imagens na rota "/images', function(done){
        request(app)
            .get('/images/devsecops.png')  // Altere para uma imagem existente em sua pasta "images"
            .expect('Content-Type', /png/)
            .expect(200,done);
    });

    it('Deve servir um arquivo HTML na rota "/"', function(done){
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .end((err,res)=>{
                if(err) return done(err)
                expect(res.text).to.include('<!DOCTYPE html>');// Verifica se o HTML retornado contém a tag <html>
                done();
            });
    });

    it('Deve registrar o nome da aplicação no console ao acessar a rota "/"', function(done){
        const consoleLogSpy = sinon.spy(console, 'log'); // Spy para monitorar console.log

        request(app)
            .get('/')
            .end((err, res) => {
                expect(consoleLogSpy.calledWith('Request served by TestApp')).to.be.true;
                consoleLogSpy.restore(); // Restaurar o console.log original
                done();
            });
    });
})