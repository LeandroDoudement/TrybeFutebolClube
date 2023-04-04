import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import {
  userOneResponse,
  userOneRequest,
  userOnePayload,
} from './mocks/Login.mock';
import { Response } from 'superagent';
import Users from '../database/models/Users';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;

chai.use(chaiHttp);

const { expect } = chai;
describe('Testes da rota /login', async () => {
  beforeEach(function () {
    sinon.restore();
  });

  it('Se o email não existir na requisição retorna a mensagem All fields must be filled', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' });
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('Se o email existir porem não estar no formato correto, retorna a mensagem Invalid email or password', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin.com', password: 'secret_admin' });
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Se o email não existir no banco de dados, retorna Invalid email or password', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@hotmail.com', password: 'secret_admin' });
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Se a password não existir na requisição retorna a mensagem All fields must be filled', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' });
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('Se a password tiver menos de 6 caracteres retorna Invalid email or password', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secre' });
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Retorna Invalid email or password ao fazer uma requisição post com as informações incorretas', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '123456789' });
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('Retorna um token ao fazer uma requisição post com as informações corretas', async () => {
    sinon.stub(Users, 'findOne').resolves(userOneResponse as Users);
    const token = sign(userOnePayload, JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(userOneRequest);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ token });
  });

  it('Na rota /login/role retorna a role do user logado', async () => {
    const token = sign(userOnePayload, JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
    const httpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', token);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ role: userOnePayload.role });
  });

  it('Retorna Token not found se não houver um token do usuario logado', async () => {
    const httpResponse = await chai.request(app).get('/login/role');
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });
});
