import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import {
  allMatches,
  finishedMatches,
  inProgressMatches,
  newMatch,
  newMatchAdded,
} from './mocks/Matches.mock';
chai.use(chaiHttp);
import * as dotenv from 'dotenv';
import { userOnePayload } from './mocks/Login.mock';
import { sign } from 'jsonwebtoken';

const { expect } = chai;
dotenv.config();
const { JWT_SECRET } = process.env;

describe('Testes da rota /matches', () => {
  beforeEach(function () {
    sinon.restore();
  });

  it('Retorna todos as partidas na rota /matches', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[]);
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allMatches);
  });

  it('Retorna as partidas em andamento caso a query string inProgress = true', async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(inProgressMatches as unknown as Matches[]);
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(inProgressMatches);
  });
  it('Retorna as partidas concluídas caso a query string inProgress = false', async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(finishedMatches as unknown as Matches[]);
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(finishedMatches);
  });
  it('É possivel finalizar uma partida pela rota PATCH /matches/:id/finish', async () => {
    const token = sign(userOnePayload, JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
    const response = await chai
      .request(app)
      .patch('/matches/46/finish')
      .set('Authorization', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });
  it('É possivel cadastrar uma nova partida pela rota POST /matches', async () => {
    const token = sign(userOnePayload, JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
    sinon.stub(Matches, 'create').resolves(newMatchAdded as unknown as Matches);
    const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(newMatch);
    expect(response.body).to.be.deep.equal(newMatchAdded);
  });
});
